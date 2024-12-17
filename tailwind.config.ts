import type { Config } from "tailwindcss";

import flowbite from "flowbite/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/entities/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/flowbite/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins'],
        pingfang: ['Pingfang hk']
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#0C0D0E",
        secondary: "#89C4FF",
      },
    },
  },

  plugins: [
    flowbite,
  ],
};
export default config;
