
interface Props {
    src: string;
    alt: string;
}
export const AvatarImage = ({src, alt} : Props) => {
    return <img className="w-full h-full rounded-full" src={src} alt={alt} />;
}