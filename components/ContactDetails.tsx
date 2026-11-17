import InfoCard from "./InfoCard";
import SocialLinks from "./SocialLinks";
import InquiryForm from "./InquiryForm";
import { MapPin, Phone, WhatsApp, Instagram, ArrowRight } from "./icons";
import { SITE, waLink } from "@/lib/site";

/** Office address + phone/WhatsApp + social cards and the enquiry form. */
export default function ContactDetails() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <InfoCard icon={MapPin} title="Office Address">
          <p>{SITE.address}</p>
          <a
            href={SITE.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
          >
            View on Google Maps
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </InfoCard>

        <InfoCard icon={Phone} title="Phone / WhatsApp">
          <a href={SITE.phoneHref} className="block font-bold text-charcoal hover:text-brand">
            {SITE.phoneDisplay}
          </a>
          <a
            href={waLink("Hello Shree Rudra Developers! Mujhe jaankari chahiye.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
          >
            <WhatsApp className="h-3.5 w-3.5" />
            WhatsApp par message karein
          </a>
        </InfoCard>

        <InfoCard icon={Instagram} title="Social Media" className="sm:col-span-2">
          <SocialLinks />
        </InfoCard>
      </div>

      <div className="mt-6">
        <InquiryForm />
      </div>
    </>
  );
}
