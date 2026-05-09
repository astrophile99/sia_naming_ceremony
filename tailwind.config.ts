import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary pinks
        blush: {
          50: "#fff0f3",
          100: "#ffe4ea",
          200: "#ffc0cc",
          300: "#ff8fa3",
          400: "#ff5274",
          500: "#ff1f4b",
          600: "#f00035",
          700: "#c8002d",
          800: "#a8002a",
          900: "#8c0429",
        },
        rose: {
          pale: "#fce4ec",
          soft: "#f8bbd0",
          blush: "#f48fb1",
          mid: "#f06292",
          deep: "#e91e63",
        },
        // Secondary greens
        sage: {
          50: "#f0faf4",
          100: "#dcf5e5",
          200: "#bbeacc",
          300: "#8dd9a9",
          400: "#59c280",
          500: "#35a85e",
          600: "#268b4c",
          700: "#206f3d",
          800: "#1e5833",
          900: "#1a492b",
        },
        mint: {
          pale: "#e8f5e9",
          soft: "#c8e6c9",
          light: "#a5d6a7",
          mid: "#66bb6a",
        },
        // Accent gold
        gold: {
          pale: "#fff8e1",
          soft: "#ffecb3",
          light: "#ffe082",
          mid: "#ffd54f",
          warm: "#ffca28",
          rich: "#ffc107",
        },
        ivory: "#faf7f0",
        cream: "#fdf6e3",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        script: ["var(--font-dancing)", "cursive"],
        body: ["var(--font-nunito)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "dream-gradient":
          "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 25%, #e8f5e9 50%, #fce4ec 75%, #fff8e1 100%)",
        "hero-gradient":
          "radial-gradient(ellipse at 20% 50%, rgba(252,228,236,0.9) 0%, rgba(248,187,208,0.7) 30%, rgba(232,245,233,0.6) 60%, rgba(255,248,225,0.8) 100%)",
        "card-glass":
          "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%)",
        "petal-gradient":
          "radial-gradient(circle at center, rgba(255,182,193,0.8) 0%, rgba(255,182,193,0) 70%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out infinite 2s",
        "float-slow": "float 8s ease-in-out infinite 1s",
        "spin-slow": "spin 20s linear infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "petal-fall": "petalFall 8s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        twinkle: "twinkle 2s ease-in-out infinite",
        "heart-beat": "heartBeat 1.5s ease-in-out infinite",
        sway: "sway 4s ease-in-out infinite",
        "butterfly-fly": "butterflyFly 12s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-20px) rotate(3deg)" },
          "66%": { transform: "translateY(-10px) rotate(-2deg)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.7", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        petalFall: {
          "0%": { transform: "translateY(-100px) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "0.8" },
          "100%": {
            transform: "translateY(100vh) rotate(360deg)",
            opacity: "0",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glowPulse: {
          "0%, 100%": {
            boxShadow:
              "0 0 20px rgba(244,143,177,0.3), 0 0 40px rgba(244,143,177,0.1)",
          },
          "50%": {
            boxShadow:
              "0 0 40px rgba(244,143,177,0.6), 0 0 80px rgba(244,143,177,0.3)",
          },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        heartBeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.3)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.3)" },
          "70%": { transform: "scale(1)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
        butterflyFly: {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(100px, -80px) rotate(15deg)" },
          "50%": { transform: "translate(200px, 20px) rotate(-10deg)" },
          "75%": { transform: "translate(100px, 60px) rotate(5deg)" },
          "100%": { transform: "translate(0, 0) rotate(0deg)" },
        },
      },
      boxShadow: {
        glass: "0 8px 32px rgba(244, 143, 177, 0.15)",
        "glass-lg": "0 16px 64px rgba(244, 143, 177, 0.2)",
        "glow-pink":
          "0 0 20px rgba(244,143,177,0.4), 0 0 40px rgba(244,143,177,0.2)",
        "glow-gold":
          "0 0 20px rgba(255,202,40,0.4), 0 0 40px rgba(255,202,40,0.2)",
        dream: "0 20px 60px rgba(233,30,99,0.15), 0 5px 20px rgba(0,0,0,0.05)",
        petal: "0 4px 15px rgba(244,143,177,0.3)",
      },
      backdropBlur: {
        xs: "2px",
        "4xl": "72px",
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};

export default config;
