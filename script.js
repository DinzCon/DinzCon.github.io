const profilePic = document.getElementById("profilePic");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

/* LIGHTBOX */
function openLightbox() {
    lightboxImg.src = profilePic.src;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.style.overflow = "";
}

if (profilePic && lightbox && lightboxImg && lightboxClose) {
    profilePic.addEventListener("click", openLightbox);
    profilePic.addEventListener("keydown", (e) => {
        if (e.key === "Enter") openLightbox();
    });
    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.classList.contains("open")) {
            closeLightbox();
        }
    });
}

/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

/* SCROLL REVEAL — HEADER */
const headerEls = document.querySelectorAll(".header-name, .header-rule, .header-title");
const headerObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                headerObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);
headerEls.forEach((el) => headerObserver.observe(el));

/* SCROLL REVEAL — SIDEBAR SECTIONS */
const sidebarSections = document.querySelectorAll(".sidebar-section, .sidebar .sidebar-btn");
const sidebarObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const index = Array.from(sidebarSections).indexOf(entry.target);
                entry.target.style.transitionDelay = `${0.08 + index * 0.07}s`;
                entry.target.classList.add("show");
                sidebarObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);
sidebarSections.forEach((el) => sidebarObserver.observe(el));

/* SCROLL REVEAL — MAIN SECTIONS */
const mainSections = document.querySelectorAll(".section");
const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const index = Array.from(mainSections).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.08}s`;
                entry.target.classList.add("show");
                sectionObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);
mainSections.forEach((el) => sectionObserver.observe(el));

/* ACTIVE SIDEBAR HIGHLIGHT */
const sections = document.querySelectorAll("[id]");
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach((link) => {
        link.classList.remove("active");
        const href = link.getAttribute("href").replace("#", "");
        if (href === current) link.classList.add("active");
    });
});

/* PDF MODAL */
const viewCvBtn = document.getElementById("viewCvBtn");
const pdfModal = document.getElementById("pdfModal");
const pdfModalClose = document.getElementById("pdfModalClose");
const pdfModalBackdrop = document.getElementById("pdfModalBackdrop");
const pdfIframe = document.getElementById("pdfIframe");

const PDF_FILE = "Dinzil_Conejos_Professional_CV.pdf";

function openPdfModal() {
    pdfIframe.src = PDF_FILE;
    pdfModal.classList.add("open");
    pdfModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closePdfModal() {
    pdfModal.classList.remove("open");
    pdfModal.setAttribute("aria-hidden", "true");
    pdfIframe.src = "";
    document.body.style.overflow = "";
}

if (viewCvBtn && pdfModal) {
    viewCvBtn.addEventListener("click", openPdfModal);
    pdfModalClose.addEventListener("click", closePdfModal);
    pdfModalBackdrop.addEventListener("click", closePdfModal);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && pdfModal.classList.contains("open")) {
            closePdfModal();
        }
    });
}
