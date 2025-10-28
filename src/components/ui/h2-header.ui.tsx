import BlurText from "./BlurText";

export const H2HeaderUI = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  return (
    <h2 className={"text-5xl w-full font-bold " + className}>
      <BlurText text={text} delay={10} animateBy="words" direction="top" />
    </h2>
  );
};
