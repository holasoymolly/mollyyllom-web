'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuoteBanner } from "@/components/QuoteBanner";
import { FC } from "react";
import { motion } from "framer-motion";
import { DeviconPlainLinkedin } from '@/icons/DeviconPlainLinkedin';
import { IcOutlineTiktok } from "@/icons/IcOutlineTiktok";
import { IcRoundFacebook } from "@/icons/IcRoundFacebook";
import { RiBehanceFill } from "@/icons/RiBehanceFill";
import { RiInstagramLine } from "@/icons/RiInstagramLine";
import { XIcon } from "@/icons/XIcon";
import { useLanguage } from "@/context/LanguageContext";
import { trackBookingCTAClicked, trackEmailCTAClicked } from "@/lib/analytics";

const socials = [
  { href: "https://www.instagram.com/holasoymolly", label: "Instagram", Icon: RiInstagramLine },
  { href: "https://www.behance.net/holasoymolly", label: "Behance", Icon: RiBehanceFill },
  { href: "https://www.facebook.com/holasoymolly", label: "Facebook", Icon: IcRoundFacebook },
  { href: "https://www.tiktok.com/@soymollyyllom", label: "TikTok", Icon: IcOutlineTiktok },
  { href: "https://www.linkedin.com/in/mollyyllom", label: "LinkedIn", Icon: DeviconPlainLinkedin },
  { href: "https://x.com/holasoymolly", label: "X", Icon: XIcon },
];

export const ContactPage: FC = () => {
  const { lang, t } = useLanguage();

  return (
    <div>
      <Header />

      {/* Hero */}
      <section className="bg-indigo-950 text-stone-200 px-6 md:px-16 lg:px-24 pt-20 pb-24">
        <motion.p
          className="text-violet-400 text-xs font-bold tracking-[0.3em] uppercase mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {t.contact.label}
        </motion.p>
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-tight"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {t.contact.title}
        </motion.h1>
      </section>

      {/* Contact content */}
      <section className="bg-stone-200 px-6 md:px-16 lg:px-24 py-20 md:py-28">
        <div className="max-w-3xl flex flex-col gap-14">

          {/* Email */}
          <motion.div
            className="flex flex-col gap-2 border-b border-indigo-950/10 pb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-violet-500 text-xs font-bold tracking-[0.25em] uppercase">
              {t.contact.emailLabel}
            </span>
            <a
              href="mailto:hola@mollyyllom.com"
              onClick={() => trackEmailCTAClicked('contacto', lang)}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-indigo-950 hover:text-violet-500 transition-colors duration-300 leading-none"
            >
              hola@mollyyllom.com
            </a>
          </motion.div>

          {/* Schedule a call */}
          <motion.div
            className="flex flex-col gap-2 border-b border-indigo-950/10 pb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-violet-500 text-xs font-bold tracking-[0.25em] uppercase">
              {t.contact.callLabel}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <p className="text-indigo-950/60 text-lg leading-snug max-w-sm">
                {t.contact.callDescription}
              </p>
              <a
                href="https://calendly.com/hola-msny/30min"
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackBookingCTAClicked('contacto', lang)}
                className="shrink-0 bg-indigo-950 text-stone-200 font-bold px-8 py-4 rounded-full transition-colors duration-300 hover:bg-violet-500 whitespace-nowrap"
              >
                {t.contact.callButton}
              </a>
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-violet-500 text-xs font-bold tracking-[0.25em] uppercase">
              {t.contact.socialsLabel}
            </span>
            <div className="flex flex-wrap gap-4">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-indigo-950/5 hover:bg-indigo-950 hover:text-stone-200 text-indigo-950 font-semibold text-sm px-5 py-3 rounded-full transition-all duration-300 group"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      <QuoteBanner />
      <Footer />
    </div>
  );
};
