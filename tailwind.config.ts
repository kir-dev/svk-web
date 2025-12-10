import { heroui, NextUIPluginConfig } from "@heroui/react"
import { Config } from 'tailwindcss/types/config'

const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: '#3dcab1',
        svk_blue: '#071c42'
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#f97316',
              foreground: '#000000',
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: '#ea580c',
              foreground: '#ffffff',
            },
          },
        },
      },
    } satisfies NextUIPluginConfig),
  ],
} satisfies Config

export default config
