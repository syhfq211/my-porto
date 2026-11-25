// Toast notification helper
const toastEl = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2600);
}

// Copy Discord ID
const copyDiscordBtn = document.getElementById('copyDiscordBtn');
if (copyDiscordBtn) {
  copyDiscordBtn.addEventListener('click', async () => {
    const discordId = copyDiscordBtn.dataset.discord || 'yukinasluwx';
    try {
      await navigator.clipboard.writeText(discordId);
      showToast(`Discord ID disalin: @${discordId}`);
    } catch {
      showToast('Gagal menyalin ID Discord');
    }
  });
}

// Copy Email
const copyEmailBtn = document.getElementById('copyEmailBtn');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', async () => {
    const email = copyEmailBtn.dataset.email || 'halo@syahfiq.my.id';
    try {
      await navigator.clipboard.writeText(email);
      showToast(`Email disalin: ${email}`);
    } catch {
      showToast('Gagal menyalin email');
    }
  });
}

// Live Local Time (WITA - UTC+8)
const liveTimeEl = document.getElementById('liveTime');
function updateTime() {
  if (!liveTimeEl) return;
  const now = new Date();
  const timeString = now.toLocaleTimeString('id-ID', {
    timeZone: 'Asia/Makassar',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  liveTimeEl.textContent = `${timeString} WITA`;
}
updateTime();
setInterval(updateTime, 30000);

// Sticky Navbar with blur transition on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (!navbar) return;
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// Smooth Anchor Scrolling with offset for sticky navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight - 16;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navBackdrop = document.getElementById('navBackdrop');

function toggleMenu(show) {
  const isOpen = show !== undefined ? show : !navLinks.classList.contains('active');
  navToggle.classList.toggle('active', isOpen);
  navLinks.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  if (navBackdrop) navBackdrop.classList.toggle('active', isOpen);
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  if (navBackdrop) {
    navBackdrop.addEventListener('click', () => toggleMenu(false));
  }

  // Close mobile menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      toggleMenu(false);
    }
  });
}

// Subtle Intersection Observer for smooth fade-in reveal
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -60px 0px',
  threshold: 0.12
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.content-section, .project-showcase, .status-bar, .footer-grid').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});
