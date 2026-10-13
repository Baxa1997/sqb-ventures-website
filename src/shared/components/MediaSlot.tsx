import { Play } from 'lucide-react';

interface MediaSlotProps {
  /** Video file under /public. Until it is set, a labelled placeholder shows. */
  src?: string;
  placeholder: string;
}

export function MediaSlot({ src, placeholder }: MediaSlotProps) {
  return (
    <figure className="media">
      {src ? (
        <video src={src} controls preload="metadata" />
      ) : (
        <>
          <span className="play">
            <Play />
          </span>
          <figcaption>{placeholder}</figcaption>
        </>
      )}
    </figure>
  );
}
