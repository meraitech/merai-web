export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-foreground/10 bg-foreground/2 backdrop-blur-sm rounded-3xl overflow-hidden">
      {children}
    </div>
  );
}
