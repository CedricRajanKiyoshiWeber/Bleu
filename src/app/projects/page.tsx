import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects — bleu",
  description:
    "Selected projects by bleu Creative Studio. Brand worlds refined — visual, digital, conceptual.",
}

export default function Projects() {
  return (
    <main className="min-h-dvh bg-black px-page-x pb-page-bottom pt-page-top md:px-page-x-md md:pt-page-top-md">
        <h1 className="font-heading text-trim-cap text-[clamp(3.5rem,12vw,10rem)] leading-[0.85] text-off-white uppercase">
          Request a<br />
          Portfolio
        </h1>

        <div className="mt-20 max-w-2xl md:mt-28">
            <p className="font-body text-lg leading-relaxed text-off-white/70 md:text-xl">
              bleu works with a cultural clientele to create outstanding and
              emotionally visceral experiences. The studio works tirelessly from
              conception through launch to offer white glove service and
              award&#8209;winning results.
            </p>
            <p className="font-body mt-10 text-lg leading-relaxed text-off-white/70 md:text-xl">
              For more information or to discuss a project with the studio,
              please email
            </p>
            <a
              href="mailto:hello@bleu.studio"
              className="font-heading mt-4 inline-block text-2xl text-off-white underline decoration-bleu underline-offset-8 transition-colors hover:text-bleu md:text-3xl"
            >
              hello@bleu.studio
            </a>
        </div>
    </main>
  )
}
