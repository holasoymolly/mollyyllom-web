'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { ComponentProps, MouseEvent } from 'react';
import { langFromPathname, withLocale } from '@/i18n/routes';

type TransitionLinkProps = ComponentProps<typeof Link>;

export const TransitionLink = ({ onClick, href, ...props }: TransitionLinkProps) => {
  const router = useRouter();
  const pathname = usePathname() ?? '/';

  const rawHref = typeof href === 'string' ? href : href?.toString() ?? '';
  const isExternal =
    !rawHref ||
    rawHref.startsWith('http') ||
    rawHref.startsWith('mailto:') ||
    rawHref.startsWith('tel:');

  /**
   * Internal links inherit the language of the page they sit on, so nothing
   * inside `/en` has to spell out the prefix and no link drops the reader back
   * into Spanish mid-visit.
   */
  const resolvedHref = isExternal ? rawHref : withLocale(rawHref, langFromPathname(pathname));

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (e.button !== 0) return;
    if (props.target && props.target !== '_self') return;
    if (isExternal) return;

    e.preventDefault();
    React.startTransition(() => router.push(resolvedHref));
  };

  return <Link {...props} href={resolvedHref} onClick={handleClick} />;
};
