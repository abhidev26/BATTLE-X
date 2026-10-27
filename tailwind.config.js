/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // RED + BLACK PROTOCOL design system
        bz: {
          black: '#050505',
          dark: '#0a0a0a',
          darker: '#0d0d0d',
          surface: '#111111',
          surface2: '#161616',
          surface3: '#1a1a1a',
          border: '#1f1f1f',
          border2: '#2a2a2a',
          red: '#ff1a1a',
          'red-bright': '#ff3333',
          'red-dim': '#cc1414',
          'red-dark': '#1a0505',
          'red-muted': '#ff1a1a33',
          gray: '#888888',
          'gray-light': '#aaaaaa',
          'gray-dim': '#444444',
          white: '#f0f0f0',
          'white-dim': '#cccccc',
          gold: '#ffd700',
          'gold-dim': '#b8960c',
          cyan: '#00d4ff',
          green: '#00ff88',
          'green-dim': '#00cc6a',
          orange: '#ff8c00',
          purple: '#8b5cf6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Orbitron', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'red-gradient': 'linear-gradient(135deg, #ff1a1a, #cc1414)',
        'dark-gradient': 'linear-gradient(135deg, #0d0d0d, #050505)',
        'surface-gradient': 'linear-gradient(135deg, #1a1a1a, #111111)',
        'hero-gradient': 'radial-gradient(ellipse at center, #1a0505 0%, #050505 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,26,26,0.05), rgba(0,0,0,0))',
        'glow-red': 'radial-gradient(circle, rgba(255,26,26,0.3) 0%, transparent 70%)',
      },
      boxShadow: {
        'red-glow': '0 0 20px rgba(255, 26, 26, 0.4)',
        'red-glow-sm': '0 0 10px rgba(255, 26, 26, 0.3)',
        'red-glow-lg': '0 0 40px rgba(255, 26, 26, 0.5)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.6)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 26, 26, 0.1)',
        'inner-red': 'inset 0 1px 0 rgba(255, 26, 26, 0.1)',
        'glass': '0 4px 24px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-red': 'pulseRed 2s ease-in-out infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'glitch': 'glitch 0.3s ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'flicker': 'flicker 0.15s infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'border-glow': 'borderGlow 2s linear infinite',
        'particle': 'particle 8s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'progress-fill': 'progressFill 1.5s ease-out forwards',
      },
      keyframes: {
        pulseRed: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255, 26, 26, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 26, 26, 0.7)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '25%': { transform: 'translate(-2px, 1px)' },
          '75%': { transform: 'translate(2px, -1px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(255, 26, 26, 0.3)' },
          '50%': { borderColor: 'rgba(255, 26, 26, 0.8)' },
        },
        particle: {
          '0%': { transform: 'translateY(100vh) translateX(0) scale(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100px) translateX(30px) scale(1)', opacity: '0' },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
}
