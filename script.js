const cards = document.querySelectorAll(".art-card");

cards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 12;
        const rotateX = ((y / rect.height) - 0.5) * -12;

        card.style.transform =
        `perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-10px)`;
    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
        `perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)`;
    });

});

const scrollTopBtn = document.getElementById("scrollTopBtn");

scrollTopBtn.addEventListener("click", e => {

    e.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});