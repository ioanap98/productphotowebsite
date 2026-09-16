/**
 * Keep submission transport separate so it can be tested without sending mail.
 * @param {FormData} formData
 * @param {typeof fetch} fetcher
 */
export async function submitEnquiry(formData, fetcher = fetch) {
  if (formData.get("botcheck")) throw new Error("Spam submission");
  formData.set("access_key", "66f9c46a-07d4-4e4e-b2e4-1e8da31cf793");
  formData.set("subject", "New shoot enquiry — Epitome Creatives");
  const response = await fetcher("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  });
  const result = await response.json();
  if (!response.ok || result.success !== true)
    throw new Error("Submission failed");
}
