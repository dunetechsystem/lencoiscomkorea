"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { whatsappUrl } from "@/lib/format";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

const DISMISSED_KEY = "misterk:wa-bubble";

export function WhatsAppFab({ phone }: { phone: string }) {
  const pathname = usePathname();
  const [bubble, setBubble] = useState(false);

  // Balão de saudação aparece uma vez por sessão, depois de o visitante olhar a página um pouco.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISSED_KEY)) return;
    } catch {}
    const id = setTimeout(() => setBubble(true), 9000);
    return () => clearTimeout(id);
  }, []);

  function dismiss() {
    setBubble(false);
    try {
      sessionStorage.setItem(DISMISSED_KEY, "1");
    } catch {}
  }

  // No checkout a barra do rodapé ocupa esse canto.
  if (pathname.startsWith("/reservar")) return null;
  const href = whatsappUrl(phone, "Olá! Vim pelo site e quero saber sobre os passeios 😊");

  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-3">
      <AnimatePresence>
        {bubble && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="relative w-72 origin-bottom-right rounded-3xl rounded-br-md bg-white p-4 pr-9 shadow-2xl shadow-navy-950/25 ring-1 ring-navy-900/5"
          >
            <button onClick={dismiss} aria-label="Fechar" className="absolute right-2.5 top-2.5 rounded-full p-1 text-navy-900/40 transition hover:bg-navy-900/5 hover:text-navy-900">
              <X size={16} />
            </button>
            <a href={href} target="_blank" rel="noreferrer" onClick={dismiss} className="flex gap-3">
              <span className="relative h-11 w-11 shrink-0">
                <Image src="/guia-perfil.webp" alt="" fill sizes="44px" className="rounded-full object-cover" />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#25D366] text-white ring-2 ring-white">
                  <WhatsAppIcon size={9} />
                </span>
              </span>
              <span className="text-sm leading-snug">
                <strong className="block text-navy-900">Mister K</strong>
                <span className="text-navy-900/70">Oi! 👋 Quer ajuda pra escolher o passeio ou montar seu roteiro? Me chama aqui.</span>
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp com o Mister K"
        onClick={dismiss}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        className="group relative flex h-14 items-center gap-3 rounded-full bg-[#25D366] pl-1.5 pr-1.5 text-white shadow-xl shadow-[#25D366]/30 transition hover:bg-[#1ebe5b] sm:pr-5"
      >
        {/* Chama atenção só algumas vezes, não pra sempre. */}
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s] [animation-iteration-count:3]" />
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
          <WhatsAppIcon size={26} />
        </span>
        <span className="hidden text-left leading-tight sm:block">
          <span className="block text-sm font-extrabold">Fale com o Mister K</span>
          <span className="block text-[11px] font-semibold text-white/85">Tire dúvidas pelo WhatsApp</span>
        </span>
        {bubble && <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full bg-ibis-500 ring-2 ring-white" aria-hidden />}
      </motion.a>
    </div>
  );
}
