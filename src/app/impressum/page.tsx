import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum — bleu",
  description: "Impressum und Angaben gemäß § 5 TMG.",
};

export default function Impressum() {
  return (
    <main className="min-h-dvh bg-black px-6 pb-32 pt-16 md:px-16 md:pt-24">
      <h1 className="font-heading text-trim-cap mb-16 text-[clamp(2.5rem,8vw,7rem)] leading-none text-off-white">
        Impressum
      </h1>

      <div className="font-body max-w-2xl space-y-12 text-base leading-relaxed text-off-white/80">
        <section>
          <h2 className="font-heading mb-4 text-lg text-off-white">
            Angaben gemäß § 5 TMG
          </h2>
          <p>
            bleu Creative Studio
            <br />
            Cedric Weber
            <br />
            Musterstraße 1
            <br />
            80333 München
          </p>
        </section>

        <section>
          <h2 className="font-heading mb-4 text-lg text-off-white">Kontakt</h2>
          <p>
            E-Mail: hello@bleu.studio
          </p>
        </section>

        <section>
          <h2 className="font-heading mb-4 text-lg text-off-white">
            Umsatzsteuer-ID
          </h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a
            Umsatzsteuergesetz:
            <br />
            DE XXX XXX XXX
          </p>
        </section>

        <section>
          <h2 className="font-heading mb-4 text-lg text-off-white">
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          </h2>
          <p>
            Cedric Weber
            <br />
            Musterstraße 1
            <br />
            80333 München
          </p>
        </section>

        <section>
          <h2 className="font-heading mb-4 text-lg text-off-white">
            Haftung für Inhalte
          </h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
            auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
            §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
            überwachen oder nach Umständen zu forschen, die auf eine
            rechtswidrige Tätigkeit hinweisen.
          </p>
          <p className="mt-4">
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
            Informationen nach den allgemeinen Gesetzen bleiben hiervon
            unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
            Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
            Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
            Inhalte umgehend entfernen.
          </p>
        </section>

        <section>
          <h2 className="font-heading mb-4 text-lg text-off-white">
            Haftung für Links
          </h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
            fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
            der Seiten verantwortlich. Die verlinkten Seiten wurden zum
            Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
            Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
            erkennbar.
          </p>
          <p className="mt-4">
            Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist
            jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
            zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
            derartige Links umgehend entfernen.
          </p>
        </section>

        <section>
          <h2 className="font-heading mb-4 text-lg text-off-white">
            Urheberrecht
          </h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            Downloads und Kopien dieser Seite sind nur für den privaten, nicht
            kommerziellen Gebrauch gestattet.
          </p>
        </section>

        <div className="pt-8">
          <Link
            href="/datenschutz"
            className="text-off-white underline underline-offset-4 transition-colors hover:text-bleu"
          >
            Datenschutzerklärung
          </Link>
        </div>
      </div>
    </main>
  );
}
