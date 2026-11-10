'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FC } from "react";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Privacy notice. Written by hand in each language (not translated), in plain
 * words, and kept short. When a tool that touches visitor data is added or
 * removed (forms, analytics, payments, booking), update both versions and the
 * date in the same commit.
 */
type Section = { title: string; body: string[] };
type Copy = { label: string; title: string; updated: string; intro: string; sections: Section[] };

const COPY: Record<'es' | 'en', Copy> = {
  es: {
    label: 'Privacidad',
    title: 'Qué hago con tus datos',
    updated: 'Última actualización: 10 de noviembre de 2026',
    intro:
      'Esta web es mía, Molly Yllom, y la manejo yo desde Santo Domingo, República Dominicana. Aquí te cuento qué datos recojo, para qué y con quién se comparten. Si tienes una pregunta, escríbeme a hola@mollyyllom.com.',
    sections: [
      {
        title: 'Tu correo',
        body: [
          'Si te apuntas al newsletter o a la lista de espera, guardo tu correo en Kit, la herramienta que uso para mandar correos. Antes de añadirte te pido que confirmes que el correo es tuyo.',
          'Solo lo uso para escribirte sobre lo que te apuntaste. No lo vendo ni se lo paso a nadie. Todos los correos traen un enlace para salirte, y te sales cuando quieras.',
        ],
      },
      {
        title: 'Si agendas una llamada o una mentoría',
        body: [
          'Las citas se agendan con Google Calendar. Ahí quedan tu nombre, tu correo y lo que me cuentes en el formulario, para poder preparar la sesión.',
          'Las mentorías se pagan en Payhip, que cobra a través de PayPal. Yo no veo ni guardo los datos de tu tarjeta.',
        ],
      },
      {
        title: 'Cómo mido las visitas',
        body: [
          'Uso Vercel Analytics, Google Analytics y Amplitude para saber qué páginas se visitan y qué botones se tocan. Con eso decido qué mejorar. Estas herramientas pueden usar cookies o identificadores del navegador. No las uso para mostrarte anuncios personalizados.',
        ],
      },
      {
        title: 'Formularios de Google',
        body: [
          'Algunas descargas y la solicitud de cotización todavía usan Google Forms. Lo que escribas ahí queda en mi cuenta de Google.',
        ],
      },
      {
        title: 'Tus derechos',
        body: [
          'Puedes pedirme en cualquier momento que te diga qué datos tengo tuyos, que los corrija o que los borre. Escríbeme a hola@mollyyllom.com y te respondo.',
        ],
      },
      {
        title: 'Cambios',
        body: ['Si cambio algo de esta página, actualizo la fecha de arriba.'],
      },
    ],
  },
  en: {
    label: 'Privacy',
    title: 'What I do with your data',
    updated: 'Last updated: November 10, 2026',
    intro:
      "This is my website, Molly Yllom, and I run it myself from Santo Domingo, Dominican Republic. Here's what data I collect, why, and who it's shared with. If you have a question, email me at hola@mollyyllom.com.",
    sections: [
      {
        title: 'Your email',
        body: [
          'If you join the newsletter or the waitlist, your email is stored in Kit, the tool I use to send emails. Before adding you, I ask you to confirm the address is yours.',
          "I only use it to write to you about what you signed up for. I don't sell it or hand it to anyone. Every email has a link to unsubscribe, and you can leave whenever you want.",
        ],
      },
      {
        title: 'If you book a call or a mentorship',
        body: [
          'Bookings go through Google Calendar. Your name, your email and whatever you tell me in the form are kept there so I can prepare for the session.',
          "Mentorships are paid on Payhip, which charges through PayPal. I never see or store your card details.",
        ],
      },
      {
        title: 'How I measure visits',
        body: [
          "I use Vercel Analytics, Google Analytics and Amplitude to see which pages people visit and which buttons they click. That's how I decide what to improve. These tools may use cookies or browser identifiers. I don't use them to show you personalized ads.",
        ],
      },
      {
        title: 'Google Forms',
        body: [
          'Some downloads and the quote request still use Google Forms. Whatever you write there is kept in my Google account.',
        ],
      },
      {
        title: 'Your rights',
        body: [
          'You can ask me at any time what data I have about you, or to correct or delete it. Email hola@mollyyllom.com and I will get back to you.',
        ],
      },
      {
        title: 'Changes',
        body: ['If I change anything on this page, I update the date at the top.'],
      },
    ],
  },
};

export const PrivacyPage: FC = () => {
  const { lang } = useLanguage();
  const c = COPY[lang];

  return (
    <div>
      <Header />

      <section className="bg-indigo-950 text-stone-200 px-6 md:px-16 lg:px-24 pt-20 pb-20">
        <p className="text-violet-400 text-xs font-bold tracking-[0.3em] uppercase mb-6">{c.label}</p>
        <h1 className="text-[clamp(2.25rem,10vw,3.5rem)] sm:text-6xl md:text-7xl font-black leading-[0.95] tracking-tight max-w-4xl">
          {c.title}
        </h1>
      </section>

      <section className="bg-stone-200 px-6 md:px-16 lg:px-24 py-16 md:py-24">
        <div className="max-w-2xl flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <p className="text-indigo-950/50 text-sm">{c.updated}</p>
            <p className="text-indigo-950 text-lg md:text-xl leading-relaxed">{c.intro}</p>
          </div>
          {c.sections.map((s) => (
            <div key={s.title} className="flex flex-col gap-3">
              <h2 className="text-violet-500 text-xl md:text-2xl font-black tracking-tight">{s.title}</h2>
              {s.body.map((p) => (
                <p key={p} className="text-indigo-950/70 text-lg leading-relaxed">{p}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};
