import { notFound } from "next/navigation";

// With two root layouts (see RootDocument) an unknown URL no longer has a root
// layout to render its 404 in, so it would come out unstyled and without
// <html lang>. This catch-all sends it to notFound() inside this layout instead.
export default function Missing() {
  notFound();
}
