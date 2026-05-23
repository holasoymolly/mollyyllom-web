'use client';

import Image from 'next/image';
import { DeviconPlainLinkedin } from '@/icons/DeviconPlainLinkedin';
import { IcOutlineTiktok } from '@/icons/IcOutlineTiktok';
import { IcRoundFacebook } from '@/icons/IcRoundFacebook';
import { RiBehanceFill } from '@/icons/RiBehanceFill';
import { RiInstagramLine } from '@/icons/RiInstagramLine';
import { XIcon } from '@/icons/XIcon';
import { TransitionLink } from '@/components/TransitionLink';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const navLinks: Array<{ href: string; label: string; external?: boolean; iconSrc?: string }> = [
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

  return (
    <footer className="w-full bg-indigo-950">
      {/* Main grid */}
      <div className="px-6 md:px-16 lg:px-24 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Logo + tagline */}
        <div className="flex flex-col gap-5">
          <TransitionLink href="/" className="inline-block w-fit">
            <Image
              src="/img/logo/molly-yllom-stacked.png"
              alt="Molly Yllom"
              width={2523}
              height={2925}
              sizes="55px"
              className="h-16 w-auto object-contain opacity-90"
              draggable={false}
            />
          </TransitionLink>
          <p className="text-violet-400 text-sm leading-relaxed max-w-[220px]">
            {t.footer.tagline}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          <span className="text-violet-400 text-xs font-bold tracking-[0.2em] uppercase mb-1">
            {t.footer.pages}
          </span>
          {navLinks.map(({ href, label, external, iconSrc }) => (
            <TransitionLink
              key={href}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              aria-label={iconSrc ? label : undefined}
              className={`text-sm font-medium transition-all duration-200 w-fit ${
                iconSrc
                  ? 'flex items-center hover:opacity-70'
                  : 'text-stone-300 hover:text-violet-400'
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
                label
              )}
            </TransitionLink>
          ))}
        </nav>

        {/* Social + Newsletter */}
        <div className="flex flex-col gap-8">
          <div>
            <span className="text-violet-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
              {t.footer.follow}
            </span>
            <div className="flex gap-4 items-center">
              <a href="https://www.instagram.com/holasoymolly" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-violet-400 transition-colors duration-200">
                <RiInstagramLine className="w-5 h-5" />
              </a>
              <a href="https://www.behance.net/holasoymolly" aria-label="Behance" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-violet-400 transition-colors duration-200">
                <RiBehanceFill className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/holasoymolly" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-violet-400 transition-colors duration-200">
                <IcRoundFacebook className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@soymollyyllom" aria-label="TikTok" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-violet-400 transition-colors duration-200">
                <IcOutlineTiktok className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/mollyyllom" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-violet-400 transition-colors duration-200">
                <DeviconPlainLinkedin className="w-5 h-5" />
              </a>
              <a href="https://x.com/holasoymolly" aria-label="X" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-violet-400 transition-colors duration-200">
                <XIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="https://forms.gle/dh6ZN4NztWXkp1jE8"
              target="_blank"
              rel="noreferrer noopener"
              className="w-fit bg-stone-200/10 border border-stone-200/15 text-stone-300 font-semibold px-6 py-3 rounded-full text-sm transition-all duration-300 hover:bg-violet-500 hover:border-violet-500 hover:text-stone-200 whitespace-nowrap"
            >
              {t.footer.newsletter}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-200/10 px-6 md:px-16 lg:px-24 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-slate-500 text-xs">
          © {new Date().getFullYear()} Molly Yllom. {t.footer.rights}
        </span>
        <span className="text-slate-500 text-xs">
          {t.footer.madeWith}
        </span>
      </div>
    </footer>
  );
};
