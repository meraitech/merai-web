import BlurText from "./BlurText";

export const H2HeaderUI = ({
  headerText,
  p,
}: {
  headerText: string;
  p: string;
}) => {
  return (
    // <h2
    //   className={
    //     "w-full font-bold text-3xl sm:text-4xl lg:text-5xl " + className
    //   }
    // >
    //   <BlurText text={text} delay={10} animateBy="words" direction="top" />
    // </h2>
    <div className="text-center flex flex-col gap-4 justify-center items-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl">{headerText}</h2>
      <p className="md:text-xl max-w-[700px]">{p}</p>
    </div>
  );
};
