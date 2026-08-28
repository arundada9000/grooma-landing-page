import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * A stock atmosphere photograph, wrapped in the same tactile "floor grit"
 * treatment as the product cards so imported photography doesn't read as a
 * generic stock insert. Decorative unless an alt is provided.
 */
export function Photo({
  src,
  alt = "",
  ratio = "4 / 3",
  className,
  imgClassName,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src: string;
  alt?: string;
  /** Aspect ratio as CSS, e.g. "4 / 3" or "square". */
  ratio?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /**
   * Layout width hint for the responsive source set. The default suits a
   * half-column photo; pass the real width for full-bleed banners or the
   * browser downloads a source too small for the slot.
   */
  sizes?: string;
}) {
  return (
    <div
      className={cn("grain overflow-hidden rounded-3xl border border-hairline bg-ink-soft", className)}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
