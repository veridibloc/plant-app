
interface Props {
    message: string;
    type: "success" | "info" | "warning" | "error";
}

const ColorMap = {
    success: "green",
    info: "blue",
    warning: "yellow",
    error: "red",
}

export const Toast = ({message, type} : Props) => {
    const color = ColorMap[type] ?? "grey";
    return <div
        className={`max-w-xs bg-${color}-100 border border-${color}-200 text-sm text-${color}-800 rounded-lg dark:bg-${color}-800/10 dark:border-${color}-900 dark:text-${color}-500`}
        role="alert"
        id="dismiss-toast"
    >
        <div className="flex p-4">
            {message}
            <div className="ms-auto">
                <button type="button"
                        className="inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg text-yellow-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-yellow-200"
                        data-hs-remove-element="#dismiss-toast"
                >
                    <span className="sr-only">Close</span>
                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                         viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                         stroke-linejoin="round">
                        <path d="M18 6 6 18"/>
                        <path d="m6 6 12 12"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
}