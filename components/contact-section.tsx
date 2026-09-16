"use client";
import { useState } from "react";
import Link from "next/link";
import { submitEnquiry } from "@/lib/enquiry.mjs";
import { ArrowUpRight, Check, Copy } from "lucide-react";

export default function ContactSection() {
  const [result, setResult] = useState<{
    kind: "success" | "error";
    message: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@epitomecreatives.com");
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      setEmailCopied(false);
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (formData.get("botcheck")) return;
    setSubmitting(true);
    setResult(null);
    try {
      await submitEnquiry(formData);
      setResult({
        kind: "success",
        message:
          "Thank you — your enquiry has been sent. I’ll be in touch to discuss your project.",
      });
      form.reset();
    } catch {
      setResult({
        kind: "error",
        message:
          "Your enquiry could not be sent. Your details are still here — please try again, or email hello@epitomecreatives.com.",
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <section id="contact" className="section-space">
      <div className="site-wrap grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
        <div>
          <p className="eyebrow mb-4 text-[#66675f]">06 / Your next project</p>
          <h2 className="section-title">
            Let’s make
            <br />
            something
            <br />
            worth noticing.
          </h2>
          <p className="copy mt-6 max-w-sm">
            Tell us what you’re creating. We’ll shape a shoot around your brand,
            your goals and the content you need.
          </p>
          <p className="copy mt-4 max-w-sm text-sm">
            Every project is quoted individually, with creative direction,
            deliverables and intended usage agreed before the shoot.
          </p>
          <div className="mt-10 border-t border-[#d8d7d0] pt-6">
            <p className="eyebrow mb-3 text-[#66675f]">
              Prefer a conversation by email?
            </p>
            <div className="flex items-center gap-2">
              <a
                href="mailto:hello@epitomecreatives.com"
                className="break-all text-sm underline underline-offset-4"
              >
                hello@epitomecreatives.com
              </a>
              <button
                type="button"
                className="grid size-11 shrink-0 place-items-center"
                aria-label={emailCopied ? "Email copied" : "Copy email address"}
                onClick={() => void copyEmail()}
              >
                {emailCopied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <span role="status" className="sr-only">
              {emailCopied ? "Email address copied" : ""}
            </span>
            <a
              href="https://www.instagram.com/epitome.creatives/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link mt-3"
            >
              Instagram <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="border border-[#d8d7d0] bg-white/70 p-5 sm:p-8"
          aria-label="Shoot enquiry"
          aria-busy={submitting}
        >
          <h3 className="text-2xl tracking-[-.03em]">Enquire About a Shoot</h3>
          <p className="mb-7 mt-3 text-xs leading-6 text-[#66675f]">
            A few details to get started. Fields marked * are required.
          </p>
          <input
            type="text"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="form-label" htmlFor="enquiry-name">
                Your name *
              </label>
              <input
                id="enquiry-name"
                name="name"
                autoComplete="name"
                required
                maxLength={120}
                className="form-field"
              />
            </div>
            <div>
              <label className="form-label" htmlFor="enquiry-company">
                Brand name
              </label>
              <input
                id="enquiry-company"
                name="company"
                autoComplete="organization"
                maxLength={160}
                className="form-field"
              />
            </div>
            <div>
              <label className="form-label" htmlFor="enquiry-email">
                Email address *
              </label>
              <input
                id="enquiry-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                maxLength={254}
                className="form-field"
              />
            </div>
            <div>
              <label className="form-label" htmlFor="enquiry-website">
                Website or Instagram
              </label>
              <input
                id="enquiry-website"
                name="website"
                placeholder="Website or @yourbrand"
                maxLength={300}
                className="form-field"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="form-label" htmlFor="enquiry-service">
                What would you like to create? *
              </label>
              <select
                id="enquiry-service"
                name="projectType"
                required
                className="form-field"
                defaultValue=""
              >
                <option value="">Choose a service</option>
                <option value="product-photography">Product photography</option>
                <option value="lifestyle">Lifestyle photography</option>
                <option value="product-videos">Short-form video</option>
                <option value="stop-motion">Stop-motion</option>
                <option value="complete-package">
                  Creative campaign — photography & video
                </option>
                <option value="not-sure">I’d like some guidance</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="form-label" htmlFor="enquiry-details">
                Tell us about your project *
              </label>
              <textarea
                id="enquiry-details"
                name="projectDetails"
                required
                maxLength={5000}
                rows={4}
                className="form-field resize-y"
                placeholder="Your products, the story you want to tell, and where the content will be used."
              />
            </div>
          </div>
          <details className="my-6 border-y border-[#d8d7d0] py-4">
            <summary className="py-1 text-xs leading-6">
              Budget, timing & deliverables{" "}
              <span className="text-[#66675f]">(optional)</span>
            </summary>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="enquiry-budget" className="form-label">
                  Approximate budget (GBP)
                </label>
                <input
                  id="enquiry-budget"
                  name="budget"
                  className="form-field"
                  maxLength={100}
                  placeholder="Your budget or range"
                />
              </div>
              <div>
                <label htmlFor="enquiry-date" className="form-label">
                  Desired delivery date
                </label>
                <input
                  id="enquiry-date"
                  name="desiredDate"
                  type="date"
                  className="form-field min-w-0"
                />
              </div>
              <div>
                <label htmlFor="enquiry-scope" className="form-label">
                  Images / videos needed
                </label>
                <input
                  id="enquiry-scope"
                  name="deliverables"
                  className="form-field"
                  maxLength={200}
                  placeholder="e.g. 8 photos and 2 videos"
                />
              </div>
              <div>
                <label htmlFor="enquiry-phone" className="form-label">
                  Phone number
                </label>
                <input
                  id="enquiry-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="form-field"
                  maxLength={40}
                />
              </div>
            </div>
          </details>
          <p className="mb-5 text-[11px] leading-5 text-[#66675f]">
            Your details are used to respond to your enquiry. Enquiries are
            processed through Web3Forms.{" "}
            <Link href="/privacy" className="underline underline-offset-2">
              Privacy information
            </Link>
            .
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="studio-button w-full disabled:cursor-wait disabled:opacity-60"
          >
            {submitting ? "Sending your enquiry…" : "Send Enquiry"}
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
          <div aria-live="polite" aria-atomic="true">
            {result && (
              <p
                className={`mt-5 border-l-2 pl-4 text-sm leading-6 ${result.kind === "success" ? "border-green-700 text-green-800" : "border-red-700 text-red-800"}`}
              >
                {result.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
