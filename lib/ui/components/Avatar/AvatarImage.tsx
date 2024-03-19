
interface Props {
    src: string;
    alt: string;
    rounded?: boolean;
}
export const AvatarImage = ({src, alt, rounded = true} : Props) => {
    return <img className={`w-full h-full ${rounded ? `rounded-full` : 'rounded'}`} src={src} alt={alt} />;
}