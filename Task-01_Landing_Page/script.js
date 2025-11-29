// 1. Sticky Navbar Effect
window.addEventListener("scroll", function(){
    var navbar = document.querySelector(".navbar");
    // Jab scroll 20px se zyada ho, "sticky" class add karo
    navbar.classList.toggle("sticky", window.scrollY > 20);
});

// 2. Active Menu Highlighter (Scroll Spy)
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".navbar ul li a");

window.addEventListener("scroll", () => {
    let current = "";
    
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // 60px adjustment navbar height ke liye
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute("id");
        }
    });

    navLi.forEach((a) => {
        a.classList.remove("active");
        if (a.getAttribute("href").includes(current)) {
            a.classList.add("active");
        }
    });
});

// 3. Mobile Menu Toggle
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
});

// Close menu when a link is clicked (Mobile)
document.querySelectorAll(".navbar ul li a").forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
    });
});