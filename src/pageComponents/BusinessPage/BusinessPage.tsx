'use client';

import { FC } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TransitionLink } from "@/components/TransitionLink";
import { ProtectedImage } from "@/components/ProtectedImage";
import { useLanguage } from "@/context/LanguageContext";
import { projectsBySlug } from "@/projects";
import { trackBookingCTAClicked, trackEmailCTAClicked } from "@/lib/analytics";

/**
 * The page cold outreach and the email signature point at. The home page
 * speaks to recruiters (availability block, resume), so a business owner
 * landing there read "looking for a job". This one speaks only to companies
 * commissioning brand and website work: no availability, no resume.
 */
const CASE_SLUGS = ["canteras-del-tropico", "bh-mobiliario", "alliance", "aerosol"];

const ease = [0.25, 0.1, 0.25, 1] as const;

const TwoLineHeading: FC<{ text: string; dark?: boolean }> = ({ text, dark }) => {
  const [first, ...rest] = text.split("\n");
  return (
    <h2 className={`text-4xl sm:text-5xl font-black leading-tight ${dark ? "text-stone-200" : "text-indigo-950"}`}>
      {first}
      <br />
      <span className={dark ? "text-violet-400" : "text-violet-500"}>{rest.join(" ")}</span>
    </h2>
  );
};

export const BusinessPage: FC = () => {
  const { lang, t } = useLanguage();
  const b = t.business;
  const cases = CASE_SLUGS.map((slug) => projectsBySlug[slug]).filter(Boolean);
  const [titleFirst, ...titleRest] = b.title.split("\n");
  const mailto = `mailto:hola@mollyyllom.com?subject=${encodeURIComponent(b.emailSubject)}`;

  return (
    <div>
      <Header />

      {/* Hero */}
      <section className="bg-indigo-950 text-stone-200 px-6 md:px-16 lg:px-24 pt-20 pb-24">
        <motion.p
          className="text-violet-400 text-xs font-bold tracking-[0.3em] uppercase mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {b.label}
        </motion.p>
        <motion.h1
          className="text-[clamp(2.5rem,12vw,3.75rem)] sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-tight"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          {titleFirst}
          <br />
          <span className="text-violet-400">{titleRest.join(" ")}</span>
        </motion.h1>
        <motion.p
          className="text-slate-300 text-lg leading-relaxed max-w-2xl mt-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          {b.intro}
        </motion.p>
        <motion.a
          href={mailto}
          onClick={() => trackEmailCTAClicked("empresas", lang)}
          className="inline-block mt-10 bg-violet-500 text-stone-200 font-bold px-8 py-4 rounded-full transition-colors duration-300 hover:bg-violet-400"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
        >
          {b.emailCta}
        </motion.a>
      </section>

      {/* What I do */}
      <section className="bg-stone-200 px-6 md:px-16 lg:px-24 py-20 md:py-28">
        <span className="text-violet-500 text-xs font-bold tracking-[0.3em] uppercase">{b.offerLabel}</span>
        <div className="mt-2 mb-12">
          <TwoLineHeading text={b.offerTitle} />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {b.offer.map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-black text-indigo-950 mb-3">{item.title}</h3>
              <p className="text-indigo-950/70 text-lg leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Work */}
      <section className="bg-stone-200 border-t border-indigo-950/10">
        <div className="px-6 md:px-16 lg:px-24 py-14">
          <span className="text-violet-500 text-xs font-bold tracking-[0.3em] uppercase">{b.casesLabel}</span>
          <div className="mt-2">
            <TwoLineHeading text={b.casesTitle} />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {cases.map((item) => (
            <TransitionLink
              key={item.slug}
              href={`/proyectos/${item.slug}`}
              className="relative overflow-hidden group"
            >
              <div className="relative overflow-hidden aspect-square">
                <ProtectedImage
                  src={item.portfolioImage}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  quality={90}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-gradient-to-t from-indigo-950/90 to-transparent">
                <p className="text-violet-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
                  {(lang === "en" ? item.gridLabelEn : item.gridLabel) ?? t.portfolio.brandingLabel}
                </p>
                <span className="text-stone-200 font-bold text-sm md:text-base leading-tight">{item.title}</span>
              </div>
            </TransitionLink>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-indigo-950 px-6 md:px-16 lg:px-24 py-20 md:py-28">
        <span className="text-violet-400 text-xs font-bold tracking-[0.3em] uppercase">{b.processLabel}</span>
        <div className="mt-2 mb-12">
          <TwoLineHeading text={b.processTitle} dark />
        </div>
        <ol className="grid gap-10 md:grid-cols-4">
          {b.process.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-3">
              <span className="text-violet-400 text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-stone-200 text-xl font-black">{step.title}</h3>
              <p className="text-slate-300 text-lg leading-relaxed">{step.description}</p>
            </li>
          ))}
        </ol>
        <p className="text-slate-400 text-lg leading-relaxed mt-14 max-w-2xl">{b.paymentNote}</p>
      </section>

      {/* Contact */}
      <section className="bg-stone-200 px-6 md:px-16 lg:px-24 py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="text-violet-500 text-xs font-bold tracking-[0.3em] uppercase">{b.ctaLabel}</span>
          <h2 className="text-4xl sm:text-5xl font-black text-indigo-950 leading-tight mt-2">{b.ctaTitle}</h2>
          <p className="text-indigo-950/70 text-lg leading-relaxed mt-6">{b.ctaBody}</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <a
              href={mailto}
              onClick={() => trackEmailCTAClicked("empresas", lang)}
              className="bg-indigo-950 text-stone-200 font-bold px-8 py-4 rounded-full text-center transition-colors duration-300 hover:bg-violet-500"
            >
              {b.emailCta}
            </a>
            <a
              href="https://calendly.com/hola-msny/30min"
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => trackBookingCTAClicked("empresas", lang)}
              className="border-2 border-indigo-950 text-indigo-950 font-bold px-8 py-4 rounded-full text-center transition-colors duration-300 hover:bg-indigo-950 hover:text-stone-200"
            >
              {b.callCta}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
