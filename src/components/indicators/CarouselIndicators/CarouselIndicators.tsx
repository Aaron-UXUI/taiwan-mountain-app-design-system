import "./CarouselIndicators.css";

export type CarouselIndicatorsBackground = "White" | "Dark";

export type CarouselIndicatorsProps = {
  background?: CarouselIndicatorsBackground;
  dotCount?: number;
  activeIndex?: number;
  className?: string;
};

/** Figma: Carousel Indicators (node 7297:14580) — Background=White/Dark. */
export function CarouselIndicators({
  background = "White",
  dotCount = 3,
  activeIndex = 0,
  className,
}: CarouselIndicatorsProps) {
  return (
    <div
      className={[
        "tmads-carousel-indicators",
        background === "Dark" ? "tmads-carousel-indicators--dark" : "tmads-carousel-indicators--white",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {Array.from({ length: dotCount }, (_, index) => (
        <span
          key={index}
          className="tmads-carousel-indicators__dot"
          data-active={index === activeIndex}
        />
      ))}
    </div>
  );
}
