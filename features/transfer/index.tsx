"use client"

import {TokenInfo} from "@/types/tokenInfo";
import {useAccountBalances} from "@/ui/hooks/useAccountBalances";
import {useEffect, useRef, useState} from "react";
import {useNotification} from "@/ui/hooks/useNotification";
import {transferToken} from "../../app/[locale]/(withAccount)/transfer/[tokenId]/actions";
import {BalanceCard} from "@/ui/components/BalanceCard";
import {useTranslations} from "next-intl";
import {AmountInput} from "@/ui/components/Inputs/AmountInput";
import {AddressInput} from "@/ui/components/Inputs/AddressInput";
import {IconButton} from "@/ui/components/Buttons/IconButton";
import {RiCheckboxCircleFill, RiFingerprintLine} from "react-icons/ri";
import {Spinner} from "@/ui/components/Spinner";
import {SimpleCard} from "@/ui/components/Cards/SimpleCard";
import {useAppContext} from "@/ui/hooks/useAppContext";

const RequiredConfirmationCount = 5

const InitialSubmissionState  = {
    success: false,
    txId: "",
    error: ""
}
interface Props {
    tokenInfo: TokenInfo;
    recipient?: string
    quantity?: string
}

export function TransferForm({tokenInfo, recipient = "", quantity = ""}: Props) {
    const timerRef = useRef<NodeJS.Timeout>();
    const t = useTranslations("transfer");
    const {showError, showSuccess} = useNotification();
    const {Ledger: {ExplorerUrl}} = useAppContext();
    const {accountBalances} = useAccountBalances();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionResult, setSubmissionResult] = useState(InitialSubmissionState);
    const [confirmationCount, setConfirmationCount] = useState(0);
    const [tokenQuantity, setTokenQuantity] = useState(quantity);
    const [accountId, setAccountId] = useState(recipient);

    let currentBalance = accountBalances.find((ab) => ab.tokenId === tokenInfo.tokenId);
    if (!currentBalance) {
        currentBalance = {...tokenInfo, balance: "0"}
    }

    useEffect(() => {
        return stopTimer
    }, []);

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
        setConfirmationCount(0);
    }


    useEffect(() => {
        if (confirmationCount >= RequiredConfirmationCount) {
            stopTimer();
            const form = new FormData();
            form.set("tokenId", tokenInfo.tokenId);
            form.set("quantity", tokenQuantity);
            form.set("recipientId", accountId);
            setIsSubmitting(true);
            transferToken(form)
                .then(result => {
                    const hasError = !!result.error;
                    console.log(result);
                    if (hasError) {
                        console.log(result.error)
                        showError(t("transfer_failed"))
                    } else {
                        showSuccess(t("transfer_success"));
                    }
                    setIsSubmitting(false);
                    setSubmissionResult({
                        success: !hasError,
                        txId: result.success || "",
                        error: typeof(result.error) === "string" ? result.error : "",
                    })
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmationCount]);


    const handleConfirmStart = (e: any) => {
        e.preventDefault();
        stopTimer();
        setConfirmationCount(1);
        timerRef.current = setInterval(() => {
            setConfirmationCount(count => count + 1);
        }, 1_000)
    }


    const handleConfirmStop = () => {
        stopTimer();
    }

    const canSubmit = tokenQuantity.length > 0 && tokenQuantity !== "0" && accountId.length > 0;

    return <>
        <section className="w-full">
            <BalanceCard balance={currentBalance}/>
        </section>
        {/* highly customized form */}
        <form className="w-full h-[40vh] flex flex-col justify-center gap-y-4">
            <AddressInput onChange={setAccountId}
                          label={t("recipient")}
                          addressOrId={recipient}
            />
            <AmountInput tokenInfo={tokenInfo}
                         maxQuantity={Number(currentBalance!.balance)}
                         onChange={setTokenQuantity}
                         quantity={quantity}
            />

            <section className="mx-auto text-center mt-8 mb-8 w-full lg:w-2/3">
                {!isSubmitting && !submissionResult.success && (
                    <IconButton
                        label={confirmationCount ? `Confirming ${RequiredConfirmationCount - confirmationCount}` : "Hold to Confirm"}
                        icon={<RiFingerprintLine size={32}/>}
                        className={`highlight-off disabled:!bg-gray-400 transition-colors w-full ${confirmationCount ? "!bg-green-600 duration-[4s]" : "!bg-blue-600"}`}
                        onMouseDown={handleConfirmStart}
                        onMouseUp={handleConfirmStop}
                        onTouchStart={handleConfirmStart}
                        onTouchEnd={handleConfirmStop}
                        loading={confirmationCount > 0}
                        disabled={!canSubmit}
                    />
                )}
                {isSubmitting && !submissionResult.success && (
                    <SimpleCard title={t("submitting_title")}>
                        <div className="flex flex-col justify-center">
                            <Spinner/>
                            <p>{t("submitting_description")}</p>
                        </div>
                    </SimpleCard>
                )}
                {!isSubmitting && submissionResult.success && (
                    <SimpleCard title={t("submitted_title")}
                                href={{label: t("see_in_explorer"), url: `${ExplorerUrl}/tx/${submissionResult.txId}`}}>
                        <div className="flex flex-row gap-x-1 justify-center items-center w-full">
                            <RiCheckboxCircleFill color="green" size={64}/>
                            <p>{t("submitted_description")}</p>
                        </div>
                    </SimpleCard>
                )}
            </section>
        </form>
    </>
}
