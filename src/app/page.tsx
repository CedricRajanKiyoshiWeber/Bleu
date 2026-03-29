import HeroAnimation from '@/components/HeroAnimation'

export default function Home() {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-black">
      <div className="sr-only">
        <h1>bleu — Creative Studio Munich</h1>
        <p>
          We refine and build brand worlds — visual, digital, conceptual.
        </p>
        <h2>Services</h2>
        <ul>
          <li>Visual Identity and Art Direction</li>
          <li>Custom Web Development</li>
          <li>Custom Shopify Storefronts</li>
          <li>Campaign Design and Newsletter Marketing</li>
          <li>Brand Strategy</li>
          <li>Content Direction</li>
        </ul>
        <h2>Industries</h2>
        <ul>
          <li>Fashion and Lifestyle</li>
          <li>Music and Nightlife</li>
          <li>Culture and Creative Industries</li>
        </ul>
      </div>
      <HeroAnimation />
    </main>
  )
}
