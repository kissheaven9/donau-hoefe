/* DONAU HÖFE — Interaktion (vanilla JS) */
(function () {
  "use strict";

  /* ---------- Jahr im Footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Header: solid beim Scrollen ---------- */
  var header = document.getElementById("header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-solid", window.scrollY > 40);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile-Navigation ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  function setNav(open) {
    document.body.classList.toggle("nav-open", open);
    if (toggle) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    }
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      setNav(!document.body.classList.contains("nav-open"));
    });
  }
  if (nav) {
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setNav(false);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setNav(false);
  });

  /* ---------- Hero: Wort-Rotation ---------- */
  var words = ["lebendiges", "bezahlbares", "nachhaltiges"];
  var wordEl = document.getElementById("rotatorWord");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (wordEl && !reduceMotion) {
    var idx = 0;
    setInterval(function () {
      wordEl.classList.add("is-out");
      setTimeout(function () {
        idx = (idx + 1) % words.length;
        wordEl.textContent = words[idx];
        wordEl.classList.remove("is-out");
      }, 400);
    }, 2400);
  }

  /* ---------- Reveal beim Scrollen (nur Sekundär-Inhalt) ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
    // Sicherheits-Fallback: nach 2.5 s alles sichtbar, falls Observer nicht feuert
    setTimeout(function () {
      reveals.forEach(function (el) { el.classList.add("is-in"); });
    }, 2500);
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Kontaktformular: Validierung + Versand ---------- */
  var form = document.getElementById("contactForm");
  var success = document.getElementById("formSuccess");

  function showError(field, msg) {
    var wrap = field.closest(".field");
    if (wrap) wrap.classList.add("is-invalid");
    var err = wrap ? wrap.querySelector(".field__error") : null;
    if (err) err.textContent = msg;
  }
  function clearError(field) {
    var wrap = field.closest(".field");
    if (wrap) wrap.classList.remove("is-invalid");
    var err = wrap ? wrap.querySelector(".field__error") : null;
    if (err) err.textContent = "";
  }
  function validate() {
    var ok = true;
    var name = form.querySelector("#name");
    var email = form.querySelector("#email");
    var message = form.querySelector("#message");

    if (!name.value.trim()) { showError(name, "Bitte geben Sie Ihren Namen an."); ok = false; }
    else clearError(name);

    var emailVal = email.value.trim();
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) { showError(email, "Bitte geben Sie Ihre E-Mail-Adresse an."); ok = false; }
    else if (!emailRe.test(emailVal)) { showError(email, "Bitte geben Sie eine gültige E-Mail-Adresse an."); ok = false; }
    else clearError(email);

    if (!message.value.trim()) { showError(message, "Bitte schreiben Sie uns eine kurze Nachricht."); ok = false; }
    else clearError(message);

    return ok;
  }

  if (form) {
    // Fehler beim Tippen ausblenden
    form.querySelectorAll("input, textarea").forEach(function (el) {
      el.addEventListener("input", function () { clearError(el); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) {
        var firstInvalid = form.querySelector(".field.is-invalid input, .field.is-invalid textarea");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var btn = form.querySelector("button[type=submit]");
      var action = form.getAttribute("action") || "";
      var isConfigured = action.indexOf("DEIN_FORMSPREE_ID") === -1 && action.indexOf("formspree.io") !== -1;

      function showSuccess() {
        if (success) success.classList.add("is-visible");
        form.reset();
        if (btn) { btn.disabled = false; btn.textContent = "Unterlagen anfordern"; }
      }

      if (btn) { btn.disabled = true; btn.textContent = "Wird gesendet …"; }

      if (!isConfigured) {
        // Formspree-Endpunkt noch nicht hinterlegt -> Demo-Fallback (Portfolio)
        setTimeout(showSuccess, 600);
        return;
      }

      fetch(action, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      }).then(function (res) {
        if (res.ok) { showSuccess(); }
        else { throw new Error("send failed"); }
      }).catch(function () {
        if (btn) { btn.disabled = false; btn.textContent = "Unterlagen anfordern"; }
        showError(form.querySelector("#message"), "Senden fehlgeschlagen. Bitte versuchen Sie es erneut oder schreiben Sie an kontakt@donau-hoefe.de.");
      });
    });
  }
})();
