import { Compass } from "lucide-react";
import { whatsappUrl } from "@/lib/format";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/** API fora do ar ou agência sem passeios ativos: o turista ainda consegue falar com a agência. */
export function EmptyTours({ phone }: { phone: string }) {
  return (
    <div className="mt-12 flex flex-col items-center rounded-[2rem] bg-white px-6 py-16 text-center ring-1 ring-navy-900/5">
      <Compass size={40} className="text-lagoon-500" />
      <p className="mt-4 font-display text-2xl text-navy-900">Estamos atualizando nossos passeios</p>
      <p className="mt-2 max-w-md text-navy-900/60">Enquanto isso, chama a gente no WhatsApp que montamos seu roteiro na hora.</p>
      <a
        href={whatsappUrl(phone, "Olá! Quero saber dos passeios disponíveis 😊")}
        target="_blank"
        rel="noreferrer"
        className="mt-6 flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-bold text-white"
      >
        <WhatsAppIcon size={18} /> Falar no WhatsApp
      </a>
    </div>
  );
}
