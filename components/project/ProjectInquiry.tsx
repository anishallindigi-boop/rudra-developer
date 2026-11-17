import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import InquiryForm from "@/components/InquiryForm";
import type { ReactNode } from "react";

/** Project inquiry section: left heading + contact actions, right enquiry form. */
export default function ProjectInquiry({
  eyebrow,
  title,
  sub,
  defaultProject,
  children,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  defaultProject: string;
  children?: ReactNode;
}) {
  return (
    <section id="inquiry" className="bg-alabaster py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <SectionHeading align="left" eyebrow={eyebrow} title={title} sub={sub} />
              {children && <div className="mt-8 space-y-4">{children}</div>}
            </div>
          </Reveal>
          <Reveal delay={150}>
            <InquiryForm defaultProject={defaultProject} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
