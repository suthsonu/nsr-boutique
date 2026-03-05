/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#D81B60',
                primaryDark: '#B0104A',
                secondary: '#FFFFFF',
                accent: '#D4AF37',
                dark: '#1A1A1A',
                light: '#F8F8F8',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            }
        },
    },
    plugins: [],
}
