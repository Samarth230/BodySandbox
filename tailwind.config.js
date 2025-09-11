module.exports = {
  content: ["./pages/*.{html,js}", "./index.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ebf8ff", // blue-50
          100: "#dbeafe", // blue-100
          200: "#bfdbfe", // blue-200
          300: "#93c5fd", // blue-300
          400: "#60a5fa", // blue-400
          500: "#3498db", // blue-500
          600: "#2563eb", // blue-600
          700: "#1d4ed8", // blue-700
          800: "#1e40af", // blue-800
          900: "#1e3a8a", // blue-900
          DEFAULT: "#3498db", // blue-500
        },
        secondary: {
          50: "#faf5ff", // purple-50
          100: "#f3e8ff", // purple-100
          200: "#e9d5ff", // purple-200
          300: "#d8b4fe", // purple-300
          400: "#c084fc", // purple-400
          500: "#a855f7", // purple-500
          600: "#8e44ad", // purple-600
          700: "#7c3aed", // purple-700
          800: "#6b21a8", // purple-800
          900: "#581c87", // purple-900
          DEFAULT: "#8e44ad", // purple-600
        },
        accent: {
          50: "#f0fdf4", // green-50
          100: "#dcfce7", // green-100
          200: "#bbf7d0", // green-200
          300: "#86efac", // green-300
          400: "#4ade80", // green-400
          500: "#2ecc71", // green-500
          600: "#16a34a", // green-600
          700: "#15803d", // green-700
          800: "#166534", // green-800
          900: "#14532d", // green-900
          DEFAULT: "#2ecc71", // green-500
        },
        background: "#f8fafc", // slate-50
        surface: "#ffffff", // white
        text: {
          primary: "#2c3e50", // slate-800
          secondary: "#7f8c8d", // slate-500
        },
        success: {
          50: "#f0fdf4", // green-50
          100: "#dcfce7", // green-100
          200: "#bbf7d0", // green-200
          500: "#27ae60", // green-600
          DEFAULT: "#27ae60", // green-600
        },
        warning: {
          50: "#fffbeb", // amber-50
          100: "#fef3c7", // amber-100
          200: "#fde68a", // amber-200
          500: "#f39c12", // amber-500
          DEFAULT: "#f39c12", // amber-500
        },
        error: {
          50: "#fef2f2", // red-50
          100: "#fee2e2", // red-100
          200: "#fecaca", // red-200
          500: "#e74c3c", // red-500
          DEFAULT: "#e74c3c", // red-500
        },
        border: {
          light: "#e5e7eb", // gray-200
          primary: "#bfdbfe", // blue-200
        },
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Source Sans Pro', 'sans-serif'],
        caption: ['Roboto', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        semibold: '600',
        bold: '700',
        medium: '500',
      },
      borderRadius: {
        'medical': '8px',
        'medical-sm': '4px',
      },
      backdropBlur: {
        'medical': '16px',
      },
      boxShadow: {
        'medical': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'medical-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'pulse-critical': 'medical-pulse 2s ease-in-out infinite',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'medical': 'ease-in-out',
        'data': 'ease-out',
      },
      scale: {
        '105': '1.05',
      },
      spacing: {
        'medical': 'clamp(1rem, 2.5vw, 2rem)',
        'medical-sm': 'clamp(0.5rem, 1.25vw, 1rem)',
      },
    },
  },
  plugins: [],
}