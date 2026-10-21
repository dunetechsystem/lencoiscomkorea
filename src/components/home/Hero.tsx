"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BadgeCheck, ChevronDown, Compass, Droplets, MapPin, Star } from "lucide-react";
import { site } from "@/config/site";
import { whatsappUrl } from "@/lib/format";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Wave } from "@/components/ui/Wave";

/** Guarás voando pelo céu do hero — os mesmos da logo. */
function Ibis({ className, delay }: { className?: string; delay: number }) {
  return (
    <motion.svg
      viewBox="0 0 64 32"
      className={className}
      initial={{ x: "-10vw", y: 0, opacity: 0 }}
      animate={{ x: "110vw", y: [0, -18, 6, -10, 0], opacity: [0, 1, 1, 1, 0] }}
      transition={{ duration: 26, delay, repeat: Infinity, ease: "linear" }}
      aria-hidden
    >
      <motion.path
        fill="currentColor"
        animate={{ d: ["M2 16 Q18 2 30 15 Q44 2 62 14 Q44 10 32 19 Q20 10 2 16Z", "M2 14 Q18 24 30 15 Q44 26 62 16 Q44 20 32 19 Q20 20 2 14Z"] }}
        transition={{ duration: 0.45, repeat: Infinity, repeatType: "mirror" }}
      />
    </motion.svg>
  );
}

export function Hero({
  images,
  tourCount,
  phone,
  lagoonLevel,
  rating,
  cadasturUrl,
}: {
  images: string[];
  tourCount: number;
  phone: string;
  lagoonLevel: number | null;
  rating: { average: number; count: number } | null;
  cadasturUrl: string | null;
}) {
  const slides = images.length ? images : [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2 || site.heroVideo) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy-950">
      {site.heroVideo ? (
        <video className="absolute inset-0 h-full w-full object-cover" src={site.heroVideo} autoPlay muted loop playsInline poster={slides[0]} />
      ) : (
        <AnimatePresence mode="sync">
          {slides[index] && (
            <motion.div
              key={slides[index]}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6 }}
            >
              <Image src={slides[index]} alt="" fill priority={index === 0} sizes="100vw" className="animate-kenburns object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/25 to-navy-950/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-navy-950/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(245,180,70,0.25),transparent_55%)]" />

      <Ibis className="absolute left-0 top-[18%] w-10 text-ibis-500" delay={0} />
      <Ibis className="absolute left-0 top-[22%] w-7 text-ibis-500" delay={0.8} />
      <Ibis className="absolute left-0 top-[16%] w-6 text-ibis-500" delay={1.5} />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-28 pt-36 sm:px-6 sm:pb-36">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.3em] text-gold-400"
        >
          <MapPin size={14} /> Barreirinhas · Lençóis Maranhenses
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-4xl text-balance font-display text-5xl leading-[0.95] text-white sm:text-7xl lg:text-8xl"
        >
          Lençóis <em className="text-gold-gradient pr-2">além</em> do roteiro
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl"
        >
          Passeios em 4x4 pelas lagoas, Rio Preguiças, Atins e Caburé com quem é daqui. Do clássico ao exclusivo — no seu ritmo.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/#passeios"
            className="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-2xl shadow-gold-500/40 transition hover:brightness-110"
          >
            {site.onlineBooking ? "Ver passeios e reservar" : "Ver passeios"}
          </Link>
          <a
            href={whatsappUrl(phone, "Olá! Quero montar meu roteiro nos Lençóis 😊")}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-center gap-3 rounded-full bg-white/10 py-2 pl-2 pr-7 text-sm font-bold text-white ring-1 ring-white/30 backdrop-blur-md transition hover:bg-[#25D366] hover:ring-[#25D366]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] transition group-hover:bg-white/20">
              <WhatsAppIcon size={20} />
            </span>
            <span className="text-left leading-tight">
              Montar meu roteiro
              <span className="block text-[11px] font-semibold text-white/70 group-hover:text-white/90">Fale direto com o guia no WhatsApp</span>
            </span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 inline-flex max-w-full flex-wrap divide-white/15 overflow-hidden rounded-3xl bg-navy-950/35 text-sm text-white ring-1 ring-white/15 backdrop-blur-md sm:flex-nowrap sm:divide-x"
        >
          {rating && (
            <Link href="/#avaliacoes" className="flex items-center gap-3 px-5 py-3.5 transition hover:bg-white/10">
              <span className="font-display text-3xl leading-none">{rating.average.toFixed(1).replace(".", ",")}</span>
              <span className="leading-tight">
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={13} className={i < Math.round(rating.average) ? "fill-gold-400 text-gold-400" : "text-white/30"} />
                  ))}
                </span>
                <span className="text-xs text-white/70">{rating.count} avaliações</span>
              </span>
            </Link>
          )}
          {cadasturUrl ? (
            <a href={cadasturUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 px-5 py-3.5 transition hover:bg-white/10">
              <BadgeCheck size={22} className="text-lagoon-300" />
              <span className="leading-tight">
                <strong className="block">Cadastur</strong>
                <span className="text-xs text-white/70">Registro no Min. do Turismo</span>
              </span>
            </a>
          ) : (
            <span className="flex items-center gap-2.5 px-5 py-3.5">
              <BadgeCheck size={22} className="text-lagoon-300" />
              <span className="leading-tight">
                <strong className="block">Agência local</strong>
                <span className="text-xs text-white/70">Guia nascido em Barreirinhas</span>
              </span>
            </span>
          )}
          {lagoonLevel != null && (
            <Link href="/#lagoas" className="flex items-center gap-2.5 px-5 py-3.5 transition hover:bg-white/10">
              <Droplets size={22} className="text-lagoon-300" />
              <span className="leading-tight">
                <strong className="block">{lagoonLevel}% cheias</strong>
                <span className="text-xs text-white/70">Lagoas hoje</span>
              </span>
            </Link>
          )}
          {tourCount > 0 && (
            <Link href="/#passeios" className="flex items-center gap-2.5 px-5 py-3.5 transition hover:bg-white/10">
              <Compass size={22} className="text-gold-400" />
              <span className="leading-tight">
                <strong className="block">{tourCount} passeios</strong>
                <span className="text-xs text-white/70">Reserva online</span>
              </span>
            </Link>
          )}
        </motion.div>
      </div>

      {slides.length > 1 && !site.heroVideo && (
        <div className="absolute bottom-24 right-6 hidden gap-1.5 sm:flex">
          {slides.map((s, i) => (
            <button
              key={s}
              onClick={() => setIndex(i)}
              aria-label={`Foto ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-gold-400" : "w-1.5 bg-white/40"}`}
            />
          ))}
        </div>
      )}

      <Link href="/#passeios" aria-label="Rolar" className="absolute bottom-16 left-1/2 hidden -translate-x-1/2 text-white/70 sm:block">
        <ChevronDown className="animate-bounce" />
      </Link>
      <Wave className="absolute -bottom-px left-0 h-[60px] w-full text-sand-50" />
    </section>
  );
}
