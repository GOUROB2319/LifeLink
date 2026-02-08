/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./**/*.html",
        "./assets/js/**/*.js",
        "./dashboard/**/*.html",
        "./auth/**/*.html",
        "./info/**/*.html",
        "./onboarding/**/*.html"
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#E91E63',
                    dark: '#C2185B',
                    light: '#F48FB1',
                },
                secondary: {
                    DEFAULT: '#9C27B0',
                    dark: '#7B1FA2',
                },
                emergency: '#DC2626',
                surface: {
                    dark: '#1E293B',
                },
            },
            fontFamily: {
                sans: ['Inter', 'Hind Siliguri', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
