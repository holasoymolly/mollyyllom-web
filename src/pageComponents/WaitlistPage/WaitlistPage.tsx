'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { trackWaitlistSignupSubmitted } from "@/lib/analytics";
import { KIT_WAITLIST_FORM_ID, kitFormAction } from "@/lib/kit";

const ease = [0.25, 0.1, 0.25, 1] as const;

export const WaitlistPage: FC = () => {
  const { lang, t } = useLanguage();
  const w = t.waitlist;
  const ready = KIT_WAITLIST_FORM_ID !== '';

  // Kit redirects back here with ?lista=ok after a signup. Read it on the
  // client so the page itself stays static (useSearchParams would force a
  // Suspense boundary for no gain).
  const [status, setStatus] = useState<'form' | 'joined' | 'confirmed'>('form');
  useEffect(() => {
    const lista = new URLSearchParams(window.location.search).get('lista');
    if (lista === 'ok') setStatus('joined');
    if (lista === 'confirmada') setStatus('confirmed');
  }, []);

  return (
    <div>
      <Header />

      <section className="bg-indigo-950 text-stone-200 px-6 md:px-16 lg:px-24 pt-20 pb-24">
        <motion.p
          className="text-violet-400 text-xs font-bold tracking-[0.3em] uppercase mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {w.label}
        </motion.p>
        <motion.h1
          className="text-[clamp(2.5rem,12vw,3.75rem)] sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-tight max-w-5xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          {w.title}
        </motion.h1>
      </section>

      <section className="bg-stone-200 px-6 md:px-16 lg:px-24 py-20 md:py-28">
        <motion.div
          className="max-w-2xl flex flex-col gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          {status !== 'form' ? (
            <div className="flex flex-col gap-4">
              <h2 className="text-violet-500 text-3xl md:text-4xl font-black tracking-tight">
                {status === 'confirmed' ? w.confirmedTitle : w.thanksTitle}
              </h2>
              <p className="text-indigo-950/70 text-lg leading-relaxed">
                {status === 'confirmed' ? w.confirmedBody : w.thanksBody}
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                <p className="text-indigo-950 text-xl md:text-2xl font-semibold leading-snug">{w.intro}</p>
                <p className="text-indigo-950/70 text-lg leading-relaxed">{w.body}</p>
              </div>

              <form
                action={ready ? kitFormAction(KIT_WAITLIST_FORM_ID) : undefined}
                method="post"
                onSubmit={(e) => {
                  if (!ready) {
                    e.preventDefault();
                    return;
                  }
                  trackWaitlistSignupSubmitted('talleres', lang);
                }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <label htmlFor="waitlist-email" className="sr-only">{w.emailLabel}</label>
                <input
                  id="waitlist-email"
                  type="email"
                  name="email_address"
                  required
                  autoComplete="email"
                  placeholder={w.emailPlaceholder}
                  disabled={!ready}
                  className="flex-1 min-w-0 bg-white border border-indigo-950/15 rounded-full px-6 py-4 text-indigo-950 placeholder:text-indigo-950/40 focus:outline-none focus:border-violet-500 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={!ready}
                  className="bg-violet-500 text-stone-200 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-violet-400 disabled:opacity-60 disabled:hover:bg-violet-500 whitespace-nowrap"
                >
                  {ready ? w.button : w.soon}
                </button>
              </form>

              <p className="text-indigo-950/50 text-sm">{w.fineprint}</p>
            </>
          )}
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};
