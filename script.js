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
    const discordId = copyDiscordBtn.dataset.discord || 'syahfiq';
    try {
      await navigator.clipboard.writeText(discordId);
      showToast(`Discord ID disalin: @${discordId}`);
    } catch {
      showToast('Gagal menyalin ID Discord');
    }
  });
}

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
