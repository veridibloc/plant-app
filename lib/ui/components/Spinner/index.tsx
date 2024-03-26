interface Props {
  className?: string;
}
export const Spinner = ({className = ""} : Props) => (
  <div
    className={`animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent rounded-full text-blue-600 ${className}`}
    role="status"
    aria-label="loading"
  ></div>
);
