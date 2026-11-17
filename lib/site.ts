export const SITE = {
  name: "Shree Rudra Developers",
  tagline: "Crafting Spaces. Creating Futures.",
  phoneDisplay: "+91 99960 47701",
  phoneHref: "tel:+919996047701",
  whatsappNumber: "919996047701",
  address: "HUDA Sector 19, HUDA, Kaithal, Haryana 136027",
  instagram: "https://www.instagram.com/shree.rudradevelopers/",
  facebook: "https://www.facebook.com/people/Shree-Rudra-Developers/",
  mapsLink:
    "https://www.google.com/maps?q=HUDA+Sector+19,+Kaithal,+Haryana+136027",
  mapsEmbed:
    "https://www.google.com/maps?q=HUDA%20Sector%2019%2C%20Kaithal%2C%20Haryana%20136027&output=embed",
} as const;

/** Build a WhatsApp chat link with a pre-filled message. */
export function waLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
