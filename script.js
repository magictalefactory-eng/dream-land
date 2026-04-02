/* ============================================================
   DEAL LAND REAL ESTATE — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------------------------------------------
     1. MOBILE NAVIGATION TOGGLE
  ---------------------------------------------------------- */
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('navLinks');

  // Build mobile nav dynamically from desktop nav
  const mobileNav = document.createElement('ul');
  mobileNav.id = 'mobileNav';
  navLinks.querySelectorAll('li').forEach(function (li) {
    const clone = li.cloneNode(true);
    mobileNav.appendChild(clone);
  });
  document.querySelector('nav').insertAdjacentElement('afterend', mobileNav);

  hamburger.addEventListener('click', function () {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile nav when a link is clicked
  mobileNav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on click outside
  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });


  /* ----------------------------------------------------------
     2. LISTINGS FILTER
  ---------------------------------------------------------- */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const listingCards = document.querySelectorAll('.listing-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active state
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      listingCards.forEach(function (card) {
        const type = card.getAttribute('data-type') || '';
        if (filter === 'all' || type.includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  /* ----------------------------------------------------------
     3. INQUIRY FORM SUBMIT
  ---------------------------------------------------------- */
  const form = document.getElementById('inquiryForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = form.querySelector('#fname');
      if (!nameInput.value.trim()) {
        nameInput.focus();
        nameInput.style.borderColor = '#C0392B';
        setTimeout(function () {
          nameInput.style.borderColor = '';
        }, 2000);
        return;
      }

      const btn = form.querySelector('.form-submit');
      const original = btn.textContent;
      btn.textContent = '✓ Inquiry Sent! We will contact you within 24 hours.';
      btn.style.background = 'linear-gradient(135deg, #1A3C34, #234D42)';
      btn.style.color = '#C8A84B';
      btn.disabled = true;

      setTimeout(function () {
        form.reset();
        btn.textContent = original;
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
      }, 4000);
    });
  }


  /* ----------------------------------------------------------
     4. MAP BUTTON
  ---------------------------------------------------------- */
  const mapBtn = document.getElementById('mapBtn');
  if (mapBtn) {
    function openMap() {
      window.open(
        'https://maps.google.com/?q=Bahria+Town+Lahore+Sector+C+Commercial+Zone',
        '_blank',
        'noopener,noreferrer'
      );
    }
    mapBtn.addEventListener('click', openMap);
    mapBtn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openMap();
      }
    });
  }


  /* ----------------------------------------------------------
     5. SCROLL-BASED FADE-UP ANIMATIONS
  ---------------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // only animate once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback for older browsers
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }


  /* ----------------------------------------------------------
     6. NAVBAR SCROLL SHADOW
  ---------------------------------------------------------- */
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 30) {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  }, { passive: true });


  /* ----------------------------------------------------------
     7. SMOOTH SCROLL FOR ANCHOR LINKS
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 68; // nav height
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

});
