/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0F172A', light: '#1E293B' },
        accent: { DEFAULT: '#6366F1', hover: '#4F46E5', light: '#EEF2FF' },
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        background: '#F8FAFC',
        surface: '#FFFFFF',
        'text-primary': '#0F172A',
        'text-secondary': '#64748B',
        'text-muted': '#94A3B8',
        border: { DEFAULT: '#E2E8F0', hover: '#CBD5E1' },
      },
      borderRadius: { button: '12px', card: '16px', input: '10px', modal: '20px' },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      fontSize: {
        display: ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
      },
      spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', '2xl': '48px', '3xl': '64px', '4xl': '96px' },
      container: { center: true, padding: '24px', screens: { xl: '1280px' } },
    },
  },
  plugins: [],
};
