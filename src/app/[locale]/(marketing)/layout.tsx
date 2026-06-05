import { Footer } from "@/shared/components/common/footer";
import Navbar from "@/shared/components/common/navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
