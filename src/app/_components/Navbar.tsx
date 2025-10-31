import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="flex w-full items-center justify-between py-4 px-8 relative">
        {/* Logo (kiri) */}
        <Link
          href="/"
          className="inline-flex items-center gap-2"
          aria-label="Beranda MERAI"
        >
          <Image
            src={"/__merai__/logo.webp"}
            alt="Logo Merai"
            width={45}
            height={45}
            draggable={false}
          />
        </Link>

        {/* Tombol kanan */}
        <div className="flex items-center">
          <Link
            href="/contact"
            className="border border-foreground/20 px-4 py-3 hover:opacity-50 duration-300 backdrop-blur-xs"
          >
            Hubungi Kami
          </Link>
        </div>

        {/* Nav tengah — diposisikan absolut di tengah */}
        <nav
          aria-label="Navigasi utama"
          className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href="/works"
                className="inline-flex items-center text-muted hover:text-white focus:scale-105 focus:text-white duration-300"
              >
                Karya
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="inline-flex items-center text-muted hover:text-white focus:scale-105 focus:text-white duration-300"
              >
                Tentang
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
