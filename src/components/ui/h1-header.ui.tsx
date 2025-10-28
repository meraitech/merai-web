export const H1HeaderUI = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  return (
    <h1
      className={
        "text-5xl lg:text-7xl w-full max-w-[1200px] font-bold duration-300 " +
        className
      }
    >
      {text}
    </h1>
  );
};
