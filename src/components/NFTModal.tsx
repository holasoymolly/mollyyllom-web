'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProtectedImage } from './ProtectedImage';
import { useLanguage } from '@/context/LanguageContext';

interface NFTAttribute {
  trait_type: string;
  value: string | number;
  display_type?: string;
  max_value?: number;
}

interface NFTMetadata {
  name: string;
  description?: string;
  attributes?: NFTAttribute[];
}

interface NFTModalProps {
  image: string;
  collectionName: string;
  collectionLink: string;
  metadataUrl: string | null;
  comingSoon?: boolean;
  onClose: () => void;
}

function formatValue(value: string | number, traitType?: string): string {
  if (typeof value === 'number') return String(value);
  const traitLower = traitType?.toLowerCase();
  return value
    .replace(/[_-]/g, ' ')
    .toLowerCase()
    .split(' ')
    .filter((word) => word !== traitLower)
    .join(' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export const NFTModal = ({
  image,
  collectionName,
  collectionLink,
  metadataUrl,
  comingSoon = false,
  onClose,
}: NFTModalProps) => {
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    if (!metadataUrl) return;
    setLoading(true);
    fetch(metadataUrl)
      .then((r) => r.json())
      .then((data) => setMetadata(data))
      .catch(() => setMetadata(null))
      .finally(() => setLoading(false));
  }, [metadataUrl]);

  const regularAttrs = metadata?.attributes?.filter((a) => a.display_type !== 'number');
  const hasMetadata = !!metadataUrl;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-indigo-950/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-4xl bg-indigo-950 border border-stone-200/10 overflow-hidden max-h-[92vh] flex flex-col md:flex-row"
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-stone-200 transition-colors duration-200"
            aria-label="Cerrar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* ── Image ── */}
          <div className={`shrink-0 ${hasMetadata ? 'w-full md:w-[46%]' : 'w-full'}`}>
            <ProtectedImage
              src={image}
              alt={metadata?.name || collectionName}
              className={`w-full object-cover ${hasMetadata ? 'h-72 md:h-full' : 'max-h-[80vh]'}`}
              wrapperClassName="w-full h-full"
            />
          </div>

          {/* ── Info panel ── */}
          {hasMetadata && (
            <div className="flex flex-col w-full overflow-y-auto">

              {/* Header */}
              <div className="px-8 pt-8 pb-6 border-b border-stone-200/10">
                <p className="text-violet-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-3">
                  {collectionName}
                </p>
                {loading && (
                  <p className="text-stone-600 text-sm animate-pulse">{t.nfts.loading}</p>
                )}
                {metadata && (
                  <h3 className="text-3xl md:text-4xl font-black text-stone-100 leading-[1.05] tracking-tight">
                    {metadata.name}
                  </h3>
                )}
              </div>

              {/* Attributes */}
              {regularAttrs && regularAttrs.length > 0 && (
                <div className="px-8 py-6 flex-1">
                  <p className="text-slate-400 text-[10px] font-bold tracking-[0.25em] uppercase mb-5">
                    {t.nfts.attributes}
                  </p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {regularAttrs.map((attr, i) => (
                      <div
                        key={i}
                        className="flex flex-col border-l-2 border-violet-500 pl-3 py-0.5 min-w-[80px]"
                      >
                        <span className="text-slate-400 text-[9px] font-bold tracking-widest uppercase mb-1 leading-none">
                          {attr.trait_type}
                        </span>
                        <span className="text-stone-200 text-sm font-bold leading-tight">
                          {formatValue(attr.value, attr.trait_type)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mint button */}
              <div className="px-8 py-6 mt-auto border-t border-stone-200/10">
                {comingSoon ? (
                  <span
                    role="status"
                    className="flex items-center justify-center w-full border border-stone-200/10 text-slate-500 font-bold px-8 py-4 rounded-full text-sm tracking-wide cursor-default select-none"
                  >
                    {t.nfts.comingSoon}
                  </span>
                ) : (
                  <a
                    href={collectionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full border border-stone-200/20 text-stone-300 font-bold px-8 py-4 rounded-full transition-all duration-300 hover:bg-violet-500 hover:border-violet-500 hover:text-stone-200 text-sm tracking-wide"
                  >
                    {t.nfts.mint}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* ── No metadata: just image + button ── */}
          {!hasMetadata && (
            <div className="px-8 py-6 border-t border-stone-200/10 flex items-center justify-between gap-6">
              <div>
                <p className="text-violet-400 text-[10px] font-bold tracking-[0.3em] uppercase">
                  {collectionName}
                </p>
              </div>
              <a
                href={collectionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center justify-center border border-stone-200/20 text-stone-300 font-bold px-8 py-4 rounded-full transition-all duration-300 hover:bg-violet-500 hover:border-violet-500 hover:text-stone-200 text-sm tracking-wide whitespace-nowrap"
              >
                {t.nfts.viewCollection}
              </a>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
