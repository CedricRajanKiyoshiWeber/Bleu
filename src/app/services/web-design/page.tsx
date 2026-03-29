import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design — bleu",
  description:
    "Individuelles Webdesign — von Konzept bis Launch, digital und responsive.",
};

export default function WebDesign() {
  return (
    <main className="min-h-dvh bg-black px-page-x pb-page-bottom pt-page-top md:px-page-x-md md:pt-page-top-md">
      <h1 className="font-heading text-trim-cap mb-title-gap text-[clamp(2.5rem,8vw,7rem)] leading-none text-off-white">
        Web Design
      </h1>

      <div className="font-body max-w-2xl space-y-section-gap text-base leading-relaxed text-off-white/80">
        <p>Coming soon.</p>
      </div>
    </main>
  );
}
