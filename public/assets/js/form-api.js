"use strict";

(function () {
  const form = document.querySelector("[data-form]");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const btn = form.querySelector("[data-form-btn]");
    const fd = new FormData(form);
    const payload = {
      fullname: String(fd.get("fullname") || ""),
      email: String(fd.get("email") || ""),
      message: String(fd.get("message") || ""),
    };

    if (btn) btn.disabled = true;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(function () {
        return {};
      });
      if (!res.ok) {
        throw new Error(data.message || res.statusText || "Request failed");
      }
      window.alert("Thanks — your message was received.");
      form.reset();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      window.alert("Could not send: " + msg);
    } finally {
      if (btn) {
        btn.disabled = !form.checkValidity();
      }
    }
  });
})();
