import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ANCLA OSCURA — casi-negro con matiz teal (fondos oscuros + texto sobre claro)
        ink: "#06181E",
        "ink-deep": "#020E12", // el más oscuro (footer, overlays profundos)
        surface: "#0C2A33", // superficie oscura elevada (tarjetas sobre fondo oscuro)
        // PRINCIPAL — teal petróleo (superficie secundaria / acento medio)
        teal: "#005A6D",
        // ACENTO — cyan (puntual: CTAs, highlights, checks)
        blue: "#11BFCC",
        accent: "#11BFCC",
        white: "#FFFFFF",
        // Escala de grises (neutra, levemente fría)
        gray: {
          50: "#F2F5F5",
          100: "#E7ECEC",
          200: "#D6DDDE",
          300: "#BCC6C7",
          400: "#94A0A2",
          500: "#697678",
          600: "#48565A",
          700: "#2F3D41",
          800: "#1E2B2E",
        },
        // Alias claros
        paper: "#F2F5F5",
        "paper-pure": "#FFFFFF",
      },
      fontFamily: {
        display: ["var(--font-barnegat)", "Arial Narrow", "sans-serif"],
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        label: "0.16em",
      },
      maxWidth: {
        site: "1800px",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
