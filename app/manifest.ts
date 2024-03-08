import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Veridibloc Plant App",
    short_name: "Veridibloc",
    description: "Next generation of true Recycling and Circular Economy",
    start_url: "/",
    display: "fullscreen",
    orientation: "portrait",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
