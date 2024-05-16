
interface Props {
    src: string;
    alt: string;
    rounded?: boolean;
}
export const AvatarImage = ({src, alt, rounded = true} : Props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={`${rounded ? `rounded-full` : 'rounded'}`} src={src} alt={alt} />;
}