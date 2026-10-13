// The fonts react-pdf reads at runtime (lib/pdf/reportPdf.tsx) plus the files pdfkit loads through
// its package "imports" (`#standard-fonts/*`, AFM data). Next's file tracing cannot see either, so
// without them the function answered 500 on Vercel while the same request rendered locally
// (/api/report-pdf/diag, 2026-10-13: "Cannot find module .../pdfkit/js/standard-fonts/Helvetica.cjs").
const PDF_FILES = [
  "./node_modules/@expo-google-fonts/noto-sans-kr/400Regular/NotoSansKR_400Regular.ttf",
  "./node_modules/@expo-google-fonts/noto-sans-kr/700Bold/NotoSansKR_700Bold.ttf",
  "./node_modules/@expo-google-fonts/plus-jakarta-sans/400Regular/PlusJakartaSans_400Regular.ttf",
  "./node_modules/@expo-google-fonts/plus-jakarta-sans/600SemiBold/PlusJakartaSans_600SemiBold.ttf",
  "./node_modules/@expo-google-fonts/newsreader/500Medium/Newsreader_500Medium.ttf",
  "./node_modules/pdfkit/package.json",
  "./node_modules/pdfkit/js/standard-fonts/**/*",
  "./node_modules/pdfkit/js/data/**/*",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // @react-pdf/renderer (PDF export, lib/pdf/reportPdf.tsx) must run from node_modules
    // instead of being bundled, and the files it reads at runtime have to be shipped
    // with that route's serverless function.
    serverComponentsExternalPackages: ["@react-pdf/renderer"],
    outputFileTracingIncludes: {
      // "/api/report-pdf/diag" is the temporary 2026-10-13 diagnostic route (same renderer, same files).
      "/api/report-pdf/diag": PDF_FILES,
      "/api/report-pdf": PDF_FILES,
    },
  },
};

export default nextConfig;
