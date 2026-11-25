'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { translations, Language, Translations } from '@/i18n/translations';
import { langFromPathname, localizePath } from '@/i18n/routes';

interface LanguageContextType {
  lang: Language;
  t: Translations;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'es',
  t: translations.es,
  toggleLang: () => {},
});

/**
 * Language comes from the URL, not from state or storage.
 *
 * Metadata is resolved on the server, so the only way a page's title and OG
 * tags can describe what the reader actually sees is for the language to be
 * part of the address. That also makes a shared link keep its language, which
 * a stored preference could never do.
 *
 * `<html lang>` is not set here: /en and the Spanish routes have separate root
 * layouts (see RootDocument), so the server already sends the right one. A
 * consequence is that the toggle, which crosses root layouts, loads the other
 * page in full instead of a client-side transition.
 */
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname() ?? '/';
  const router = useRouter();
  const lang = langFromPathname(pathname);

  const toggleLang = () => {
    const target = localizePath(pathname, lang === 'es' ? 'en' : 'es');
    React.startTransition(() => router.push(target));
  };

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
