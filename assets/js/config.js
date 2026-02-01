tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#10B981", // Emerald 500
                "primary-dark": "#059669", // Emerald 600
                "secondary": "#FBBF24", // Amber 400
                "accent": "#059669", // Emerald 600
                "emergency": "#ef4444", // Red (Keep for LifeLink logic)
                "emergency-dark": "#b91c1c",

                // Dark Mode & Backgrounds
                "background-light": "#F9FAFB", // Slate 50
                "background-alt": "#f0f9ff",
                "background-dark": "#0F172A", // Slate 900
                "surface-dark": "#1e293b", // Slate 800
                "surface-dark-alt": "#334155", // Slate 700
            },
            fontFamily: {
                "display": ["'Hind Siliguri'", "'Public Sans'", "sans-serif"],
                "body": ["'Hind Siliguri'", "'Manrope'", "sans-serif"]
            },
            backgroundImage: {
                "brand-gradient": "linear-gradient(135deg, #10B981 0%, #1ba6b8 50%, #254ea7 100%)", // The reference gradient
                "primary-gradient": "linear-gradient(135deg, #10B981 0%, #06b6d4 100%)",
                "emergency-gradient": "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
                "dark-gradient": "linear-gradient(to bottom, #0f172a, #1e293b)",
                "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))"
            },
            borderRadius: {
                "DEFAULT": "0.5rem",
                "lg": "0.5rem",
                "xl": "1rem",
                "2xl": "1.5rem",
                "3xl": "2rem",
                "card": "1.5rem", // Matching reference rounded-3xl approx
                "full": "9999px"
            },
            boxShadow: {
                "soft": "0 10px 40px -10px rgba(0,0,0,0.08)",
                "glow": "0 0 20px rgba(16, 185, 129, 0.4)",
                "glow-red": "0 0 20px rgba(239, 68, 68, 0.4)",
            },
            animation: {
                "fade-in": "fadeIn 0.6s ease-out forwards",
                "slide-up": "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "blob": "blob 7s infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" }
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(40px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" }
                },
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" }
                }
            }
        },
    },
}

// API Configuration for External Services
export const apiConfig = {
    gemini: {
        apiKey: "AIzaSyAgAbBqrtBUpBt-Tf4iNYeh7LjcDskefzg",
        baseUrl: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
    },
    googleMaps: {
        apiKey: "", // Placeholder for future use
        libraries: ["places", "geometry"]
    }
};
