import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
export const metadata: Metadata = pageMetadata(
  "Privacy Information",
  "How Epitome Creatives handles website enquiries and how to contact the studio about your information.",
  "/privacy",
);
export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="site-wrap section-space">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5">Website enquiries</p>
          <h1 className="section-title">Privacy information</h1>
          <div className="copy mt-8 space-y-6">
            <p>
              The enquiry form collects the contact details and project
              information you choose to provide. Epitome Creatives uses these
              details to respond to your enquiry and discuss your project.
            </p>
            <section>
              <h2 className="mb-3 text-xl text-[#242522]">
                Services used by this website
              </h2>
              <p>
                The form submits your enquiry through Web3Forms. Website
                analytics are provided by Vercel Analytics. You can read more
                about these services in the{" "}
                <a className="underline" href="https://web3forms.com/privacy">
                  Web3Forms privacy policy
                </a>{" "}
                and the{" "}
                <a
                  className="underline"
                  href="https://vercel.com/legal/privacy-policy"
                >
                  Vercel privacy policy
                </a>
                .
              </p>
            </section>
            <section>
              <h2 className="mb-3 text-xl text-[#242522]">
                Questions about your information
              </h2>
              <p>
                For questions about your enquiry or to request access,
                correction or deletion of the information you have shared,
                contact{" "}
                <a
                  className="break-all underline"
                  href="mailto:hello@epitomecreatives.com"
                >
                  hello@epitomecreatives.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
