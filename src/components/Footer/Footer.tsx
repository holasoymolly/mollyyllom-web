'use client';

import Image from 'next/image';
import { DeviconPlainLinkedin } from '@/icons/DeviconPlainLinkedin';
import { IcOutlineTiktok } from '@/icons/IcOutlineTiktok';
import { RiInstagramLine } from '@/icons/RiInstagramLine';
import { XIcon } from '@/icons/XIcon';
import { TransitionLink } from '@/components/TransitionLink';
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { trackNewsletterSignupSubmitted } from '@/lib/analytics';
import { KIT_NEWSLETTER_FORM_ID, kitFormAction } from '@/lib/kit';

export const Footer: React.FC = () => {
  const { lang, t } = useLanguage();
  const [subscribed, setSubscribed] = useState(false);

  const navLinks: Array<{ href: string; label: string; external?: boolean; iconSrc?: string }> = [
    { href: '/conoceme', label: t.nav.conoceme },
    { href: '/proyectos', label: t.nav.proyectos },
    { href: '/blog', label: t.nav.blog },
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
            <span className="text-violet-400 text-xs font-bold tracking-[0.2em] uppercase block">
              {t.footer.newsletter}
            </span>
            {subscribed ? (
              <p className="text-stone-300 text-sm max-w-xs">{t.footer.newsletterThanks}</p>
            ) : (
              <form
                action={kitFormAction(KIT_NEWSLETTER_FORM_ID)}
                method="post"
                target="kit-newsletter-frame"
                onSubmit={() => {
                  trackNewsletterSignupSubmitted('footer', lang);
                  setSubscribed(true);
                }}
                className="flex flex-col sm:flex-row gap-2 max-w-sm"
              >
                <label htmlFor="footer-newsletter-email" className="sr-only">{t.footer.newsletter}</label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  name="email_address"
                  required
                  autoComplete="email"
                  placeholder={t.footer.newsletterPlaceholder}
                  className="flex-1 min-w-0 bg-stone-200/10 border border-stone-200/15 rounded-full px-5 py-3 text-sm text-stone-200 placeholder:text-stone-400 focus:outline-none focus:border-violet-400"
                />
                <button
                  type="submit"
                  className="bg-violet-500 text-stone-200 font-semibold px-6 py-3 rounded-full text-sm transition-all duration-300 hover:bg-violet-400 whitespace-nowrap"
                >
                  {t.footer.newsletterButton}
                </button>
              </form>
            )}
            {/* Kit answers the post with its own page; it lands here, out of sight. */}
            <iframe name="kit-newsletter-frame" title="" aria-hidden="true" tabIndex={-1} className="hidden" />
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
