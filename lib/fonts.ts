import { Inter, Sorts_Mill_Goudy, Outfit } from "next/font/google";

export const interFont = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
})

export const outfitFont = Outfit({
  variable: "--font-outfit",
  weight: "400",
  subsets: ["latin"],
})

export const sortsMillGoudyFont = Sorts_Mill_Goudy({
  variable: "--font-sorts-mill-goudy",
  weight: "400",
  subsets: ["latin"],
})
