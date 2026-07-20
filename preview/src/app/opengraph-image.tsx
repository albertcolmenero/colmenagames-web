import { ImageResponse } from "next/og";

export const alt =
  "Colmena Experience — Aquí pasan cosas. Team buildings flexibles para empresas.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px",
          background: "#efd98a",
          fontFamily: "sans-serif",
        }}
      >
        {/* chrome superior */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 4,
            color: "#5a3e2b",
            fontWeight: 700,
          }}
        >
          <span>COLMENA EXPERIENCE</span>
          <span>COLMENA-EXPERIENCE.COM</span>
        </div>

        {/* Titular */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 175,
              fontWeight: 900,
              lineHeight: 0.86,
              letterSpacing: -6,
              color: "#1a1917",
              textTransform: "uppercase",
            }}
          >
            Aquí
          </div>
          <div
            style={{
              fontSize: 175,
              fontWeight: 900,
              lineHeight: 0.86,
              letterSpacing: -6,
              color: "#1a1917",
              textTransform: "uppercase",
            }}
          >
            pasan cosas
          </div>
        </div>

        {/* Subtítulo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: "#1a1917",
              maxWidth: 800,
              lineHeight: 1.3,
            }}
          >
            Team buildings flexibles y adaptados para empresas. Diversión con
            propósito.
          </div>
          {/* dado */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 28,
              background: "#f6a602",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 20px 40px rgba(90,62,43,0.35)",
            }}
          >
            {/* Cara de dado "5" — filas flex (Satori no soporta grid) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: 80,
                height: 80,
              }}
            >
              {[
                [1, 0, 1],
                [0, 1, 0],
                [1, 0, 1],
              ].map((row, r) => (
                <div
                  key={r}
                  style={{ display: "flex", justifyContent: "space-between", width: "100%" }}
                >
                  {row.map((d, c) => (
                    <div
                      key={c}
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 16,
                        background: d ? "#1a1917" : "transparent",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
