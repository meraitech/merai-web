import BlurText from "./BlurText";

export const H2HeaderUI = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  return (
    <h2
      className={
        "w-full font-bold text-3xl sm:text-4xl lg:text-5xl " + className
      }
    >
      <BlurText text={text} delay={10} animateBy="words" direction="top" />
    </h2>
  );
};
