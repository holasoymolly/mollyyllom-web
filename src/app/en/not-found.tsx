// Next's own 404, the same one the site showed when it had a single root
// layout, rendered inside this root layout so it keeps its fonts and
// <html lang>. Without it, an unknown /en URL comes out as a bare page.
export { default } from "next/dist/client/components/not-found-error";
