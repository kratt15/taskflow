/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  plugins: [daisyui],
  // daisyui: {
  //   themes: ["light", "dark", "garden", "cupcake",    // Thème coloré (optionnel)
  //     "corporate","luxury","synthwave","valentine","halloween","garden","forest","aqua","lofi","pastel","fantasy","wireframe","black","luxury","dracula","cmyk","autumn","business","acid","lemonade","night","coffee","winter,retro"],
  // },
};
