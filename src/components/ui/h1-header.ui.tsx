export const H1HeaderUI = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  return (
    <h1 className={"text-7xl w-full max-w-[1200px] font-bold " + className}>
      {text}
    </h1>
  );
};
