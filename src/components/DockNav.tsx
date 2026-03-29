"use client";

import Link from "next/link";

const links = [
  { label: "Work", href: "/work" },
  { label: "Studio", href: "/studio" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function DockNav() {
  return (
    <nav className="fixed bottom-6 left-[5vw] z-50">
      <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-2 backdrop-blur-xl">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-body block rounded-full px-5 py-2 text-sm text-off-white/70 transition-colors hover:bg-white/10 hover:text-off-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
