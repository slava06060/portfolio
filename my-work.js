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
   DRAG + AUTO INFINITE SKETCHBOOK
========================= */

const marquees = document.querySelectorAll(".marquee");

marquees.forEach((marquee, index) => {
    const track = marquee.querySelector(".marquee__track");

    if (!track) return;

    // Duplicate images for infinite loop
    track.innerHTML += track.innerHTML;

    let isDragging = false;
    let startX = 0;
    let currentX = -track.scrollWidth / 4;
    let previousX = currentX;

    // 1st row moves right, 2nd row moves left
    const direction = index % 2 === 0 ? 1 : -1;
    const autoSpeed = direction * 0.35;

    function fixLoopPosition() {
        const halfWidth = track.scrollWidth / 2;

        if (currentX <= -halfWidth) {
            currentX += halfWidth;
            previousX = currentX;
        }

        if (currentX >= 0) {
            currentX -= halfWidth;
            previousX = currentX;
        }
    }

    function setPosition() {
        fixLoopPosition();
        track.style.transform = `translateX(${currentX}px)`;
    }

    setPosition();

    marquee.addEventListener("pointerdown", e => {
        isDragging = true;
        startX = e.clientX;
        previousX = currentX;
        marquee.setPointerCapture(e.pointerId);
    });

    marquee.addEventListener("pointermove", e => {
        if (!isDragging) return;

        currentX = previousX + (e.clientX - startX);
        setPosition();
    });

    marquee.addEventListener("pointerup", () => {
        isDragging = false;
        previousX = currentX;
    });

    marquee.addEventListener("pointercancel", () => {
        isDragging = false;
        previousX = currentX;
    });

    function animate() {
        if (!isDragging) {
            currentX += autoSpeed;
            previousX = currentX;
            setPosition();
        }

        requestAnimationFrame(animate);
    }

    animate();
});