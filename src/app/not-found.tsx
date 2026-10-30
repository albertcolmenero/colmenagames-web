import es from "@/i18n/es";
import { LocaleProvider } from "@/i18n/context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Eyebrow } from "@/components/primitives";

export default function NotFound() {
  return (
    <LocaleProvider copy={es} locale="es">
      <Header linkPrefix="/" />
      <main className="bg-bone px-5 pb-28 pt-36 sm:px-8">
        <div className="mx-auto w-full max-w-3xl">
          <Eyebrow>404</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
            Esta página no está
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/70">
            El enlace no lleva a ninguna página de Colmena Experience.
          </p>
          <p className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            <a href="/" className="text-ember underline underline-offset-4">
              Volver al inicio
            </a>
            <a href="/blog" className="text-ember underline underline-offset-4">
              Ir al blog
            </a>
          </p>
        </div>
      </main>
      <Footer linkPrefix="/" />
    </LocaleProvider>
  );
}
