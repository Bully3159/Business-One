import { defineConfig } from "vite";
export default defineConfig({
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (
          warning.code === "MODULE_LEVEL_DIRECTIVE" &&
          warning.message.includes("use client")
        )
          return;
        warn(warning);
      },
      output: {
        manualChunks(id) {
          if (id.includes("exceljs")) return "excel";
          if (id.includes("recharts") || id.includes("d3-")) return "charts";
        },
      },
    },
  },
});
