import { RootDocument, rootMetadata } from "@/app/RootDocument";

// Root layout for the /en routes. See RootDocument for why there are two.
export const metadata = rootMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
