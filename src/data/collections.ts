export interface Collection {
  name: string;
  link: string;
  metadataPath?: string;
  /** When true, the header CTA is non-linked copy (e.g. coming soon). */
  comingSoon?: boolean;
  images: string[];
}

export const collections: Collection[] = [

  {
    name: "Molly Degen Punks",
    link: "https://mollyverse.art/",
    metadataPath: "/img/nft/molly-degen-punks/metadata",
    images: [
      "/img/nft/molly-degen-punks/2.png",
      "/img/nft/molly-degen-punks/27.png",
      "/img/nft/molly-degen-punks/3.png",
      "/img/nft/molly-degen-punks/30.png",
      "/img/nft/molly-degen-punks/35.png",
      "/img/nft/molly-degen-punks/36.png",
      "/img/nft/molly-degen-punks/4.png",
      "/img/nft/molly-degen-punks/45.png",
      "/img/nft/molly-degen-punks/46.png",
      "/img/nft/molly-degen-punks/48.png",
    ],
  },

  {
    name: "Thingies Monsters",
    link: "https://launchmynft.io/sol/12250",
    metadataPath: "/img/nft/thingies/metadata",
    images: [
      "/img/nft/thingies/1.webp",
      "/img/nft/thingies/12.webp",
      "/img/nft/thingies/13.webp",
      "/img/nft/thingies/16.webp",
      "/img/nft/thingies/17.webp",
      "/img/nft/thingies/24.webp",
      "/img/nft/thingies/27.webp",
      "/img/nft/thingies/30.webp",
      "/img/nft/thingies/31.webp",
      "/img/nft/thingies/40.webp",
    ],
  },

  {
    name: "Pixeled Flexies Vol. 2",
    link: "https://launchmynft.io/sol/12117",
    metadataPath: "/img/nft/pixeled-flexies-vol-2/metadata",
    images: [
      "/img/nft/pixeled-flexies-vol-2/0.webp",
      "/img/nft/pixeled-flexies-vol-2/1.webp",
      "/img/nft/pixeled-flexies-vol-2/18.webp",
      "/img/nft/pixeled-flexies-vol-2/21.webp",
      "/img/nft/pixeled-flexies-vol-2/25.webp",
      "/img/nft/pixeled-flexies-vol-2/27.webp",
      "/img/nft/pixeled-flexies-vol-2/28.webp",
      "/img/nft/pixeled-flexies-vol-2/29.webp",
      "/img/nft/pixeled-flexies-vol-2/31.webp",
      "/img/nft/pixeled-flexies-vol-2/37.webp",
    ],
  },

  {
    name: "Pixeled Flexies",
    link: "https://launchmynft.io/sol/11391",
    // No metadata available for this collection
    images: [
      "/img/nft/pixeled-flexies/pixeled-flexies-01.webp",
      "/img/nft/pixeled-flexies/pixeled-flexies-02.jpg",
      "/img/nft/pixeled-flexies/pixeled-flexies-03.webp",
      "/img/nft/pixeled-flexies/pixeled-flexies-04.webp",
      "/img/nft/pixeled-flexies/pixeled-flexies-05.webp",
      "/img/nft/pixeled-flexies/pixeled-flexies-06.webp",
      "/img/nft/pixeled-flexies/pixeled-flexies-07.webp",
      "/img/nft/pixeled-flexies/pixeled-flexies-08.webp",
      "/img/nft/pixeled-flexies/pixeled-flexies-09.webp",
      "/img/nft/pixeled-flexies/pixeled-flexies-10.webp",
    ],
  },

];
