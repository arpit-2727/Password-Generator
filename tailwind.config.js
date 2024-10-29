module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'powder-blue': '#B0E0E6', // Powder Blue color added
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 1.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(99, 102, 241, 0.7)" },
          "50%": { boxShadow: "0 0 30px rgba(99, 102, 241, 1)" },
        },
      },
    },
  },
  plugins: [],
};
