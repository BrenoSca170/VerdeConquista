// DOM Elements
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav__link")
const sections = document.querySelectorAll("section")
const projectCards = document.querySelectorAll(".project__card")
const modal = document.getElementById("project-modal")
const modalClose = document.getElementById("modal-close")
const contactForm = document.getElementById("contact-form")

// Project data
const projectData = {
  1: {
    title: "Eco Telhado",
    location: "Salvador, BA",
    image: "/public/CasaEcoTelhado.jpg",
    tags: ["Residencial", "Materiais Sustentaveis", "Energia Solar", "Telhado Verde"],
    description:
      "Nós escolhemos o telhado verde , pois é uma cobertura com vegetação que une bem-estar, economia e valorização. Ele reduz o calor dentro da casa, melhora a qualidade do ar e ajuda no controle da água da chuva. Além dos benefícios ambientais, garante economia na conta de energia, aumenta a vida útil do telhado e torna o imóvel mais valorizado e atrativo no mercado. Uma escolha inteligente para quem busca conforto e futuro sustentável.",
    
  },
  2: {
    title: "Green Office Complex",
    location: "Rio de Janeiro, Brazil",
    image: "/modern-office-building-with-green-walls-and-natura.jpg",
    tags: ["Commercial", "Green Walls", "Natural Lighting", "LEED Certified"],
    description:
      "A revolutionary office complex that redefines workplace sustainability. The building features extensive green walls, natural ventilation systems, and optimized daylighting. LEED Platinum certified, it reduces energy consumption by 40% compared to conventional office buildings.",
  },
  3: {
    title: "Community Wellness Center",
    location: "Brasília, Brazil",
    image: "/modern-community-center-with-bamboo-structure-and-.jpg",
    tags: ["Community", "Bamboo Structure", "Landscape Integration", "Wellness"],
    description:
      "A community-centered wellness facility built primarily with sustainable bamboo. The design integrates therapeutic gardens, meditation spaces, and flexible community areas. The structure demonstrates how traditional materials can be used in contemporary architecture.",
    
  },
  4: {
    title: "Vertical Garden Apartments",
    location: "Belo Horizonte, Brazil",
    image: "/modern-sustainable-apartment-building-with-vertica.jpg",
    tags: ["Residential", "Vertical Gardens", "Water Recycling", "Urban Living"],
    description:
      "An innovative residential complex featuring extensive vertical gardens and integrated water recycling systems. Each unit has access to private garden spaces, while the building's facade acts as a living air purification system for the urban environment.",
    
  },
}

// Typing effect for hero section
const typingText = document.querySelector(".typing-text")
const roles = ["Arquitetura Sustentável", "Design Eco-Friendly", "Harmonia Nos Ambientes", "Iluminação Natural"]
let roleIndex = 0
let charIndex = 0
let isDeleting = false

function typeEffect() {
  const currentRole = roles[roleIndex]

  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1)
    charIndex--
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1)
    charIndex++
  }

  let typeSpeed = isDeleting ? 50 : 100

  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000 // Pause at end
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    roleIndex = (roleIndex + 1) % roles.length
    typeSpeed = 500 // Pause before next word
  }

  setTimeout(typeEffect, typeSpeed)
}

// Start typing effect when page loads
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeEffect, 1000)
})

// Mobile navigation toggle
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show")
  })
})

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = targetSection.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Active navigation link highlighting
function updateActiveNavLink() {
  const scrollPosition = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

// Header background on scroll
function updateHeaderBackground() {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.backgroundColor = "rgba(255, 255, 255, 0.98)"
  } else {
    header.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
  }
}

// Scroll event listeners
window.addEventListener("scroll", () => {
  updateActiveNavLink()
  updateHeaderBackground()
})

// Project modal functionality
projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const cardImage = card.querySelector(".project__image img")
    const imageSrc = cardImage.src
    const imageAlt =  cardImage.alt
    const projectId = card.getAttribute("data-project")
    const project = projectData[projectId]

    if (project) {
      // Populate modal content
      document.getElementById("modal-image").src = project.image
      document.getElementById("modal-image").alt = project.title
      document.getElementById("modal-title").textContent = project.title
      document.getElementById("modal-location").textContent = project.location
      document.getElementById("modal-description").textContent = project.description
      document.getElementById("modal-gallery").href = project.galleryUrl

      // Populate tags
      const tagsContainer = document.getElementById("modal-tags")
      tagsContainer.innerHTML = ""
      project.tags.forEach((tag) => {
        const tagElement = document.createElement("span")
        tagElement.className = "tag"
        tagElement.textContent = tag
        tagsContainer.appendChild(tagElement)
      })

      // Show modal
      modal.style.display = "block"
      document.body.style.overflow = "hidden"
    }
  })
})

// Close modal functionality
modalClose.addEventListener("click", closeModal)
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal()
  }
})

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") {
    closeModal()
  }
})

function closeModal() {
  modal.style.display = "none"
  document.body.style.overflow = "auto"
}

// Contact form validation and submission
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  // Get form elements
  const nameInput = document.getElementById("name")
  const emailInput = document.getElementById("email")
  const messageInput = document.getElementById("message")
  const submitButton = contactForm.querySelector(".form__submit")

  // Clear previous errors
  clearFormErrors()

  // Validate form
  let isValid = true

  if (!nameInput.value.trim()) {
    showFormError("name", "Name is required")
    isValid = false
  }

  if (!emailInput.value.trim()) {
    showFormError("email", "Email is required")
    isValid = false
  } else if (!isValidEmail(emailInput.value)) {
    showFormError("email", "Please enter a valid email address")
    isValid = false
  }

  if (!messageInput.value.trim()) {
    showFormError("message", "Message is required")
    isValid = false
  } else if (messageInput.value.trim().length < 10) {
    showFormError("message", "Message must be at least 10 characters long")
    isValid = false
  }

  if (!isValid) return

  // Show loading state
  submitButton.classList.add("loading")
  submitButton.disabled = true

  try {
    // Simulate form submission (replace with actual form submission logic)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Show success message
    showSuccessMessage("Thank you! Your message has been sent successfully.")

    // Reset form
    contactForm.reset()
  } catch (error) {
    showFormError("general", "Something went wrong. Please try again.")
  } finally {
    // Remove loading state
    submitButton.classList.remove("loading")
    submitButton.disabled = false
  }
})

// Form validation helpers
function showFormError(fieldName, message) {
  const errorElement = document.getElementById(`${fieldName}-error`)
  if (errorElement) {
    errorElement.textContent = message
  }
}

function clearFormErrors() {
  const errorElements = document.querySelectorAll(".form__error")
  errorElements.forEach((element) => {
    element.textContent = ""
  })
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showSuccessMessage(message) {
  // Create success message element
  const successDiv = document.createElement("div")
  successDiv.className = "success-message"
  successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--accent-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `
  successDiv.textContent = message

  document.body.appendChild(successDiv)

  // Remove success message after 5 seconds
  setTimeout(() => {
    successDiv.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => {
      document.body.removeChild(successDiv)
    }, 300)
  }, 5000)
}

// Add CSS for success message animations
const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease forwards"
    }
  })
}, observerOptions)

// Observe elements for scroll animations
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".project__card, .skill__item, .about__image, .about__text")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    observer.observe(el)
  })
})

// Smooth scroll to top functionality (optional)
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Add scroll to top button (optional enhancement)
const scrollTopButton = document.createElement("button")
scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>'
scrollTopButton.className = "scroll-top-btn"
scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background-color: var(--accent-color);
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`

document.body.appendChild(scrollTopButton)

scrollTopButton.addEventListener("click", scrollToTop)

// Show/hide scroll to top button
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollTopButton.style.opacity = "1"
    scrollTopButton.style.visibility = "visible"
  } else {
    scrollTopButton.style.opacity = "0"
    scrollTopButton.style.visibility = "hidden"
  }
})
