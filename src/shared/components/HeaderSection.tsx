import { TypographyH2 } from "./ui/TypographyH2";

export default function HeaderSection({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center max-w-4xl flex flex-col items-center mx-auto gap-2 lg:gap-4">
      <TypographyH2 text={title} />
      <div className="max-w-xl">
        <p>{subtitle}</p>
      </div>
    </div>
  );
}
