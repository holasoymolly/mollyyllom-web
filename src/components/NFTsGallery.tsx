'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { NFTModal } from "./NFTModal";
import { ProtectedImage } from "./ProtectedImage";
import { Collection } from "@/data/collections";
import { useLanguage } from "@/context/LanguageContext";

interface NFTsGalleryProps {
  collections: Collection[];
}

interface SelectedNFT {
  image: string;
  collectionName: string;
  collectionLink: string;
  metadataUrl: string | null;
  comingSoon: boolean;
}

function getMetadataUrl(imagePath: string, metadataPath: string): string {
  const filename = imagePath.split('/').pop()?.replace(/\.[^.]+$/, '') ?? '';
  return `${metadataPath}/${filename}.json`;
}

export const NFTsGallery: React.FC<NFTsGalleryProps> = ({ collections }) => {
  const [selected, setSelected] = useState<SelectedNFT | null>(null);
  const { t } = useLanguage();

  if (!collections || collections.length === 0) {
    return (
      <div className="px-6 md:px-16 lg:px-24 py-20 text-stone-400">
        <p>No hay colecciones disponibles para mostrar.</p>
      </div>
    );
  }

  const handleImageClick = (image: string, collection: Collection) => {
    setSelected({
      image,
      collectionName: collection.name,
      collectionLink: collection.link,
      metadataUrl: collection.metadataPath
        ? getMetadataUrl(image, collection.metadataPath)
        : null,
      comingSoon: collection.comingSoon === true,
    });
  };

  return (
    <div className="bg-indigo-950">
      {collections.map((collection, index) => {
        const reversed = index % 2 !== 0;
        const displayNumber = String(collections.length - index).padStart(2, '0');

        return (
          <motion.div
            key={index}
            className="border-t border-stone-200/10 py-16"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Collection header */}
            <div className="px-6 md:px-16 lg:px-24 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <span className="text-violet-400 text-xs font-bold tracking-[0.25em] uppercase">
                  {t.nfts.collection} {displayNumber}
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-stone-200 mt-1 leading-none">
                  {collection.name}
                </h2>
              </div>
              {collection.comingSoon ? (
                <span
                  role="status"
                  className="shrink-0 border border-stone-200/10 text-slate-500 font-bold px-7 py-3.5 rounded-full text-sm whitespace-nowrap w-fit cursor-default select-none"
                >
                  {t.nfts.comingSoon}
                </span>
              ) : (
                <a
                  href={collection.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 border border-stone-200/20 text-stone-300 font-bold px-7 py-3.5 rounded-full text-sm transition-all duration-300 hover:bg-violet-500 hover:border-violet-500 hover:text-stone-200 whitespace-nowrap w-fit"
                >
                  {t.nfts.viewCollection}
                </a>
              )}
            </div>

            {/* Scrolling image strip */}
            <div className="overflow-hidden">
              <div
                className={`flex w-max ${reversed ? 'animate-marquee-reverse' : 'animate-marquee'}`}
                style={{ willChange: 'transform' }}
              >
                {[0, 1].map((setIdx) => (
                  <div key={setIdx} className="flex" aria-hidden={setIdx === 1}>
                    {collection.images.map((image, idx) => (
                      <div
                        key={idx}
                        className="relative w-56 h-56 md:w-72 md:h-72 shrink-0 overflow-hidden rounded-sm group mr-3 cursor-pointer"
                        onClick={() => setIdx === 0 && handleImageClick(image, collection)}
                      >
                        <ProtectedImage
                          src={image}
                          alt={`${collection.name} — ${idx + 1}`}
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                          wrapperClassName="w-full h-full"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-violet-500/0 group-hover:bg-violet-500/20 transition-colors duration-300" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Modal */}
      {selected && (
        <NFTModal
          image={selected.image}
          collectionName={selected.collectionName}
          collectionLink={selected.collectionLink}
          metadataUrl={selected.metadataUrl}
          comingSoon={selected.comingSoon}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};
