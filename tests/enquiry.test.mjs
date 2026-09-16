import test from "node:test";
import assert from "node:assert/strict";
import { submitEnquiry } from "../lib/enquiry.mjs";

function enquiry() {
  const data = new FormData();
  for (const [key, value] of Object.entries({
    name: "Test name",
    email: "test@example.com",
    company: "Test brand",
    website: "@testbrand",
    projectType: "product-photography",
    projectDetails: "Test brief",
    budget: "To discuss",
    desiredDate: "2026-12-01",
    deliverables: "8 photos",
    phone: "",
    botcheck: "",
  }))
    data.set(key, value);
  return data;
}
test("sends all enquiry fields to the existing integration and accepts confirmed success", async () => {
  const data = enquiry();
  let calls = 0;
  await submitEnquiry(data, async (url, request) => {
    calls++;
    assert.equal(url, "https://api.web3forms.com/submit");
    assert.equal(request.method, "POST");
    assert.equal(request.body, data);
    assert.equal(data.get("deliverables"), "8 photos");
    assert.equal(data.get("email"), "test@example.com");
    assert.equal(
      data.get("access_key"),
      "66f9c46a-07d4-4e4e-b2e4-1e8da31cf793",
    );
    return Response.json({ success: true });
  });
  assert.equal(calls, 1);
});
test("rejects HTTP errors and provider failures without losing the brief", async () => {
  for (const [status, success] of [
    [500, true],
    [200, false],
  ]) {
    const data = enquiry();
    await assert.rejects(
      submitEnquiry(data, async () => Response.json({ success }, { status })),
    );
    assert.equal(data.get("projectDetails"), "Test brief");
  }
});
test("handles network failure and malformed provider responses", async () => {
  await assert.rejects(
    submitEnquiry(enquiry(), async () => {
      throw new Error("Offline");
    }),
  );
  await assert.rejects(
    submitEnquiry(enquiry(), async () => new Response("not-json")),
  );
});
test("honeypot prevents any network request", async () => {
  const data = enquiry();
  data.set("botcheck", "spam");
  await assert.rejects(
    submitEnquiry(data, async () => {
      assert.fail("Must not send spam");
    }),
  );
});
