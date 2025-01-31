// Theme Switcher
const themeToggle = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme") || "light";
htmlElement.setAttribute("data-theme", savedTheme);
themeToggle.checked = savedTheme === "dark";

themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    htmlElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    htmlElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});

// Navigation Active State
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

// Intersection Observer for sections
const observerOptions = {
  threshold: 0.3,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Update navigation
      navLinks.forEach((link) => {
        if (link.getAttribute("href").slice(1) === entry.target.id) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

      // Add animation classes to elements
      entry.target.querySelectorAll(".animate-on-scroll").forEach((element) => {
        element.classList.add("animate");
      });
    }
  });
}, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80,
      behavior: "smooth",
    });
  });
});

// Mobile Menu
const mobileMenuBtn = document.querySelector(".mobile-menu");
const navLinksContainer = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenuBtn.classList.toggle("active");
  navLinksContainer.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !mobileMenuBtn.contains(e.target) &&
    !navLinksContainer.contains(e.target)
  ) {
    mobileMenuBtn.classList.remove("active");
    navLinksContainer.classList.remove("active");
  }
});

// Skills Animation
const skillBars = document.querySelectorAll(".skill-item");

const animateSkills = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const skillBar = entry.target;
      const percentage = skillBar.getAttribute("data-skill");
      const progressBar = skillBar.querySelector(".skill-progress");

      progressBar.style.width = `${percentage}%`;
      skillBar.classList.add("animated");

      // Unobserve after animation
      observer.unobserve(skillBar);
    }
  });
};

const skillsObserver = new IntersectionObserver(animateSkills, {
  threshold: 0.5,
});

skillBars.forEach((bar) => {
  skillsObserver.observe(bar);
});

// Typing Animation for Hero Section
const typeText = (element, text, speed = 100) => {
  let index = 0;
  element.innerHTML = "";

  const typing = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(typing);
    }
  }, speed);
};

// Project Cards Hover Effect
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  });
});

// Contact Form Handling
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form data
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  // Animate submit button
  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.innerHTML = "Sending...";
  submitButton.disabled = true;

  try {
    // Simulate form submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show success message
    showNotification("Message sent successfully!", "success");
    contactForm.reset();
  } catch (error) {
    showNotification("Failed to send message. Please try again.", "error");
  } finally {
    submitButton.innerHTML = "Send Message";
    submitButton.disabled = false;
  }
});

// Notification System
const showNotification = (message, type) => {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => notification.classList.add("show"), 100);

  // Remove notification
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
};

// Update copyright year
document.querySelector(
  ".copyright"
).textContent = `© ${new Date().getFullYear()} Your Name. All Rights Reserved.`;

// Scroll Progress Indicator
const createScrollProgress = () => {
  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  document.body.appendChild(progress);

  window.addEventListener("scroll", () => {
    const windowHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progress.style.width = `${scrolled}%`;
  });
};

createScrollProgress();

// Add loading animation to images
const images = document.querySelectorAll("img");
images.forEach((img) => {
  img.addEventListener("load", () => {
    img.classList.add("loaded");
  });
});

// Initialize animations when page loads
document.addEventListener("DOMContentLoaded", () => {
  // Animate hero section elements
  const heroTitle = document.querySelector(".hero-text h1");
  const heroSubtitle = document.querySelector(".hero-text p");

  setTimeout(() => {
    heroTitle.classList.add("animate");
    setTimeout(() => heroSubtitle.classList.add("animate"), 500);
  }, 300);
});

// Certification Modal Functionality
const modal = document.getElementById("certificationModal");
const certificationCards = document.querySelectorAll(".certification-card");
const closeModal = document.querySelector(".close-modal");

function openModal(certData) {
  // Update modal content with certification data
  document.getElementById("modalTitle").textContent = certData.title;
  document.getElementById("modalIssuer").textContent = certData.issuer;
  document.getElementById("modalDate").textContent = certData.date;
  document.getElementById("modalCredentialId").textContent =
    certData.credentialId;
  document.getElementById("modalImage").src = certData.image;
  document.getElementById("modalDescription").textContent =
    certData.description;

  // Clear and update skills tags
  const skillsContainer = document.getElementById("modalSkills");
  skillsContainer.innerHTML = "";
  certData.skills.forEach((skill) => {
    const span = document.createElement("span");
    span.textContent = skill;
    skillsContainer.appendChild(span);
  });

  // Update verify link
  const verifyLink = document.getElementById("modalVerifyLink");
  verifyLink.href = certData.verifyLink;

  // Show modal with animation
  modal.style.display = "block";
  setTimeout(() => {
    modal.classList.add("show");
  }, 10);
}

function closeModalHandler() {
  modal.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

// Add click handlers to certification cards
certificationCards.forEach((card) => {
  const viewButton = card.querySelector(".view-cert-btn");
  viewButton.addEventListener("click", () => {
    const certData = JSON.parse(card.getAttribute("data-cert"));
    openModal(certData);
  });
});

// Close modal handlers
closeModal.addEventListener("click", closeModalHandler);
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModalHandler();
  }
});

// Close modal on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") {
    closeModalHandler();
  }
});

// Prevent modal content clicks from closing the modal
modal.querySelector(".modal-content").addEventListener("click", (e) => {
  e.stopPropagation();
});

const observeElements = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".timeline-item").forEach((item) => {
    observer.observe(item);
  });
};

// Initialize animations when the document loads
document.addEventListener("DOMContentLoaded", observeElements);
