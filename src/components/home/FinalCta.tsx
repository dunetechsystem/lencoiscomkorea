import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, CarFront, Wallet } from "lucide-react";
import { whatsappUrl } from "@/lib/format";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";

const PERKS = [
  { icon: Wallet, text: "Sem pagamento agora" },
  { icon: CalendarCheck, text: "Confirmação pelo WhatsApp" },
  { icon: CarFront, text: "Busca na pousada" },
];

// Colagem à direita: fotos inclinadas, a do meio por cima.
const TILES = [
  "left-0 top-10 w-[46%] -rotate-6",
  "right-0 top-0 w-[46%] rotate-6",
  "left-1/2 top-1/3 z-10 w-[52%] -translate-x-1/2 rotate-1",
];

export function FinalCta({ images, phone }: { images: string[]; phone: string }) {
  const tiles = images.slice(0, 3);
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-navy-950 via-navy-900 to-lagoon-700 text-white">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-gold-500/20 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-lagoon-400/25 blur-3xl" />

        <div className={`relative grid items-center gap-12 px-6 py-16 sm:px-14 sm:py-20 ${tiles.length === 3 ? "lg:grid-cols-[1.1fr_1fr]" : "text-center"}`}>
          <div className={tiles.length === 3 ? "" : "mx-auto max-w-2xl"}>
            <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-gold-400">Bora pros Lençóis?</p>
            <h2 className="mt-4 text-balance font-display text-4xl leading-[1.05] sm:text-6xl">
              Sua próxima memória favorita está <em className="text-gold-gradient pr-1">a uma reserva</em> de distância
            </h2>
            <div className={`mt-10 flex flex-col gap-3 sm:flex-row ${tiles.length === 3 ? "" : "justify-center"}`}>
              <Link
                href="/passeios"
                className="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-2xl shadow-gold-500/30 transition hover:brightness-110"
              >
                Escolher meus passeios <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </Link>
              <a
                href={whatsappUrl(phone, "Olá! Quero ajuda pra montar meu roteiro nos Lençóis 😊")}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-center gap-3 rounded-full bg-white/10 py-2 pl-2 pr-7 text-sm font-bold ring-1 ring-white/30 backdrop-blur transition hover:bg-[#25D366] hover:ring-[#25D366]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] transition group-hover:bg-white/20">
                  <WhatsAppIcon size={20} />
                </span>
                Tirar dúvidas
              </a>
            </div>
            <ul className={`mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70 ${tiles.length === 3 ? "" : "justify-center"}`}>
              {PERKS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2">
                  <Icon size={16} className="text-gold-400" /> {text}
                </li>
              ))}
            </ul>
          </div>

          {tiles.length === 3 && (
            <div className="relative mx-auto hidden aspect-square w-full max-w-md lg:block">
              {tiles.map((src, i) => (
                <div
                  key={src}
                  className={`absolute aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-navy-950/50 ring-4 ring-white/90 transition duration-500 hover:z-20 hover:rotate-0 hover:scale-105 ${TILES[i]}`}
                >
                  <Image src={src} alt="" fill sizes="240px" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
