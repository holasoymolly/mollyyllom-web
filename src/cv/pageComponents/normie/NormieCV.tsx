'use client'

import { TransitionLink } from "@/components/TransitionLink"
import { motion } from "framer-motion"
import { ProtectedImage } from "@/components/ProtectedImage"
import { web2Resume } from "@/cv/data/resumeData/web2"
import { web2ResumeES } from "@/cv/data/resumeData/web2/index.es"
import { CVVersionToggle } from "@/cv/components/CVVersionToggle"
import { CVLangToggle } from "@/cv/components/CVLangToggle"
import { MdiLinkedin } from "@/cv/icons/MdiLinkedin"
import { MdiX } from "@/cv/icons/MdiX"

type Lang = 'en' | 'es'

const copy = {
  en: {
    kicker: 'Senior Brand & Product Designer',
    heroBio: 'Brand and Product Designer with 20+ years building scalable visual systems across agencies, freelance work, and Web3 products. Front-end capable with React, Next.js, and Tailwind.',
    experienceKicker: 'Professional Experience',
    experienceH2a: 'Building brands',
    experienceH2b: 'for 20+ years',
    current: 'Current',
    projectsKicker: 'Selected Projects',
    projectsH2a: 'Featured',
    projectsH2b: 'work',
    skillsKicker: 'Capabilities',
    skillsH2a: 'Design',
    skillsH2b: 'expertise',
    educationKicker: 'Education',
    educationH2a: 'Formally',
    educationH2b: 'trained.',
    ctaKicker: 'Contact',
    ctaH2a: "Let's work",
    ctaH2b: 'together',
  },
  es: {
    kicker: 'Diseñadora Sénior de Marca y Producto',
    heroBio: 'Diseñadora de Marca y Producto con más de 20 años construyendo sistemas visuales escalables en agencias, trabajo independiente y productos Web3. Capacidad frontend con React, Next.js y Tailwind.',
    experienceKicker: 'Experiencia Profesional',
    experienceH2a: 'Construyendo marcas',
    experienceH2b: 'por más de 20 años',
    current: 'Actual',
    projectsKicker: 'Proyectos Seleccionados',
    projectsH2a: 'Trabajo',
    projectsH2b: 'selecto',
    skillsKicker: 'Capacidades',
    skillsH2a: 'Experiencia',
    skillsH2b: 'en diseño',
    educationKicker: 'Formación',
    educationH2a: 'Formalmente',
    educationH2b: 'entrenada.',
    ctaKicker: 'Contacto',
    ctaH2a: 'Trabajemos',
    ctaH2b: 'juntos',
  },
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as const },
})

const fadeUpView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as const },
})

function SocialLinks({ links, dark = true }: { links: { label: string; href: string }[]; dark?: boolean }) {
  if (!links.length) return null
  const base = dark ? 'text-slate-400 hover:text-stone-200' : 'text-indigo-950/50 hover:text-indigo-950'
  return (
    <div className="flex items-center gap-3">
      {links.map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}
          className={`transition-colors duration-200 ${base}`}>
          {link.label === 'LinkedIn' && <MdiLinkedin className="w-5 h-5" />}
          {link.label === 'X' && <MdiX className="w-4 h-4" />}
        </a>
      ))}
    </div>
  )
}

export function NormieCV({ lang = 'en' }: { lang?: Lang }) {
  const resume = lang === 'es' ? web2ResumeES : web2Resume
  const { contact, skills, experience, contractWork, education } = resume
  const t = copy[lang]

  return (
    <div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-indigo-950 text-stone-200 px-6 md:px-16 lg:px-24 pt-8 pb-24 border-b border-stone-200/10">
        <div className="max-w-6xl mx-auto">

          {/* Back link */}
          <div className="mb-12">
            <TransitionLink href="/" className="text-slate-500 hover:text-slate-300 text-xs font-medium tracking-widest uppercase transition-colors duration-200">
              ← mollyyllom.com
            </TransitionLink>
          </div>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
            <div className="flex-1">
              <motion.p
                className="text-violet-400 text-xs font-bold tracking-[0.3em] uppercase mb-6"
                {...fadeUp(0)}
              >
                {t.kicker}
              </motion.p>
              <motion.h1
                className="text-6xl sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-tight mb-8"
                {...fadeUp(0.1)}
              >
                Molly<br />Yllom
              </motion.h1>
              <motion.p
                className="text-slate-300 text-lg leading-relaxed max-w-xl mb-3"
                {...fadeUp(0.2)}
              >
                {contact.location} &nbsp;·&nbsp; {lang === 'es' ? 'Español / Inglés' : 'Spanish / English'}
              </motion.p>
              <motion.div className="mb-6" {...fadeUp(0.22)}>
                <SocialLinks links={contact.links} dark />
              </motion.div>
              <motion.p
                className="text-slate-300 text-lg leading-relaxed max-w-xl mb-10"
                {...fadeUp(0.25)}
              >
                {t.heroBio}
              </motion.p>
              <motion.div className="flex flex-wrap items-center gap-3" {...fadeUp(0.35)}>
                <a
                  href={`mailto:${contact.email}`}
                  className="bg-violet-500 text-stone-200 font-bold px-8 py-4 rounded-full transition-colors duration-300 hover:bg-violet-400"
                >
                  {contact.email}
                </a>
                <CVVersionToggle />
                <CVLangToggle />
              </motion.div>
            </div>

            {/* Photo */}
            <motion.div
              className="shrink-0 mx-auto md:mx-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <ProtectedImage
                wrapperClassName="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-violet-500/50 shadow-[0_0_80px_rgba(139,92,246,0.3)]"
                src="/img/molly/molly_pfp.jpg"
                alt="Molly Yllom"
                fill
                sizes="(min-width: 768px) 320px, 256px"
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Experience ───────────────────────────────────────── */}
      <section className="bg-stone-200 px-6 md:px-16 lg:px-24 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.p className="text-violet-500 text-xs font-bold tracking-[0.3em] uppercase mb-4" {...fadeUpView()}>
            {t.experienceKicker}
          </motion.p>
          <motion.h2 className="text-4xl sm:text-5xl font-black text-indigo-950 leading-tight mb-16" {...fadeUpView(0.1)}>
            {t.experienceH2a}<br />
            <span className="text-violet-500">{t.experienceH2b}</span>
          </motion.h2>

          <div className="space-y-8">
            {experience.map((role, i) => (
              <motion.article
                key={`${role.company}-${role.start}`}
                className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8"
                {...fadeUpView(i * 0.05)}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <span className="text-violet-500 text-xs font-bold tracking-[0.2em] uppercase">
                        {role.company}
                      </span>
                      {role.current && (
                        <span className="bg-violet-100 text-violet-600 text-xs font-semibold px-3 py-0.5 rounded-full">
                          {t.current}
                        </span>
                      )}
                    </div>
                    <h3 className="text-indigo-950 text-xl font-black">{role.role}</h3>
                    <p className="text-indigo-950/50 text-sm mt-1">{role.start} – {role.end}</p>
                  </div>
                </div>

                {role.featureHighlight && (
                  <div className="bg-violet-50 border-l-4 border-violet-500 rounded-r-xl p-4 mb-4">
                    <p className="text-indigo-950/80 text-sm leading-relaxed">{role.featureHighlight}</p>
                  </div>
                )}

                <ul className="space-y-2 mb-5">
                  {role.highlights.map((h, j) => (
                    <li key={j} className="flex gap-3 text-sm text-indigo-950/70 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {role.stack && (
                  <div className="flex flex-wrap gap-2">
                    {role.stack.map((tech) => (
                      <span key={tech} className="bg-indigo-50 text-indigo-950/60 text-xs font-medium px-3 py-1 rounded-full border border-indigo-100">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Selected Projects ─────────────────────────────────── */}
      {contractWork && contractWork.length > 0 && (
        <section className="bg-indigo-950 text-stone-200 px-6 md:px-16 lg:px-24 py-20">
          <div className="max-w-4xl mx-auto">
            <motion.p className="text-violet-400 text-xs font-bold tracking-[0.3em] uppercase mb-4" {...fadeUpView()}>
              {t.projectsKicker}
            </motion.p>
            <motion.h2 className="text-4xl sm:text-5xl font-black leading-tight mb-16" {...fadeUpView(0.1)}>
              {t.projectsH2a}<br />
              <span className="text-violet-400">{t.projectsH2b}</span>
            </motion.h2>
            <div className="space-y-6">
              {contractWork.map((project, i) => (
                <motion.article
                  key={`${project.company}-${project.start}`}
                  className="border border-stone-200/10 rounded-2xl p-6 md:p-8 hover:border-violet-500/40 transition-colors duration-300"
                  {...fadeUpView(i * 0.07)}
                >
                  <div className="mb-4">
                    <span className="text-violet-400 text-xs font-bold tracking-[0.2em] uppercase">{project.company}</span>
                    <h3 className="text-stone-200 text-xl font-black mt-1">{project.role}</h3>
                    <p className="text-slate-400 text-sm mt-1">{project.start} – {project.end}</p>
                  </div>
                  {project.featureHighlight && (
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">{project.featureHighlight}</p>
                  )}
                  <ul className="space-y-2 mb-5">
                    {project.highlights.map((h, j) => (
                      <li key={j} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-500/60 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  {project.stack && (
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span key={tech} className="bg-stone-200/5 border border-stone-200/10 text-slate-400 text-xs px-3 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Skills ───────────────────────────────────────────── */}
      <section className="bg-stone-200 px-6 md:px-16 lg:px-24 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.p className="text-violet-500 text-xs font-bold tracking-[0.3em] uppercase mb-4" {...fadeUpView()}>
            {t.skillsKicker}
          </motion.p>
          <motion.h2 className="text-4xl sm:text-5xl font-black text-indigo-950 leading-tight mb-16" {...fadeUpView(0.1)}>
            {t.skillsH2a}<br />
            <span className="text-violet-500">{t.skillsH2b}</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((cat, i) => (
              <motion.div
                key={cat.title}
                className="bg-white rounded-2xl border border-stone-200 p-6"
                {...fadeUpView(i * 0.04)}
              >
                <h3 className="text-violet-500 text-xs font-bold tracking-[0.2em] uppercase mb-4">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span key={item} className="bg-indigo-50 text-indigo-950/70 text-xs px-3 py-1 rounded-full border border-indigo-100">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education ────────────────────────────────────────── */}
      <section className="bg-indigo-950 text-stone-200 px-6 md:px-16 lg:px-24 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.p className="text-violet-400 text-xs font-bold tracking-[0.3em] uppercase mb-4" {...fadeUpView()}>
            {t.educationKicker}
          </motion.p>
          <motion.h2 className="text-4xl sm:text-5xl font-black leading-tight mb-16" {...fadeUpView(0.1)}>
            {t.educationH2a}<br />
            <span className="text-violet-400">{t.educationH2b}</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((school, i) => (
              <motion.div
                key={school.institution}
                className="border border-stone-200/10 rounded-2xl p-6 hover:border-violet-500/30 transition-colors duration-300"
                {...fadeUpView(i * 0.1)}
              >
                <p className="text-violet-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">{school.start} – {school.end}</p>
                <h3 className="text-stone-200 text-xl font-black mb-1">{school.institution}</h3>
                <p className="text-slate-400 text-sm">{school.area}</p>
                <p className="text-slate-500 text-xs mt-1">{school.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-stone-200 px-6 md:px-16 lg:px-24 py-20">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <motion.div {...fadeUpView()}>
            <p className="text-violet-500 text-xs font-bold tracking-[0.3em] uppercase mb-3">{t.ctaKicker}</p>
            <h2 className="text-4xl sm:text-5xl font-black text-indigo-950 leading-tight">
              {t.ctaH2a}<br />
              <span className="text-violet-500">{t.ctaH2b}</span>
            </h2>
          </motion.div>
          <motion.div className="flex flex-col gap-4" {...fadeUpView(0.1)}>
            <a
              href={`mailto:${contact.email}`}
              className="bg-violet-500 text-stone-200 font-bold px-8 py-4 rounded-full text-center transition-colors duration-300 hover:bg-violet-400"
            >
              {contact.email}
            </a>
            <div className="flex justify-center gap-3">
              <CVVersionToggle variant="light" />
              <CVLangToggle variant="light" />
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
