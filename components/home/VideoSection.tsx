export default function VideoSection() {
  return (
    <section id="virtual-tour" className="border-t border-slate-200 bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
            Virtual Tour
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Experience Shree Rudra Developers
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Watch a quick tour of our townships — wide internal roads, boundary
            walls, green parks aur modern infrastructure.
          </p>
        </div>

        {/* Video Player */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-black shadow-2xl">
          <video
            className="aspect-video w-full object-cover"
            controls
            preload="metadata"
            playsInline
          >
            <source src="/video.mp4" type="video/mp4" />
            Aapka browser video tag support nahi karta.
          </video>
        </div>
      </div>
    </section>
  );
}
