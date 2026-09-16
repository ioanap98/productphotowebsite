import { permanentRedirect } from "next/navigation";

// Keep the old gallery address working with one authoritative portfolio page.
export default function ProductsPage() {
  permanentRedirect("/portfolio");
}
