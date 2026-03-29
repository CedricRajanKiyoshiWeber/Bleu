"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Projects", href: "/projects" },
  { label: "Studio", href: "/studio" },
  { label: "Services", href: "/services" },
];

export default function DockNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <ul className="flex items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 py-2 backdrop-blur-2xl saturate-150">
        <li
          className="grid transition-all duration-300 ease-in-out"
          style={{
            gridTemplateColumns: isHome ? "0fr" : "1fr",
            opacity: isHome ? 0 : 1,
          }}
        >
          <div className="overflow-hidden">
            <Link
              href="/"
              aria-label="Home"
              className="block rounded-md px-2.5 py-2 text-off-white/70 transition-colors hover:bg-white/10 hover:text-off-white"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 2L4 8l6 6" />
              </svg>
            </Link>
          </div>
        </li>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-body block rounded-md px-5 py-2 text-sm text-off-white/70 transition-colors hover:bg-white/10 hover:text-off-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/contact"
            className="font-body block rounded-md bg-off-white px-5 py-2 text-sm text-black transition-colors hover:bg-off-white/85"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
