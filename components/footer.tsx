import Link from "next/link";
export default function Footer() {
  return (
    <footer className="border-t border-[#d8d7d0] py-10">
      <div className="site-wrap flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <Link href="/" className="text-xl font-bold tracking-[-.055em]">
            EPITOME CREATIVES
          </Link>
          <p className="mt-3 text-xs text-[#66675f]">
            Independent product-content studio · United Kingdom
          </p>
        </div>
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-x-6 gap-y-3 text-xs"
        >
          <Link className="py-2 hover:underline" href="/portfolio">
            Portfolio
          </Link>
          <Link className="py-2 hover:underline" href="/services">
            Services
          </Link>
          <Link className="py-2 hover:underline" href="/#contact">
            Enquire
          </Link>
          <a
            className="py-2 hover:underline"
            href="https://www.instagram.com/epitome.creatives/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram ↗
          </a>
          <Link className="py-2 hover:underline" href="/privacy">
            Privacy
          </Link>
        </nav>
        <p className="text-[11px] text-[#66675f]">
          © {new Date().getFullYear()} Epitome Creatives
        </p>
      </div>
    </footer>
  );
}
