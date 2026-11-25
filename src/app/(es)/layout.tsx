import { RootDocument, rootMetadata } from "@/app/RootDocument";

// Root layout for every route outside /en. See RootDocument for why there are two.
export const metadata = rootMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="es">{children}</RootDocument>;
}
