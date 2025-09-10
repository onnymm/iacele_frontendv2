const {heroui} = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [heroui()],
    safelist: [
        'text-primary-500',
        'text-success-500',
        'text-secondary-500',
        'text-warning-500',
        'text-danger-500',
        'border-primary-500',
        'border-success-500',
        'border-secondary-500',
        'border-warning-500',
        'border-danger-500',
        'bg-primary-500/10',
        'bg-success-500/10',
        'bg-secondary-500/10',
        'bg-warning-500/10',
        'bg-danger-500/10',
    ],
};
