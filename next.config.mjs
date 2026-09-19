/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // @react-pdf/renderer (PDF export, lib/pdf/reportPdf.tsx) must run from node_modules
    // instead of being bundled, and the font files it reads at runtime have to be shipped
    // with that route's serverless function.
    serverComponentsExternalPackages: ["@react-pdf/renderer"],
    outputFileTracingIncludes: {
      "/api/report-pdf": [
        "./node_modules/@expo-google-fonts/noto-sans-kr/400Regular/NotoSansKR_400Regular.ttf",
        "./node_modules/@expo-google-fonts/noto-sans-kr/700Bold/NotoSansKR_700Bold.ttf",
        "./node_modules/@expo-google-fonts/manrope/400Regular/Manrope_400Regular.ttf",
        "./node_modules/@expo-google-fonts/manrope/600SemiBold/Manrope_600SemiBold.ttf",
        "./node_modules/@expo-google-fonts/cormorant-garamond/500Medium/CormorantGaramond_500Medium.ttf",
      ],
    },
  },
};

export default nextConfig;
