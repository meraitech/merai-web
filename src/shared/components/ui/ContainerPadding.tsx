export default function ContainerPadding({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="py-20">{children}</div>;
}
