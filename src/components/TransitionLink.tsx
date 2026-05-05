'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ComponentProps, MouseEvent } from 'react';

type TransitionLinkProps = ComponentProps<typeof Link>;

export const TransitionLink = ({ onClick, ...props }: TransitionLinkProps) => {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (e.button !== 0) return;
    if (props.target && props.target !== '_self') return;

    const href = typeof props.href === 'string' ? props.href : props.href?.toString() ?? '';
    if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    e.preventDefault();
    React.startTransition(() => router.push(href));
  };

  return <Link {...props} onClick={handleClick} />;
};
