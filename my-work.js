/* =========================
   MY WORK PAGE ANIMATIONS
========================= */

const revealItems = document.querySelectorAll(`
    .section-title,
    .theme-card,
    .material-card,
    .sketchbook-section
`);

revealItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
});

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.05,
    rootMargin: "0px 0px -30px 0px"
});

revealItems.forEach(item => {
    revealObserver.observe(item);
});

/* =========================
   THEME CARD HOVER EFFECT
========================= */

const themeCards = document.querySelectorAll(".theme-card, .material-card");

themeCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transition = "transform .18s ease, box-shadow .25s ease";
        card.style.transform = "perspective(900px) translateY(-10px) scale(1.03)";
    });

    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 8;
        const rotateX = ((y / rect.height) - 0.5) * -8;

        card.style.transform = `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-10px)
            scale(1.03)
        `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transition = "transform .2s ease, box-shadow .25s ease";
        card.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0) scale(1)";
    });
});


/* =========================
   AUTO MARQUEE INDEXES
   For infinite sketchbook scrolling
========================= */

const marquees = document.querySelectorAll(".marquee");

marquees.forEach(marquee => {
    const items = marquee.querySelectorAll(".marquee__item");

    marquee.style.setProperty("--marquee-items", items.length);

    items.forEach((item, index) => {
        item.style.setProperty("--marquee-item-index", index + 1);
    });
});