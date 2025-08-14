import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Native American color palette
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        pink: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        red: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        earth: {
          100: "#f5f5dc",
          200: "#deb887",
          300: "#d2691e",
          400: "#cd853f",
          500: "#a0522d",
          600: "#8b4513",
          700: "#654321",
          800: "#4a4a4a",
          900: "#2f2f2f",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%, 100%": { textShadow: "0 0 10px rgba(236, 72, 153, 0.5)" },
          "50%": { textShadow: "0 0 20px rgba(236, 72, 153, 0.8)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
      },
      backgroundImage: {
        "native-pattern": `
          radial-gradient(circle at 25% 25%, #8B4513 2px, transparent 2px),
          radial-gradient(circle at 75% 75%, #D2691E 1px, transparent 1px),
          linear-gradient(45deg, transparent 48%, #8B4513 49%, #8B4513 51%, transparent 52%)
        `,
      },
      backgroundSize: {
        "native-pattern": "60px 60px, 40px 40px, 80px 80px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  safelist: [
    // Ensure all Native American colors are included
    "text-amber-600",
    "text-amber-700",
    "text-amber-900",
    "bg-amber-600",
    "bg-amber-700",
    "bg-amber-900",
    "border-amber-600",
    "border-amber-700",
    "text-pink-500",
    "text-pink-600",
    "bg-pink-500",
    "bg-pink-600",
    "text-red-600",
    "bg-red-600",
    // Gradient classes
    "bg-gradient-to-r",
    "bg-gradient-to-b",
    "bg-gradient-to-br",
    "from-amber-900",
    "to-amber-700",
    "from-pink-500",
    "to-pink-600",
    // Opacity classes
    "opacity-5",
    "opacity-10",
    "opacity-15",
    "opacity-20",
    "opacity-25",
    // Animation classes
    "animate-float",
    "animate-glow",
  ],
} satisfies Config;

export default config;
