// theme.config.jsx
export default {
  // ... your other config
  nextThemes: {
    defaultTheme: "light",
    forcedTheme: "light",
  },
  darkMode: false, // This hides the button, but forcedTheme is what stops the system preference
};
