/**
 * Animação da logo em loop. O fundo branco do vídeo some no areia da página com mix-blend-multiply.
 */
export function LogoAnimation({ src }: { src: string }) {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-16 sm:px-6 sm:pt-24">
      <video src={src} autoPlay muted loop playsInline aria-hidden className="aspect-video w-full mix-blend-multiply" />
    </section>
  );
}
