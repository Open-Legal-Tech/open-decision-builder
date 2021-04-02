const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.tsx", "./src/**/*.ts"],
  theme: {
    colors: {
      primary: colors.emerald,
      secondary: colors.amber,
      gray: colors.warmGray,
      green: colors.emerald,
      red: colors.rose,
      blue: colors.indigo,
      yellow: colors.amber,
      white: colors.white,
      indigo: colors.indigo,
      purple: colors.purple,
      pink: colors.pink,
    },
    extend: {
      minWidth: { "1/4": "25%", "1/2": "50%", "3/4": "75%" },
    },
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"],
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".clickable:active": {
          transform: "translateY(2px)",
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};
