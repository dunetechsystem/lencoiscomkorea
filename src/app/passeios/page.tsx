import type { Metadata } from "next";
import { getAgency, getPackages, getTours } from "@/lib/dunastour/server";
import { agencyInfo } from "@/lib/agency-info";
import { PageHero } from "@/components/layout/PageHero";
import { PackageCardView, TourCard } from "@/components/tour/TourCard";
import { EmptyTours } from "@/components/tour/EmptyTours";
import { Reveal } from "@/components/ui/Reveal";
import { splitTransfers } from "@/lib/transfers";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Passeios",
  alternates: { canonical: "/passeios" },
  description: "Passeios 4x4 pela Lagoa Azul e Lagoa Bonita, Rio Preguiças, Atins, Caburé e trekking nos Lençóis Maranhenses, com busca no hotel.",
};

export default async function ToursPage() {
  const [allTours, packages, agency] = await Promise.all([getTours(), getPackages(), getAgency()]);
  const { tours, transfers } = splitTransfers(allTours);
  return (
    <>
      <PageHero
        image={tours[0]?.coverImageUrl}
        eyebrow="Reserve online"
        title={
          <>
            Todos os <em className="text-gold-gradient">passeios</em>
          </>
        }
        crumbs={[{ href: "/", label: "Início" }]}
      >
        <p className="mt-4 max-w-xl text-lg text-white/75">Escolha um ou vários — cada um com a sua data. Você só paga depois que a agência confirmar.</p>
      </PageHero>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {packages.length > 0 && (
          <div className="mb-12 grid gap-5 md:grid-cols-2">
            {packages.map((p) => (
              <PackageCardView key={p.id} pkg={p} />
            ))}
          </div>
        )}
        {tours.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour, i) => (
              <Reveal key={tour.id} delay={(i % 3) * 0.08}>
                <TourCard tour={tour} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        ) : (
          packages.length === 0 && transfers.length === 0 && <EmptyTours phone={agencyInfo(agency).phone} />
        )}
        {transfers.length > 0 && (
          <section id="transfers" className="mt-20 scroll-mt-24">
            <h2 className="mb-8 font-display text-4xl text-navy-900">
              <em className="text-gold-gradient">Transfers</em>
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {transfers.map((tour, i) => (
                <Reveal key={tour.id} delay={(i % 3) * 0.08}>
                  <TourCard tour={tour} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
