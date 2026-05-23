'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AppDrawer } from "../AppDrawer";
import { TransitionLink } from "../TransitionLink";
import { useLanguage } from "@/context/LanguageContext";

type NavLink = {
  href: string;
  label: string;
  external?: boolean;
  iconSrc?: string;
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { lang, t, toggleLang } = useLanguage();

  const navLinks: NavLink[] = [
    { href: '/conoceme', label: t.nav.conoceme },
    { href: '/proyectos', label: t.nav.proyectos },
    { href: '/contacto', label: t.nav.contacto },
    { href: '/descargas', label: t.nav.descargas },
    {
      href: 'https://www.mollyverse.art/welcome',
      label: 'Mollyverse',
      external: true,
      iconSrc: '/img/logo/mollyverse-icon.png',
    },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled && !isMenuOpen ? 'bg-stone-200/90 backdrop-blur-md shadow-sm' : 'bg-stone-200'}`}>
      <div className="w-full flex items-center justify-between py-4 px-6 md:px-16 lg:px-24">

        {/* Logo — swap on hover only */}
        <TransitionLink href="/" className="flex-shrink-0 group relative block" style={{ width: 110, height: 71 }}>
          <Image
            src="/img/logo/molly-yllom-logo-homepage.webp"
            alt="Molly Yllom"
            width={110}
            height={71}
            priority
            draggable={false}
            className="absolute top-0 left-0 transition-opacity duration-300 group-hover:opacity-0"
          />
          <Image
            src="/img/logo/molly-yllom-logo-homepage-2.webp"
            alt="Molly Yllom"
            width={110}
            height={71}
            draggable={false}
            className="absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </TransitionLink>

        {/* Right side: hamburger (mobile) or nav + lang toggle (desktop) */}
        <div className="flex items-center gap-6">

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ href, label, external, iconSrc }) => {
              const isActive = !external && (pathname === href || (href !== '/' && pathname.startsWith(href)));
              return (
                <TransitionLink
                  key={href}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  aria-label={iconSrc ? label : undefined}
                  className={`relative text-sm font-semibold transition-colors duration-200 group pb-0.5 ${
                    iconSrc
                      ? 'flex items-center hover:opacity-70'
                      : isActive
                        ? 'text-violet-600'
                        : 'text-indigo-950 hover:text-violet-500'
                  }`}
                >
                  {iconSrc ? (
                    <Image
                      src={iconSrc}
                      alt={label}
                      width={1024}
                      height={1024}
                      sizes="24px"
                      className="h-6 w-6"
                      draggable={false}
                    />
                  ) : (
                    <>
                      {label}
                      <span className={`absolute -bottom-0.5 left-0 h-[2px] bg-violet-500 rounded-full transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`} />
                    </>
                  )}
                </TransitionLink>
              );
            })}
          </nav>

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            aria-label={t.nav.toggleLang}
            className="flex items-center gap-1 border border-indigo-950/20 rounded-full px-3 py-1 text-xs font-bold tracking-widest select-none hover:border-violet-500 transition-colors duration-200"
          >
            <span className={lang === 'es' ? 'text-violet-600' : 'text-indigo-950/35'}>ES</span>
            <span className="text-indigo-950/25">/</span>
            <span className={lang === 'en' ? 'text-violet-600' : 'text-indigo-950/35'}>EN</span>
          </button>

          {/* Hamburger — mobile only. p-2 -m-2 expands the hit area to ~40px
              without changing the visual size of the icon. */}
          <button
            className="lg:hidden p-2 -m-2 text-indigo-950 hover:text-violet-500 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="4" y="7.5" width="16" height="1.5" />
              <rect x="4" y="15" width="16" height="1.5" />
            </svg>
          </button>

        </div>
      </div>

      <AppDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};
