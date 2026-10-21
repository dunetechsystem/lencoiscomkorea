import type { Metadata } from "next";
import { getAgency, getPackages, getTours } from "@/lib/dunastour/server";
import { agencyInfo } from "@/lib/agency-info";
import { PageHero } from "@/components/layout/PageHero";
import { PackageCardView, TourCard } from "@/components/tour/TourCard";
import { EmptyTours } from "@/components/tour/EmptyTours";
import { Reveal } from "@/components/ui/Reveal";

export const revalidate = 300;
export const metadata: Metadata = { title: "Passeios" };

export default async function ToursPage() {
  const [tours, packages, agency] = await Promise.all([getTours(), getPackages(), getAgency()]);
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
          packages.length === 0 && <EmptyTours phone={agencyInfo(agency).phone} />
        )}
      </div>
    </>
  );
}
