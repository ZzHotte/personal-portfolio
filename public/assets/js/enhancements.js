"use strict";

(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches) return;

  const modal = document.querySelector("[data-modal-container]");
  const overlay = document.querySelector("[data-overlay]");

  function closeModalIfOpen() {
    if (!modal || !modal.classList.contains("active")) return;
    modal.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModalIfOpen();
  });

  const selector =
    ".service-item, .project-item, .blog-post-item, .timeline-item";

  const io = new IntersectionObserver(
    function (entries) {
      for (let i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add("is-visible");
        }
      }
    },
    { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
  );

  function scanActiveArticle() {
    const active = document.querySelector("article[data-page].active");
    if (!active) return;
    const nodes = active.querySelectorAll(selector);
    for (let i = 0; i < nodes.length; i++) {
      const el = nodes[i];
      el.classList.add("js-reveal");
      io.observe(el);
    }
  }

  function onNavClick() {
    window.setTimeout(scanActiveArticle, 80);
  }

  const navLinks = document.querySelectorAll("[data-nav-link]");
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", onNavClick);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scanActiveArticle);
  } else {
    scanActiveArticle();
  }
})();
