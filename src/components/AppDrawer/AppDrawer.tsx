'use client';

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/TransitionLink";
import { RiInstagramLine } from '@/icons/RiInstagramLine';
import { RiBehanceFill } from '@/icons/RiBehanceFill';
import { IcOutlineTiktok } from '@/icons/IcOutlineTiktok';
import { XIcon } from '@/icons/XIcon';
import { useLanguage } from "@/context/LanguageContext";

const socials = [
  { href: 'https://www.instagram.com/holasoymolly', Icon: RiInstagramLine, label: 'Instagram' },
  { href: 'https://www.behance.net/holasoymolly',   Icon: RiBehanceFill,   label: 'Behance'   },
  { href: 'https://www.tiktok.com/@soymollyyllom',  Icon: IcOutlineTiktok, label: 'TikTok'    },
  { href: 'https://x.com/holasoymolly',             Icon: XIcon,           label: 'X'         },
];

interface AppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const drawerEase: [number, number, number, number] = [0.32, 0.72, 0, 1];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const AppDrawer: React.FC<AppDrawerProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { lang, t, toggleLang } = useLanguage();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<Element | null>(null);

  const navLinks: Array<{ href: string; label: string; num: string; external?: boolean; iconSrc?: string }> = [
    { href: '/conoceme',  label: t.nav.conoceme,  num: '01' },
    { href: '/proyectos', label: t.nav.proyectos, num: '02' },
    { href: '/contacto',  label: t.nav.contacto,  num: '03' },
    { href: '/descargas', label: t.nav.descargas, num: '04' },
    {
      href: 'https://www.mollyverse.art/welcome',
      label: 'Mollyverse',
      num: '05',
      external: true,
      iconSrc: '/img/logo/mollyverse-icon.png',
    },
  ];

  // Lock body scroll + remember the trigger so focus can return to it on close.
  useEffect(() => {
    if (!isOpen) return;
    triggerRef.current = document.activeElement;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, [isOpen]);

  // Initial focus + Escape to close + Tab focus trap.
  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const container = drawerRef.current;
      if (!container) return;
      const focusables = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => !el.hasAttribute('inert') && el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // On close, restore focus to whatever opened the drawer (usually hamburger).
  useEffect(() => {
    if (isOpen) return;
    const trigger = triggerRef.current;
    if (trigger instanceof HTMLElement) {
      trigger.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.openMenu}
          className="fixed inset-0 bg-indigo-950 z-50 flex flex-col px-8 pt-6 pb-10 will-change-transform"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.32, ease: drawerEase }}
        >
          {/* Close + lang toggle */}
          <div className="flex items-center justify-between mb-10">
            <button
              onClick={toggleLang}
              aria-label={t.nav.toggleLang}
              className="text-xs font-bold tracking-widest select-none"
            >
              <span className={lang === 'es' ? 'text-violet-400' : 'text-stone-200/30'}>ES</span>
              <span className="text-stone-200/20 mx-1">/</span>
              <span className={lang === 'en' ? 'text-violet-400' : 'text-stone-200/30'}>EN</span>
            </button>

            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label={t.nav.closeMenu}
              className="text-slate-400 hover:text-stone-200 transition-colors duration-200"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Nav */}
          <nav className="flex flex-col flex-1">
            {navLinks.map(({ href, label, num, external, iconSrc }, i) => {
              const isActive = !external && (pathname === href || (href !== '/' && pathname.startsWith(href)));
              return (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.04, duration: 0.32, ease: drawerEase }}
                >
                  <TransitionLink
                    href={href}
                    onClick={onClose}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    aria-label={iconSrc ? label : undefined}
                    className={`flex items-center gap-5 py-5 border-b border-stone-200/10 group ${
                      isActive ? 'text-violet-400' : 'text-stone-200'
                    }`}
                  >
                    <span className="text-violet-500 text-xs font-bold tracking-widest w-6 shrink-0">
                      {num}
                    </span>
                    {iconSrc ? (
                      <Image
                        src={iconSrc}
                        alt={label}
                        width={1024}
                        height={1024}
                        sizes="44px"
                        className="h-11 w-11 transition-opacity duration-200 group-hover:opacity-80"
                        draggable={false}
                      />
                    ) : (
                      <span className="text-4xl font-black leading-none tracking-tight group-hover:text-violet-400 transition-colors duration-200">
                        {label}
                      </span>
                    )}
                  </TransitionLink>
                </motion.div>
              );
            })}
          </nav>

          {/* CTA + social */}
          <motion.div
            className="flex flex-col gap-6 pt-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.32, ease: drawerEase }}
          >
            <a
              href={t.quoteBanner.url}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-center bg-violet-500 text-stone-200 font-black px-8 py-4 rounded-full text-sm hover:bg-violet-400 transition-colors duration-300"
            >
              {t.home.cta}
            </a>

            <div className="flex gap-5 justify-center">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-slate-400 hover:text-violet-400 transition-colors duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
