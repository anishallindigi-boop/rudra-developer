export const SITE = {
  name: "Shree Rudra Developers",
  tagline: "Crafting Spaces. Creating Futures.",
  phoneDisplay: "+91 99960 47701",
  phoneHref: "tel:+919996047701",
  whatsappNumber: "919996047701",
  address: "HUDA Sector 19, HUDA, Kaithal, Haryana 136027",
  instagram: "https://www.instagram.com/shree.rudradevelopers/",
  facebook: "https://www.facebook.com/shreerudradevelopers/",
  mapsLink:
    "https://www.google.com/maps/place/Shree+Rudra+Developers/@29.806263,76.419678,17z/data=!3m1!4b1!4m6!3m5!1s0x3911e100594d2a5f:0x145b02531957b23b!8m2!3d29.806263!4d76.419678!16s%2Fg%2F11w__mgtrh?entry=ttu&g_ep=EgoyMDI2MTExOC4xIKXMDSoASAFQAw%3D%3D",
  mapsEmbed:
    "https://www.google.com/maps?q=Shree%20Rudra%20Developers%2C%20Haryana&output=embed",
} as const;

/** Build a WhatsApp chat link with a pre-filled message. */
export function waLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
