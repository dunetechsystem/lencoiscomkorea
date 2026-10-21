"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import { site } from "@/config/site";
import { InstagramIcon, TikTokIcon } from "@/components/ui/BrandIcons";
import { Reveal, SectionTitle } from "@/components/ui/Reveal";

/** "https://www.instagram.com/reel/ABC123/?igsh=…" → URL do embed oficial. */
function embedUrl(url: string) {
  const m = url.match(/instagram\.com\/(?:[\w.]+\/)?(reel|reels|p|tv)\/([\w-]+)/i);
  if (!m) return null;
  const kind = m[1].toLowerCase() === "p" ? "p" : "reel";
  return `https://www.instagram.com/${kind}/${m[2]}/embed`;
}

/** Vídeo vertical estilo stories: toca mudo quando aparece na tela; tocar liga o som. */
function StoryVideo({ src, poster, title, handle }: { src: string; poster?: string; title: string; handle: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().then(() => setPlaying(true)).catch(() => {});
        else {
          video.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.6 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <div className="group relative aspect-[9/16] w-[240px] shrink-0 snap-center overflow-hidden rounded-[2rem] bg-navy-900 shadow-2xl sm:w-[270px]">
      <video ref={ref} src={src} poster={poster} muted={muted} loop playsInline preload="metadata" className="h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/30" />
      <div className="absolute inset-x-0 top-0 flex items-center gap-2 p-4">
        <span className="relative h-8 w-8 overflow-hidden rounded-full bg-white ring-2 ring-gold-400">
          <Image src="/logo-misterk.webp" alt="" fill sizes="32px" className="object-contain p-0.5" />
        </span>
        <span className="text-xs font-bold text-white">{handle}</span>
      </div>
      {!playing && (
        <Play className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 fill-white/90 text-white/90" />
      )}
      <p className="absolute inset-x-0 bottom-0 p-4 text-sm font-bold text-white">{title}</p>
      <button
        onClick={() => {
          setMuted((m) => !m);
          ref.current?.play().catch(() => {});
        }}
        aria-label={muted ? "Ligar som" : "Desligar som"}
        className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur"
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </div>
  );
}

export function InstagramSection({
  instagram,
  photos,
  videos,
}: {
  instagram: string;
  /** Fotos pro mosaico quando não há reels configurados. */
  photos: string[];
  /** Vídeos vindos do DunasTour (fotos/vídeos dos lugares). */
  videos: { src: string; title: string }[];
}) {
  const reels = site.instagramReels.map(embedUrl).filter((u): u is string => !!u);
  const stories = [...site.videos, ...videos];
  const profile = `https://instagram.com/${instagram}`;

  return (
    <section id="instagram" className="scroll-mt-20 overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            eyebrow="Vídeos & Instagram"
            title={
              <>
                Sinta o clima <em className="text-gold-gradient">antes de chegar</em>
              </>
            }
            text="Pôr do sol, banho de lagoa, travessia de balsa e muita risada. Acompanhe os bastidores dos passeios."
          />
          <Reveal className="flex shrink-0 gap-3">
            <a
              href={profile}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
            >
              <InstagramIcon size={18} /> Seguir @{instagram}
            </a>
            <a
              href={`https://www.tiktok.com/@${site.tiktok}`}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-navy-950 text-white transition hover:bg-navy-800"
            >
              <TikTokIcon />
            </a>
          </Reveal>
        </div>
      </div>

      {(reels.length > 0 || stories.length > 0) && (
        <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 sm:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
          {stories.map((v) => (
            <StoryVideo key={v.src} {...v} handle={instagram} />
          ))}
          {reels.map((src) => (
            <div key={src} className="w-[328px] shrink-0 snap-center overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-navy-900/5">
              <iframe src={src} title="Reel do Instagram" loading="lazy" allowFullScreen className="h-[600px] w-full border-0" />
            </div>
          ))}
        </div>
      )}

      {reels.length === 0 && photos.length > 0 && (
        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-3 gap-1.5 px-4 sm:grid-cols-6 sm:gap-3 sm:px-6">
          {photos.slice(0, 6).map((url, i) => (
            <Reveal key={url} delay={i * 0.05}>
              <a href={profile} target="_blank" rel="noreferrer" className="group relative block aspect-square overflow-hidden rounded-2xl bg-sand-100 sm:rounded-3xl">
                <Image src={url} alt="" fill sizes="(max-width: 640px) 33vw, 16vw" className="object-cover transition duration-700 group-hover:scale-110" />
                <span className="absolute inset-0 flex items-center justify-center bg-navy-950/50 text-white opacity-0 transition group-hover:opacity-100">
                  <InstagramIcon size={28} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
