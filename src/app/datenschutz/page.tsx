import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutz — bleu",
  description: "Datenschutzerklärung von bleu Creative Studio.",
};

export default function Datenschutz() {
  return (
    <main className="min-h-dvh bg-black px-page-x pb-page-bottom pt-page-top md:px-page-x-md md:pt-page-top-md">
      <h1 className="font-heading text-trim-cap mb-title-gap text-[clamp(2.5rem,8vw,7rem)] leading-none text-off-white">
        Datenschutz
      </h1>

      <div className="font-body max-w-2xl space-y-section-gap text-base leading-relaxed text-off-white/80">
        <section>
          <h2 className="font-heading mb-4 text-lg text-off-white">
            1. Datenschutz auf einen Blick
          </h2>
          <h3 className="font-heading mb-2 text-base text-off-white">
            Allgemeine Hinweise
          </h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was
            mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website
            besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
            persönlich identifiziert werden können.
          </p>
        </section>

        <section>
          <h2 className="font-heading mb-4 text-lg text-off-white">
            2. Verantwortliche Stelle
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
          <p className="mt-4">
            E-Mail: hello@bleu.studio
          </p>
          <p className="mt-4">
            Verantwortliche Stelle ist die natürliche oder juristische Person,
            die allein oder gemeinsam mit anderen über die Zwecke und Mittel der
            Verarbeitung von personenbezogenen Daten entscheidet.
          </p>
        </section>

        <section>
          <h2 className="font-heading mb-4 text-lg text-off-white">
            3. Datenerfassung auf dieser Website
          </h2>

          <h3 className="font-heading mb-2 text-base text-off-white">
            Server-Log-Dateien
          </h3>
          <p>
            Der Provider der Seiten erhebt und speichert automatisch
            Informationen in so genannten Server-Log-Dateien, die Ihr Browser
            automatisch an uns übermittelt. Dies sind:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-1">
            <li>Browsertyp und Browserversion</li>
            <li>Verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse</li>
          </ul>
          <p className="mt-4">
            Eine Zusammenführung dieser Daten mit anderen Datenquellen wird
            nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage
            von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein
            berechtigtes Interesse an der technisch fehlerfreien Darstellung und
            der Optimierung seiner Website.
          </p>
        </section>

        <section>
          <h2 className="font-heading mb-4 text-lg text-off-white">
            4. Hosting
          </h2>
          <p>
            Diese Website wird extern gehostet. Die personenbezogenen Daten, die
            auf dieser Website erfasst werden, werden auf den Servern des
            Hosters gespeichert. Hierbei kann es sich v.a. um IP-Adressen,
            Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten,
            Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über
            eine Website generiert werden, handeln.
          </p>
          <p className="mt-4">
            Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung
            gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1
            lit. b DSGVO) und im Interesse einer sicheren, schnellen und
            effizienten Bereitstellung unseres Online-Angebots durch einen
            professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
        </section>

        <section>
          <h2 className="font-heading mb-4 text-lg text-off-white">
            5. Ihre Rechte
          </h2>
          <p>Sie haben jederzeit das Recht:</p>
          <ul className="mt-4 list-inside list-disc space-y-1">
            <li>
              Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu
              erhalten (Art. 15 DSGVO)
            </li>
            <li>
              Berichtigung unrichtiger personenbezogener Daten zu verlangen (Art.
              16 DSGVO)
            </li>
            <li>
              Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu
              verlangen (Art. 17 DSGVO)
            </li>
            <li>
              Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu
              verlangen (Art. 18 DSGVO)
            </li>
            <li>
              Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten
              einzulegen (Art. 21 DSGVO)
            </li>
            <li>Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)</li>
          </ul>
          <p className="mt-4">
            Sie haben zudem das Recht, sich bei einer
            Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer
            personenbezogenen Daten durch uns zu beschweren.
          </p>
        </section>

        <section>
          <h2 className="font-heading mb-4 text-lg text-off-white">
            6. Adobe Fonts (Typekit)
          </h2>
          <p>
            Diese Website nutzt zur einheitlichen Darstellung von Schriftarten
            Adobe Fonts von Adobe Inc., 345 Park Avenue, San Jose, CA 95110-2704,
            USA. Beim Aufruf einer Seite lädt Ihr Browser die benötigten
            Schriftarten in Ihren Browsercache, um Texte und Schriftarten korrekt
            anzuzeigen.
          </p>
          <p className="mt-4">
            Zu diesem Zweck muss der von Ihnen verwendete Browser Verbindung zu
            den Servern von Adobe aufnehmen. Hierdurch erlangt Adobe Kenntnis
            darüber, dass über Ihre IP-Adresse diese Website aufgerufen wurde.
            Die Nutzung von Adobe Fonts erfolgt auf Grundlage von Art. 6 Abs. 1
            lit. f DSGVO. Weitere Informationen zu Adobe Fonts finden Sie unter{" "}
            <a
              href="https://www.adobe.com/de/privacy.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-off-white underline underline-offset-4 transition-colors hover:text-bleu"
            >
              https://www.adobe.com/de/privacy.html
            </a>
            .
          </p>
        </section>

        <div className="pt-8">
          <Link
            href="/impressum"
            className="text-off-white underline underline-offset-4 transition-colors hover:text-bleu"
          >
            Impressum
          </Link>
        </div>
      </div>
    </main>
  );
}
