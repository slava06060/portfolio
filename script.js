/* =========================
   APPLE-STYLE CARD HOVER
========================= */

const cards = document.querySelectorAll(".art-card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {
        card.style.transition =
            "transform 1.7s cubic-bezier(.19,1,.22,1), box-shadow 1.7s cubic-bezier(.19,1,.22,1)";
    });

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 5;
        const rotateX = ((y / rect.height) - 0.5) * -5;

        card.style.transform = `
            perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-20px)
            scale(1.03)
        `;
    });

    card.addEventListener("mouseleave", () => {

        card.style.transition =
            "transform 1.9s cubic-bezier(.19,1,.22,1)";

        card.style.transform = `
            perspective(1200px)
            rotateX(0deg)
            rotateY(0deg)
            translateY(0)
            scale(1)
        `;
    });

});

/* =========================
   SCROLL TO TOP
========================= */

const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", e => {
        e.preventDefault();

        const scrollElement = document.scrollingElement || document.documentElement;

        scrollElement.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* =========================
   SMOOTH REVEAL ON SCROLL
========================= */

const revealItems = document.querySelectorAll(`
    .about-container,
    .gallery,
    .art-card,
    .subpage-card,
    .project-card,
    .theme-card,
    .material-card,
    .section-title
`);

revealItems.forEach(item => {
    item.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0,
    rootMargin: "0px 0px -5% 0px"
});

revealItems.forEach(item => {
    revealObserver.observe(item);
});