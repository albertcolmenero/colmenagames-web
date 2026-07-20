# Colmena Experience — Web

Landing page B2B de una sola página para **Colmena Experience** (team building flexible para empresas). Construida con Next.js 16 (App Router), TypeScript, Tailwind CSS v4 y Framer Motion.

Diseño: edición digital del dossier de marca — tipografía grotesca pesada en mayúsculas, miel/amarillo como acento (no como fondo dominante), sistema gráfico de hexágonos, abejas y dados, y "chrome" editorial (índices, paginadores, taglines encuadradas).

## Arranque

```bash
npm install
npm run dev      # http://localhost:3210
npm run build    # build de producción
npm start        # servir el build
```

## Dónde se edita CADA cosa

### ✍️ Todo el texto → `src/content/site.ts`

**Fuente única de contenido.** Cualquier palabra visible (titulares, copy, testimonios, precios, datos de contacto, etiquetas SEO) se cambia aquí, sin tocar componentes. Está en español de España.

Bloques: `company`, `seo`, `nav`, `hero`, `clientsStrip`, `esencia`, `porQue`, `proceso`, `experiencias`, `testimonios`, `formatos`, `equipo`, `contacto`, `footer`.

### 🎨 Colores y tipografía → `src/app/globals.css`

Tokens de marca en el bloque `@theme` (miel, ámbar, tinta, azul del dossier, grises, marrón). Las fuentes se cargan en `src/app/layout.tsx` (Archivo Black para titulares, Hanken Grotesk para texto, Geist Mono para los índices).

## Decisiones que conviene revisar con el cliente

1. **Precios visibles.** El dossier muestra precios orientativos (desde 45/35/30 €/persona) y aquí se muestran igual, enmarcados como *orientativos* y con CTA al formulario. Si prefieres ocultarlos y dejar solo el formulario (como sugiere un punto del documento estratégico), edita `formatos.tiers` en `site.ts` (p. ej. pon todo a "Consultar"). Es un cambio de un sitio.

2. **Formulario de contacto.** Ahora simula el envío (preview). Para producción, conecta un endpoint real en `src/components/sections/Contacto.tsx` (función `handleSubmit`): Formcarry, Resend, un webhook, o un enlace a **Calendly** para la "llamada de 30 minutos" (el documento estratégico lo apunta como buena opción).

3. **Fotografía.** No hay imágenes corporativas autorizadas (y no se muestran caras). Las "escenas" de experiencias y el resto de bloques usan composiciones gráficas de marca (hexágonos + degradados cálidos en duotono) en lugar de stock. Cuando haya fotos reales de eventos, se pueden integrar con el mismo tratamiento duotono cálido en `Experiencias.tsx` y el spotlight.

4. **Dominio / contacto.** Definidos en `company` (`site.ts`): `colmena-experience.com`, `hola@colmenaexperience.com`, `+34 623 286 976`, LinkedIn e Instagram. Actualiza la URL de LinkedIn cuando esté confirmada.

## SEO incluido

- `title` + `meta description` optimizados y `metadataBase`.
- Open Graph + Twitter Card con **imagen OG generada dinámicamente** (`src/app/opengraph-image.tsx`).
- Datos estructurados JSON-LD (`ProfessionalService`) en `layout.tsx`.
- `sitemap.xml` y `robots.txt` (`src/app/sitemap.ts`, `robots.ts`).
- `<html lang="es">`, jerarquía correcta de encabezados (un único `h1`), `alt`/`aria-hidden` en gráficos, enlace "saltar al contenido".
- Favicon SVG (`src/app/icon.svg`).

## Estructura

```
src/
├── app/                # layout (SEO, fuentes, JSON-LD), page, globals.css, og, sitemap, robots, icon
├── content/site.ts     # TODO el texto + SEO (fuente única)
├── components/
│   ├── sections/       # Hero, ClientsStrip, Esencia, PorQue, Proceso, Experiencias,
│   │                   # Testimonios, Formatos, Equipo, Contacto, Footer, Header, DockedCTA
│   ├── ui/             # Section (chrome editorial), Button, Reveal, BracketTagline
│   └── brand/          # Logo, icons (hexágono, abeja, dado), FlyingBee
└── lib/utils.ts        # helper cn()
```

Accesibilidad: todas las animaciones respetan `prefers-reduced-motion`.
