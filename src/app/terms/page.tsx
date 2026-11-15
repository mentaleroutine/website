import { LegalPage } from "@/components/legal-page";

// Dutch alias: /voorwaarden redirects here (next.config.ts), like /voorbeelden → /samples.
export default function TermsPage() {
  return <LegalPage kind="terms" />;
}
