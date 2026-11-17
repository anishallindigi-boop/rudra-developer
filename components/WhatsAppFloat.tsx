import { WhatsApp } from "./icons";
import { waLink } from "../lib/site";

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink("Hello Shree Rudra Developers! Mujhe plots ke baare mein jaankari chahiye.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp par baat karein"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-0 rounded-full bg-[#25D366] p-4 text-white shadow-xl shadow-[#25D366]/40 transition-all duration-300 hover:gap-2 hover:pr-6"
    >
      <WhatsApp className="h-6 w-6" />
      <span className="max-w-0 overflow-hidden text-sm font-bold whitespace-nowrap transition-all duration-300 group-hover:max-w-40">
        WhatsApp Karein
      </span>
      <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
        <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-brand" />
      </span>
    </a>
  );
}
