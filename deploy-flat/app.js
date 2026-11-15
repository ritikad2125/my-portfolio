/* Ritika Dhiman — portfolio interactions */
(function () {
  "use strict";

  /* ---- nav scroll state + mobile toggle ---- */
  const nav = document.querySelector("header.nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const burger = document.querySelector(".burger");
  const links = document.querySelector(".nav-links");
  if (burger) {
    burger.addEventListener("click", () => links.classList.toggle("show"));
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("show"))
    );
  }

  /* ---- typing effect in hero ---- */
  const typeEl = document.querySelector(".role .type");
  if (typeEl) {
    const words = [
      "LLM Evaluation",
      "Chemistry QA",
      "LaTeX Validation",
      "Rubric Compliance",
      "AI Quality Control",
    ];
    let w = 0, c = 0, deleting = false;
    const tick = () => {
      const word = words[w];
      typeEl.textContent = word.slice(0, c);
      if (!deleting && c < word.length) {
        c++; setTimeout(tick, 70);
      } else if (!deleting && c === word.length) {
        deleting = true; setTimeout(tick, 1400);
      } else if (deleting && c > 0) {
        c--; setTimeout(tick, 34);
      } else {
        deleting = false; w = (w + 1) % words.length; setTimeout(tick, 220);
      }
    };
    tick();
  }

  /* ---- scroll reveal ---- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---- animated counters ---- */
  const counters = document.querySelectorAll("[data-count]");
  const cio = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const dur = 1400;
        const start = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          const val = target * ease;
          el.textContent =
            (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => cio.observe(c));

  /* ---- lightbox ---- */
  const lb = document.getElementById("lightbox");
  const lbImg = lb.querySelector("img");
  const open = (src, alt) => {
    lbImg.src = src;
    lbImg.alt = alt || "";
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    lb.classList.remove("open");
    document.body.style.overflow = "";
  };
  document.querySelectorAll("[data-zoom]").forEach((el) => {
    el.addEventListener("click", () => {
      const img = el.matches("img") ? el : el.querySelector("img");
      if (img) open(img.src, img.alt);
    });
  });
  lb.addEventListener("click", (e) => {
    if (e.target === lb || e.target.classList.contains("close")) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  /* ---- subtle parallax on hero orbs ---- */
  const orbs = document.querySelectorAll(".bg-fx .orb");
  window.addEventListener(
    "mousemove",
    (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      orbs.forEach((o, i) => {
        const d = (i + 1) * 8;
        o.style.transform = `translate(${x * d}px,${y * d}px)`;
      });
    },
    { passive: true }
  );

  /* ---- year ---- */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
