interface BrandMarkProps {
  className?: string;
}

/**
 * Renders the BetterConnect BC emblem extracted cleanly from the brand asset.
 */
export function BrandMark({ className = 'h-5 w-auto' }: BrandMarkProps) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}images/betterconnect-mark.png`}
      alt=""
      aria-hidden="true"
      className={['block object-contain select-none shrink-0', className].join(' ')}
    />
  );
}
