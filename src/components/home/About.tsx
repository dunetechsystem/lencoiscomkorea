import Image from "next/image";
import { BadgeCheck, CarFront, Heart, MapPin } from "lucide-react";
import { site } from "@/config/site";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";

/** "Quem te leva": foto do guia + a descrição que a agência escreveu no DunasTour. */
export function About({ description, instagram }: { description: string | null; instagram: string }) {
  const lines = (description ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-2">
      <Reveal className="relative mx-auto w-full max-w-md">
        <div className="absolute -inset-6 -z-10 rounded-full bg-gradient-to-br from-lagoon-300/40 via-sand-200 to-gold-400/40 blur-2xl" />
        <div className="relative aspect-[592/615] overflow-hidden rounded-full ring-8 ring-white shadow-2xl">
          <Image src="/guia-perfil.webp" alt="Mister K, seu guia nos Lençóis" fill sizes="(max-width: 768px) 90vw, 450px" className="object-cover" />
        </div>
        <div className="absolute -bottom-2 -right-2 animate-float rounded-3xl bg-white p-4 shadow-xl sm:-right-8">
          <p className="flex items-center gap-2 text-sm font-extrabold text-navy-900">
            <BadgeCheck size={18} className="text-lagoon-500" /> Guia local
          </p>
          <p className="text-xs text-navy-900/50">Nascido e criado aqui</p>
        </div>
        <a
          href={`https://instagram.com/${instagram}`}
          target="_blank"
          rel="noreferrer"
          className="absolute -left-2 top-8 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] px-4 py-2 text-xs font-bold text-white shadow-lg sm:-left-8"
        >
          <InstagramIcon size={16} /> @{instagram}
        </a>
      </Reveal>

      <div>
        <Reveal>
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-gold-500">{site.tagline}</p>
          <h2 className="mt-3 text-balance font-display text-4xl leading-[1.05] text-navy-900 sm:text-5xl">
            Quem conhece cada duna <em className="text-lagoon-gradient">te leva</em> pelos melhores caminhos
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          {lines.length > 0 ? (
            <ul className="mt-8 space-y-2.5 text-lg text-navy-900/75">
              {lines.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 text-lg leading-relaxed text-navy-900/70">
              Passeios personalizados do seu jeito, com guia local e experiências autênticas nos Lençóis Maranhenses.
            </p>
          )}
        </Reveal>
        <Reveal delay={0.2} className="mt-10 grid grid-cols-3 gap-3">
          {[
            { icon: MapPin, title: "100% local", text: "Barreirinhas" },
            { icon: CarFront, title: "4x4", text: "Conforto e segurança" },
            { icon: Heart, title: "Do seu jeito", text: "Roteiros sob medida" },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl bg-white p-4 text-center shadow-sm ring-1 ring-navy-900/5">
              <Icon size={22} className="mx-auto text-gold-500" />
              <p className="mt-2 font-extrabold text-navy-900">{title}</p>
              <p className="text-xs text-navy-900/50">{text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
