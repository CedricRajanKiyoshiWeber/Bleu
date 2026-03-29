import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services — bleu",
  description:
    "Our services and what we can do for you. Strategy, design and development — all from one studio.",
};

const services = [
  {
    name: "Brand Identity",
    href: "/services/brand-identity",
    description:
      "We craft distinctive brand identities that capture your vision and set you apart. From logo systems to visual language, every element is designed to resonate. The result is a cohesive identity that feels authentic and unmistakable.",
  },
  {
    name: "Art Direction",
    href: "/services/art-direction",
    description:
      "Creative direction that brings clarity and consistency to your visual narrative. We define the aesthetic framework that guides every touchpoint of your brand. Bold concepts meet meticulous execution across all media.",
  },
  {
    name: "Web Design",
    href: "/services/web-design",
    description:
      "Tailor-made websites that look exceptional and perform even better. We balance aesthetics with usability to create experiences that convert. Every pixel is intentional, every interaction is seamless.",
  },
  {
    name: "Graphics Design",
    href: "/services/graphics-design",
    description:
      "From print to digital — visual communication that stands out and delivers your message. We create everything from editorial layouts to social assets and packaging. Each piece is crafted to work beautifully in context.",
  },
  {
    name: "E-Commerce",
    href: "/services/e-commerce",
    description:
      "Online stores built to sell. Thoughtful UX meets strong design for maximum conversion. We handle everything from product pages to checkout flows with precision. Your customers get a shopping experience they actually enjoy.",
  },
  {
    name: "Digital Products",
    href: "/services/digital-products",
    description:
      "Apps, platforms and digital experiences — from concept to launch. We design and build products that solve real problems with elegance. Scalable, intuitive and crafted for the people who use them.",
  },
];

export default function Services() {
  return (
    <main className="min-h-dvh bg-black px-page-x pb-page-bottom pt-page-top md:px-page-x-md md:pt-page-top-md">
      <div className="mb-title-gap">
        <h1 className="font-heading text-trim-cap text-[clamp(2.5rem,8vw,7rem)] leading-none text-off-white">
          Services
          <br />
          We Offer
        </h1>
        <p className="font-body mt-8 max-w-2xl text-base leading-relaxed text-off-white/50 md:text-lg">
          bleu is a design studio for brands that want to stand out. From
          strategy through design to technical execution — everything from a
          single source.
        </p>
      </div>

      <ul className="font-body grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {services.map((service) => (
          <li key={service.href}>
            <Link
              href={service.href}
              className="group block rounded-2xl border border-off-white/10 p-6 transition-colors hover:border-bleu hover:bg-bleu md:p-8"
            >
              <h2 className="font-heading text-2xl font-bold uppercase leading-tight text-off-white transition-colors group-hover:text-off-white md:text-4xl">
                {service.name}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-off-white/40 transition-colors group-hover:text-off-white/60 md:text-base">
                {service.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
