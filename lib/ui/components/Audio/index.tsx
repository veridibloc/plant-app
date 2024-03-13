import React, {
    createRef,
    forwardRef,
    HTMLAttributes, Ref,
    useImperativeHandle
} from 'react';

export interface ImperativeAudioRef {
    play: () => Promise<void>;
    pause: () => void;
}
interface Props extends HTMLAttributes<HTMLAudioElement> {
    src : string;
}

export const AudioPlayer = forwardRef(function AudioPlayer({src, ...rest}: Props, ref : Ref<ImperativeAudioRef>) {
    const audioRef = createRef<HTMLAudioElement>();
    useImperativeHandle(ref, () => (
        {
            play: () => audioRef.current ? audioRef.current.play() : Promise.resolve(),
            pause: () => audioRef.current?.pause()
        })
    )

    return (
        <audio hidden ref={audioRef} preload="auto" src={src} {...rest} />
    );
});