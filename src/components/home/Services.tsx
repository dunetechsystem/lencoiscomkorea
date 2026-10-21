import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CarFront, Drone, Footprints, Mountain, Route, Sparkles, type LucideIcon } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { Reveal, SectionTitle } from "@/components/ui/Reveal";

const ICONS: Record<string, LucideIcon> = {
  mountain: Mountain,
  car: CarFront,
  route: Route,
  sparkles: Sparkles,
  drone: Drone,
  trekking: Footprints,
};

// Bento: o 1º card ocupa 2x2, os cantos de baixo dividem a linha. Cards "photo" usam fotos da galeria.
const LAYOUT = [
  { span: "sm:col-span-2 lg:row-span-2", photo: true, big: true },
  { span: "sm:col-span-2", photo: true },
  { span: "", photo: false },
  { span: "", photo: false },
  { span: "sm:col-span-2", photo: true },
  { span: "sm:col-span-2", photo: true },
];

export function Services({ images }: { images: string[] }) {
  let next = 0;
  return (
    <section id="experiencias" className="relative scroll-mt-20 overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
      <div className="absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-lagoon-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-gold-500/15 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            light
            eyebrow="O que fazemos"
            title={
              <>
                Muito mais que um <em className="text-lagoon-gradient">passeio</em>
              </>
            }
            text="Da busca no hotel até o último raio de sol nas dunas, cuidamos de tudo pra você só se preocupar em viver o momento."
          />
          <Reveal>
            <Link
              href="/#passeios"
              className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-bold ring-1 ring-white/15 backdrop-blur transition hover:bg-white hover:text-navy-900"
            >
              Ver passeios <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[minmax(15rem,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.services.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Sparkles;
            const layout = LAYOUT[i] ?? { span: "", photo: false };
            const image = layout.photo ? images[next++] : undefined;
            const number = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={s.title} delay={(i % 4) * 0.07} className={cn("h-full", layout.span)}>
                <div
                  className={cn(
                    "group relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] p-7 ring-1 ring-white/10 transition duration-500 hover:ring-white/25",
                    image ? "justify-end" : "bg-gradient-to-br from-white/[0.08] to-white/[0.02]",
                    layout.big && "min-h-[22rem] sm:p-9",
                  )}
                >
                  {image ? (
                    <>
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes={layout.big ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 50vw"}
                        className="-z-20 object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/10" />
                    </>
                  ) : (
                    <div className="absolute -right-16 -top-16 -z-10 h-44 w-44 rounded-full bg-lagoon-500/0 blur-3xl transition duration-700 group-hover:bg-lagoon-500/30" />
                  )}

                  <div className={cn("flex items-start justify-between", image && "absolute inset-x-7 top-7", image && layout.big && "sm:inset-x-9 sm:top-9")}>
                    <span
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl transition duration-500 group-hover:-rotate-6",
                        image ? "bg-white/15 ring-1 ring-white/25 backdrop-blur-md" : "bg-gradient-to-br from-lagoon-400 to-lagoon-600 shadow-lg shadow-lagoon-500/30",
                      )}
                    >
                      <Icon size={22} />
                    </span>
                    <span className="font-display text-sm italic text-white/40">{number}</span>
                  </div>

                  <div className={cn(!image && "mt-auto pt-10")}>
                    <h3 className={cn("font-display leading-tight", layout.big ? "text-3xl sm:text-4xl" : "text-2xl")}>{s.title}</h3>
                    <p className={cn("mt-2 leading-relaxed text-white/70", layout.big ? "max-w-md text-base" : "text-sm")}>{s.text}</p>
                  </div>

                  <ArrowUpRight
                    size={20}
                    className="absolute bottom-7 right-7 translate-y-2 text-white/0 transition duration-500 group-hover:translate-y-0 group-hover:text-gold-400"
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
