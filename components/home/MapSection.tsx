import React from "react";

export default function MapSection() {
  return (
    <section className="py-16 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-[#B81D4D] text-xs font-bold uppercase tracking-wider mb-3">
            <span>🗺️ Master Plan Layout</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
            Bhagat Singh Colony Extension — Master Plan
          </h2>
          <p className="text-slate-600 text-sm">
            Showing exact plot dimensions, 25ft & 30ft street widths, and Hissar-Ambala Road connectivity.
          </p>
        </div>

        {/* Full Width Map Display Container */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-lg border border-slate-200">
          <div className="relative w-full h-[65vh] sm:h-[75vh] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
            <img
              src="/map.jpeg"
              alt="Bhagat Singh Colony Extension Master Plan"
              className="w-full h-full object-contain mx-auto"
            />
          </div>

          {/* Footer details under map */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 px-2">
            <span>📍 Location: Kaithal, Haryana (Near Chotu Ram Chowk / Hissar-Ambala Road)</span>
            <span className="font-semibold text-slate-700">100% Clear Titles & Ready to Build Plots</span>
          </div>
        </div>

      </div>
    </section>
  );
}