document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.menu');

  if (nav) {
    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.className = 'menu-toggle';
    toggleButton.setAttribute('aria-label', 'Ouvrir le menu');
    toggleButton.innerHTML = '<span></span><span></span><span></span>';

    nav.parentNode.insertBefore(toggleButton, nav);

    const handleToggle = () => {
      nav.classList.toggle('is-open');
      const isOpen = nav.classList.contains('is-open');
      toggleButton.setAttribute('aria-expanded', String(isOpen));
    };

    toggleButton.addEventListener('click', handleToggle);

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggleButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const animatedEls = document.querySelectorAll(
    '.section-heading, .about-panel, .skill-card, .project-card, .contact-form, .hero-content, .hero-visual'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  animatedEls.forEach((el) => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  const forms = document.querySelectorAll('form');

  forms.forEach((form) => {
    form.addEventListener('submit', () => {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = 'Votre message est prêt à être envoyé.';

      document.body.appendChild(toast);

      setTimeout(() => {
        toast.classList.add('show');
      }, 10);

      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
      }, 2200);
    });
  });

  const projectButtons = document.querySelectorAll('.project-preview-btn');

  projectButtons.forEach((button) => {
    const image = button.querySelector('img');
    const fullSrc = button.dataset.full || image?.src || '';
    if (!fullSrc) return;

    button.addEventListener('click', () => {
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';

      const content = document.createElement('div');
      content.className = 'lightbox-content';

      const closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.className = 'lightbox-close';
      closeButton.setAttribute('aria-label', 'Fermer la photo');
      closeButton.textContent = '×';

      const image = document.createElement('img');
      image.src = fullSrc;
      image.alt = button.getAttribute('aria-label') || 'Aperçu du projet';

      closeButton.addEventListener('click', () => {
        lightbox.remove();
      });

      lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
          lightbox.remove();
        }
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          lightbox.remove();
        }
      }, { once: true });

      content.appendChild(closeButton);
      content.appendChild(image);
      lightbox.appendChild(content);
      document.body.appendChild(lightbox);

      requestAnimationFrame(() => lightbox.classList.add('is-open'));
    });
  });
});
