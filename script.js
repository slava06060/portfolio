const cards = document.querySelectorAll(".art-card");

cards.forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 10;
        const rotateX = ((y / rect.height) - 0.5) * -10;

        card.style.transform =
        `perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-12px)
        scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform =
        `perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        translateY(0)
        scale(1)`;
    });
});

const scrollTopBtn = document.getElementById("scrollTopBtn");

if(scrollTopBtn){
    scrollTopBtn.addEventListener("click", e => {
        e.preventDefault();

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    });
}

/* SCROLL REVEAL */

const revealItems = document.querySelectorAll(`
    .about-container,
    .character-card,
    .about-btn,
    .gallery,
    .art-card,
    .subpage-card,
    .project-card,
    .theme-card,
    .material-card,
    .section-title
`);

revealItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.transitionDelay = `${index * 80}ms`;
});

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{
    threshold:0.18,
    rootMargin:"0px 0px -70px 0px"
});

revealItems.forEach(item => {
    revealObserver.observe(item);
});