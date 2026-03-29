"use client"

import { useRef, useState } from "react"
import type { FormEvent } from "react"

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // TODO: wire up to an API route or email service
    setSubmitted(true)
  }

  return (
    <main className="min-h-dvh bg-black px-page-x pb-page-bottom pt-page-top md:px-page-x-md md:pt-page-top-md">
      <h1 className="font-heading text-trim-cap mb-title-gap text-[clamp(2.5rem,8vw,7rem)] leading-none text-off-white">
        Contact
      </h1>

      {submitted ? (
        <div className="font-body max-w-2xl text-off-white/80">
          <p className="text-lg">
            Thank you for reaching out. We&rsquo;ll get back to you soon.
          </p>
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="font-body max-w-2xl space-y-section-gap text-off-white"
        >
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm tracking-wide text-off-white/60">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full border-b border-off-white/20 bg-transparent py-3 text-lg text-off-white outline-none placeholder:text-off-white/30 focus:border-bleu transition-colors"
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm tracking-wide text-off-white/60">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full border-b border-off-white/20 bg-transparent py-3 text-lg text-off-white outline-none placeholder:text-off-white/30 focus:border-bleu transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="service" className="block text-sm tracking-wide text-off-white/60">
              What can we help with?
            </label>
            <select
              id="service"
              name="service"
              className="w-full border-b border-off-white/20 bg-transparent py-3 text-lg text-off-white outline-none focus:border-bleu transition-colors appearance-none cursor-pointer"
            >
              <option value="" className="bg-black">Select a service</option>
              <option value="brand-identity" className="bg-black">Brand Identity</option>
              <option value="art-direction" className="bg-black">Art Direction</option>
              <option value="web-design" className="bg-black">Web Design</option>
              <option value="graphics-design" className="bg-black">Graphics Design</option>
              <option value="e-commerce" className="bg-black">E-Commerce</option>
              <option value="digital-products" className="bg-black">Digital Products</option>
              <option value="other" className="bg-black">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm tracking-wide text-off-white/60">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full resize-none border-b border-off-white/20 bg-transparent py-3 text-lg text-off-white outline-none placeholder:text-off-white/30 focus:border-bleu transition-colors"
              placeholder="Tell us about your project"
            />
          </div>

          <button
            type="submit"
            className="font-heading border border-off-white/20 bg-transparent px-10 py-4 text-sm tracking-widest text-off-white uppercase transition-colors hover:bg-bleu hover:border-bleu hover:text-black"
          >
            Send
          </button>
        </form>
      )}
    </main>
  )
}
