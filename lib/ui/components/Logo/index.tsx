import Link from "next/link";
import Image from "next/image";

export const Logo = () => (
    <div className="flex flex-col justify-center items-center w-full">
        <Link href="https://veridibloc.com" target="_blank" rel="noopener noreferrer">
            <Image src="/assets/veridibloc_logo.svg" alt="Veridibloc logo" width={48} height={48}/>
        </Link>
        <small className="text-xs text-veridibloc">Go Green, Go Global: Recycling 4.0</small>
    </div>
)