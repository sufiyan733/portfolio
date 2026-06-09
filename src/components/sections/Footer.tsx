"use client";

export default function Footer() {
  return (
    <footer className="relative py-8 md:py-12 bg-bg overflow-hidden group border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-space text-xs tracking-widest text-white/50 uppercase">
          SAIF &copy; 2025
        </div>
        <div className="font-space text-xs tracking-widest text-white/50 uppercase">
          BUILT WITH OBSESSION
        </div>
      </div>
      
      {/* Red line hover effect */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] will-change-transform" />
    </footer>
  );
}
