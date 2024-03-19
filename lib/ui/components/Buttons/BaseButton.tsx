export interface BaseButtonProps {
    label: string | React.ReactNode;
    type?: "button" | "submit" | "reset"
    disabled?: boolean
    loading?: boolean
    className?: string
    onClick?: () => void
}

export const BaseButton = ({label, type = "button", disabled = false, loading = false, onClick = () => {}, className, ...props}: BaseButtonProps) => (
    <button type={type}
            className={`py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent ease-in font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 ${disabled ? "cursor-not-allowed bg-gray-300" : "hover:bg-blue-600 bg-blue-500"} ${className}`}
            onClick={onClick}
            disabled={disabled}
    >
        {loading && <span
          className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
          role="status" aria-label="loading"></span>}
        {label}
    </button>
);
