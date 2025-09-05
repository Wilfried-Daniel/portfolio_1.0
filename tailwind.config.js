// tailwind.config.js
module.exports = {
  darkMode: "class", // Active le dark mode basé sur une classe
  content: ["./pages/**/*.html", "./assets/js/**/*.js"], //selectionne tous les fichiers html et js depuis la racine
  theme: {
    extend: {
      // les polices
      fontFamily: {
        montserrat: ["Montserrat"],
        merienda: ["Merienda"],
      },
    },
  },
  plugins: [],
};