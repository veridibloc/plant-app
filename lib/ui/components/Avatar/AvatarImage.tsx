
interface Props {
    src: string;
    alt: string;
}
export const AvatarImage = ({src, alt} : Props) => {
    return <img className="w-full h-full" src={src} alt={alt} />;
}