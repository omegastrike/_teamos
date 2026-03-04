// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { Menu, X, Globe } from "lucide-react";

// export default function Navbar({ language, setLanguage }) {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <header
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
//         ${
//           scrolled
//             ? "backdrop-blur-xl bg-black/70 border-b border-gold/30"
//             : "bg-transparent"
//         }`}
//     >
//       <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

//         {/* LOGO */}
//         <Link href="/" className="flex items-center gap-3">
//           <Image
//             src="/logo.png"
//             alt="Omegastrike Logo"
//             width={36}
//             height={36}
//             priority
//           />
//           <span className="font-sequel tracking-wider text-lg">
//             OMEGASTRIKE
//           </span>
//         </Link>

//         {/* DESKTOP NAV */}
//         <div className="hidden md:flex items-center gap-8 text-sm">
//           <NavItem href="/apply" label="APPLY" pathname={pathname} />
//           <NavItem href="/partner" label="PARTNER" pathname={pathname} />
//           <NavItem href="/media" label="MEDIA KIT" pathname={pathname} />
//           <NavItem href="/contact" label="CONTACT" pathname={pathname} />
//           <NavItem href="/highlights" label="HIGHLIGHTS" pathname={pathname}/>
//           <NavItem href="/news" label="NEWS" pathname={pathname}/>
//           <NavItem href="/achievements" label="ACHIVS" pathname={pathname}/>
//           <NavItem href="/organization" label="ORG" pathname={pathname}/>

//           {/* LANGUAGE TOGGLE */}
//           <button
//             aria-label="Toggle language"
//             onClick={() => setLanguage(language === "en" ? "te" : "en")}
//             className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 hover:bg-gold/10 transition"
//           >
//             <Globe size={16} />
//             <span className="uppercase text-xs">{language}</span>
//           </button>
//         </div>

//         {/* MOBILE MENU BUTTON */}
//         <button
//           aria-label="Toggle menu"
//           onClick={() => setOpen(!open)}
//           className="md:hidden p-2 rounded-lg border border-gold/40"
//         >
//           {open ? <X size={20} /> : <Menu size={20} />}
//         </button>
//       </nav>

//       {/* MOBILE MENU */}
//       {open && (
//         <div className="md:hidden backdrop-blur-xl bg-black/80 border-t border-gold/30 px-6 py-6 space-y-4">
//           <MobileNavItem href="/apply" label="APPLY" setOpen={setOpen} />
//           <MobileNavItem href="/partner" label="PARTNER" setOpen={setOpen} />
//           <MobileNavItem href="/news" label="NEWS" setOpen={setOpen} />
//           <MobileNavItem href="/media" label="MEDIA" setOpen={setOpen} />
//           <MobileNavItem href="/contact" label="CONTACT" setOpen={setOpen} />
//           <MobileNavItem href="/highlights" label="HIGHLIGHTS" setOpen={setOpen} />
//           <MobileNavItem href="/achievements" label="ACHIVS" setOpen={setOpen} />
//           <MobileNavItem href="/organization" label="ORG" setOpen={setOpen} />

//           <button
//             onClick={() => {
//               setLanguage(language === "en" ? "te" : "en");
//               setOpen(false);
//             }}
//             className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-gold/40 hover:bg-gold/10 transition"
//           >
//             <Globe size={16} />
//             Switch Language
//           </button>
//         </div>
//       )}
//     </header>
//   );
// }

// /* DESKTOP LINK */
// function NavItem({ href, label, pathname }) {
//   const active = pathname === href;

//   return (
//     <Link
//       href={href}
//       className={`relative group transition ${
//         active ? "text-white" : "text-gray-300 hover:text-white"
//       }`}
//     >
//       {label}
//       <span
//         className={`absolute left-0 -bottom-1 h-[2px] bg-gold transition-all
//           ${active ? "w-full" : "w-0 group-hover:w-full"}`}
//       />
//     </Link>
//   );
// }

// /* MOBILE LINK */
// function MobileNavItem({ href, label, setOpen }) {
//   return (
//     <Link
//       href={href}
//       onClick={() => setOpen(false)}
//       className="block text-center text-lg font-medium hover:text-gold transition"
//     >
//       {label}
//     </Link>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";

export default function Navbar({ language, setLanguage }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-black/70 border-b border-gold/30"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Omegastrike Logo"
              width={36}
              height={36}
              priority
            />
            <span className="font-sequel tracking-wider text-lg">
              OMEGASTRIKE
            </span>
          </Link>

          {/* DESKTOP + TABLET NAV */}
          <div className="hidden md:flex items-center gap-6 text-sm">

            <NavItem href="/news" label="News" pathname={pathname} />
            <NavItem href="/highlights" label="Highlights" pathname={pathname} />
            <NavItem href="/achievements" label="Results" pathname={pathname} />

            <NavItem href="/organization" label="Organization" pathname={pathname} />
            <NavItem href="/media" label="Media Kit" pathname={pathname} />

            <NavItem href="/apply" label="Join Team" pathname={pathname} />

            {/* LANGUAGE */}
            <button
              aria-label="Toggle language"
              onClick={() => setLanguage(language === "en" ? "te" : "en")}
              className="flex items-center gap-2 px-3 py-2 rounded-full border border-gold/40 hover:bg-gold/10 transition"
            >
              <Globe size={16} />
              <span className="uppercase text-xs">{language}</span>
            </button>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(true)}
            className="md:hidden p-2 rounded-lg border border-gold/40"
          >
            <Menu size={20} />
          </button>
        </nav>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/80 backdrop-blur-sm">

          {/* SIDE PANEL */}
          <div className="absolute right-0 top-0 h-full w-[260px] bg-black border-l border-gold/30 p-6">

            {/* CLOSE BUTTON */}
            <div className="flex justify-end mb-8">
              <button onClick={() => setOpen(false)}>
                <X size={24} />
              </button>
            </div>

            {/* MENU LINKS */}
            <div className="flex flex-col gap-6 text-lg">

              <MobileNavItem href="/" label="Home" setOpen={setOpen} />
              <MobileNavItem href="/news" label="News" setOpen={setOpen} />
              <MobileNavItem href="/highlights" label="Highlights" setOpen={setOpen} />
              <MobileNavItem href="/achievements" label="Results" setOpen={setOpen} />
              <MobileNavItem href="/organization" label="Organization" setOpen={setOpen} />
              <MobileNavItem href="/media" label="Media Kit" setOpen={setOpen} />
              <MobileNavItem href="/apply" label="Join Team" setOpen={setOpen} />

            </div>

            {/* LANGUAGE */}
            <div className="mt-10">
              <button
                onClick={() => {
                  setLanguage(language === "en" ? "te" : "en");
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-3 border border-gold/30 rounded-full hover:bg-gold/10 transition"
              >
                <Globe size={16} />
                Switch Language
              </button>
            </div>

          </div>

        </div>
      )}
    </>
  );
}

/* DESKTOP NAV ITEM */
function NavItem({ href, label, pathname }) {
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`relative group transition ${
        active ? "text-white" : "text-gray-300 hover:text-white"
      }`}
    >
      {label}
      <span
        className={`absolute left-0 -bottom-1 h-[2px] bg-gold transition-all ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}

/* MOBILE NAV ITEM */
function MobileNavItem({ href, label, setOpen }) {
  return (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className="text-gray-300 hover:text-gold transition"
    >
      {label}
    </Link>
  );
}



