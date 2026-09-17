/* ============================================
   STACKLY - Premium JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ========== GMAIL EMAIL VALIDATION ==========
  function isValidGmail(value) {
    return /^[A-Za-z0-9._%+\-]+@gmail\.com$/i.test(String(value || '').trim());
  }
  function showFieldError(field, message) {
    field.classList.add('input-error');
    const nlHost = field.closest('.newsletter-form') && field.closest('.newsletter-form').parentElement;
    const host = field.closest('.auth-field-group, .form-group') || nlHost || field.parentElement;
    let msgEl = host.querySelector(':scope > .field-error');
    if (!msgEl) {
      msgEl = document.createElement('small');
      msgEl.className = 'field-error';
      host.appendChild(msgEl);
    }
    msgEl.textContent = '⚠ ' + message;
  }
  function clearFieldError(field) {
    field.classList.remove('input-error');
    const nlHost = field.closest('.newsletter-form') && field.closest('.newsletter-form').parentElement;
    const host = field.closest('.auth-field-group, .form-group') || nlHost;
    if (host) {
      const msgEl = host.querySelector(':scope > .field-error');
      if (msgEl) msgEl.remove();
    }
  }

  // ========== PAGE LOADER ==========
  const loader = document.querySelector('.loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => { loader.classList.add('hidden'); }, 1200);
    });
    setTimeout(() => { loader.classList.add('hidden'); }, 4000);
  }

  // ========== CUSTOM CURSOR ==========
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  if (cursorDot && cursorRing && window.innerWidth > 768) {
    let mx = 0, my = 0;
    let ringX = 0, ringY = 0;
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursorDot.style.left = mx + 'px';
      cursorDot.style.top = my + 'px';
    });
    function animateCursor() {
      ringX += (mx - ringX) * 0.12;
      ringY += (my - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .car-card, .service-card, .category-card, .team-card, .finance-card, .blog-card, .faq-question').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
    });
  } else {
    if (cursorDot) cursorDot.style.display = 'none';
    if (cursorRing) cursorRing.style.display = 'none';
  }

  // ========== NAVIGATION ==========
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ========== SCROLL REVEAL ==========
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  // ========== COUNTER ANIMATION ==========
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (counters.length) {
    let counterStarted = false;
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counterStarted) {
          counterStarted = true;
          counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 2500;
            const startTime = performance.now();

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.floor(eased * target);
              counter.textContent = current.toLocaleString() + suffix;
              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target.toLocaleString() + suffix;
              }
            }
            requestAnimationFrame(updateCounter);
          });
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c.closest('.stat-item') || c));
  }

  // ========== SKILL BARS ==========
  const skillFills = document.querySelectorAll('.skill-fill');
  if (skillFills.length) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.5 });
    skillFills.forEach(el => skillObserver.observe(el));
  }

  // ========== TESTIMONIAL SLIDER ==========
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  if (slides.length) {
    let current = 0;
    let autoInterval;

    function showSlide(index) {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      current = index;
    }

    function nextSlide() {
      showSlide((current + 1) % slides.length);
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showSlide(i);
        clearInterval(autoInterval);
        autoInterval = setInterval(nextSlide, 5000);
      });
    });

    autoInterval = setInterval(nextSlide, 5000);
  }

  // ========== FAQ ACCORDION ==========
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ========== BACK TO TOP ==========
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========== FAVORITE TOGGLE ==========
  document.querySelectorAll('.blog-fav').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.classList.toggle('liked');
      const icon = btn.querySelector('i');
      if (btn.classList.contains('liked')) {
        icon.className = 'fas fa-heart';
      } else {
        icon.className = 'far fa-heart';
      }
    });
  });

  // ========== FILTER BAR (Blog page) ==========
  const filterForm = document.querySelector('.filter-bar');
  if (filterForm) {
    const filterSelects = filterForm.querySelectorAll('.filter-select');
    const typeSel = filterSelects[0];
    const brandSel = filterSelects[1];
    const priceSel = filterSelects[2];
    const searchInput = filterForm.querySelector('.filter-search input');
    const cards = document.querySelectorAll('.blog-card');

    const matchPrice = (value, range) => {
      if (!range) return true;
      const n = parseFloat(value);
      if (isNaN(n)) return true;
      switch (range) {
        case 'Under $50K': return n < 50000;
        case '$50K - $100K': return n >= 50000 && n < 100000;
        case '$100K - $200K': return n >= 100000 && n < 200000;
        case 'Over $200K': return n >= 200000;
        default: return true;
      }
    };

    const applyFilter = () => {
      const type = typeSel ? typeSel.value.toLowerCase() : '';
      const brand = brandSel ? brandSel.value.toLowerCase() : '';
      const price = priceSel ? priceSel.value : '';
      const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

      cards.forEach(card => {
        const cardType = (card.dataset.type || '').toLowerCase();
        const cardBrand = (card.dataset.brand || '').toLowerCase();
        const matches =
          (!type || cardType === type) &&
          (!brand || cardBrand === brand) &&
          matchPrice(card.dataset.price, price) &&
          (!query || card.textContent.toLowerCase().includes(query));
        card.style.display = matches ? '' : 'none';
      });
    };

    filterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      applyFilter();
    });
    filterSelects.forEach(sel => sel.addEventListener('change', applyFilter));
    if (searchInput) searchInput.addEventListener('input', applyFilter);
  }

  // ========== CONTACT FORM ==========
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let firstError = null;
      contactForm.querySelectorAll('input[required], textarea[required]').forEach(field => {
        const value = String(field.value || '').trim();
        let msg = '';
        if (!value) {
          msg = 'This field is required.';
        } else if (field.type === 'email' && !isValidGmail(value)) {
          msg = 'Email must be a valid Gmail address ending with @gmail.com.';
        } else if (field.type === 'tel' && !/^[0-9+\-\s()]{10,15}$/.test(value)) {
          msg = 'Please enter a valid phone number.';
        }
        if (msg) {
          showFieldError(field, msg);
          if (!firstError) firstError = field;
        }
        field.addEventListener('input', () => clearFieldError(field));
      });
      if (firstError) { firstError.focus(); return; }
      window.location.href = '404.html';
    });
  }

  // ========== NEWSLETTER FORM ==========
  const nlForm = document.querySelector('.newsletter-form');
  if (nlForm) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = nlForm.querySelector('input');
      if (!input) return;
      const value = String(input.value || '').trim();
      if (!value) {
        showFieldError(input, 'Please enter your email address.');
        input.focus();
        return;
      }
      if (!isValidGmail(value)) {
        showFieldError(input, 'Please enter a valid @gmail.com address.');
        input.focus();
        return;
      }
      input.addEventListener('input', () => clearFieldError(input));
      window.location.href = '404.html';
    });
  }

  // ========== PARALLAX ON SCROLL ==========
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (parallaxElements.length) {
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  }

  // ========== SMOOTH ANCHOR SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ========== ANIMATED GLOW CURSOR ON SECTION BACKGROUNDS ==========
  document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      section.style.setProperty('--mx', x + '%');
      section.style.setProperty('--my', y + '%');
    });
  });

  // ========== TYPING EFFECT (if present) ==========
  const typingEl = document.querySelector('.typing-text');
  if (typingEl) {
    const words = JSON.parse(typingEl.getAttribute('data-words') || '[]');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
      if (!words.length) return;
      const current = words[wordIndex];
      if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? 60 : 120;
      if (!isDeleting && charIndex === current.length) {
        delay = 2500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 500;
      }
      setTimeout(typeLoop, delay);
    }
    typeLoop();
  }

  // ========== AUTH: PASSWORD TOGGLE ==========
  document.querySelectorAll('.auth-password-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.auth-field-group').querySelector('.auth-input');
      if (!input) return;
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.querySelector('i').className = show ? 'far fa-eye-slash' : 'far fa-eye';
    });
  });

  // ========== AUTH: PASSWORD STRENGTH ==========
  const strengthMeter = document.querySelector('.auth-strength-meter');
  const strengthLabel = document.querySelector('.auth-strength-label span');
  const authPassword = document.getElementById('signupPassword');
  if (strengthMeter && authPassword) {
    const bars = strengthMeter.querySelectorAll('.auth-strength-bar');
    const strengthLabels = ['Password Strength', 'Weak', 'Fair', 'Good', 'Strong'];
    const strengthColors = ['', 'weak', 'fair', 'good', 'strong'];

    authPassword.addEventListener('input', () => {
      const value = authPassword.value;
      let score = 0;
      if (value.length >= 8) score++;
      if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
      if (/[0-9]/.test(value)) score++;
      if (/[^A-Za-z0-9]/.test(value)) score++;

      bars.forEach((bar, i) => {
        bar.classList.toggle('active', i < score);
      });
      if (strengthLabel) {
        strengthLabel.textContent = value ? strengthLabels[score] : strengthLabels[0];
        strengthLabel.className = value ? strengthColors[score] : '';
      }
    });
  }

  // ========== AUTH: ROLE TOGGLE (Customer / Admin) ==========
  document.querySelectorAll('.auth-role').forEach(toggle => {
    const buttons = toggle.querySelectorAll('.auth-role-btn');
    const slider = toggle.querySelector('.auth-role-slider');
    const card = toggle.closest('.auth-card');
    const subtitle = card ? card.querySelector('.auth-subtitle') : null;
    const isSignup = !!document.getElementById('signupFirstName');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (slider) slider.style.transform = btn.dataset.role === 'admin' ? 'translateX(100%)' : 'translateX(0)';

        if (toggle.id === 'signinRole') {
          const form = card.querySelector('.auth-form');
          if (form) form.setAttribute('data-role', btn.dataset.role);
          if (subtitle) {
            subtitle.textContent = btn.dataset.role === 'admin'
              ? 'Administrator access to the Stackly dashboard.'
              : 'Enter your credentials to access your account.';
          }
        }

        if (toggle.id === 'signupRole' && subtitle) {
          subtitle.textContent = btn.dataset.role === 'admin'
            ? 'Register to the Stackly admin console.'
            : 'Join the Stackly family in less than a minute.';
        }
      });
    });
  });

  // ========== AUTH: FORM SUBMIT (demo) ==========
  document.querySelectorAll('.auth-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const mailField = form.querySelector('input[type="email"]');
      if (mailField && !isValidGmail(mailField.value)) {
        showFieldError(mailField, 'Email must be a valid Gmail address ending with @gmail.com.');
        mailField.focus();
        return;
      }
      if (mailField) mailField.addEventListener('input', () => clearFieldError(mailField));
      const submitBtn = form.querySelector('.auth-submit');
      const successMsg = form.querySelector('.form-success');
      const isSignup = !!document.getElementById('signupFirstName');

      if (isSignup) {
        const password = document.getElementById('signupPassword').value;
        const confirm = document.getElementById('signupConfirm').value;
        const terms = document.getElementById('signupTerms').checked;
        if (password !== confirm) {
          document.getElementById('signupConfirm').style.borderColor = '#ff4757';
          document.getElementById('signupConfirm').focus();
          return;
        }
        if (!terms) return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing...';
      if (successMsg) successMsg.classList.add('show');
      const role = form.getAttribute('data-role') || 'customer';
      const mailInput = form.querySelector('input[type="email"]');
      const email = mailInput ? mailInput.value.trim() : '';
      if (email) {
        localStorage.setItem('stacklyUser', JSON.stringify({ email, role }));
      }
      const destination = role === 'admin' ? 'admin-dashboard.html' : 'customer-dashboard.html';
      setTimeout(() => {
        window.location.href = destination;
      }, 1400);
    });
  });

  // ========== AUTH: SOCIAL BUTTONS ==========
  document.querySelectorAll('.auth-social').forEach(btn => {
    btn.addEventListener('click', () => {
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Connecting...';
      setTimeout(() => {
        btn.innerHTML = original;
        window.location.href = '404.html';
      }, 900);
    });
  });

  // ========== DASHBOARD: TAB SWITCHING ==========
  const sidebar = document.getElementById('dashSidebar');
  const overlay = document.getElementById('dashOverlay');
  const sections = document.querySelectorAll('.dash-section');
  const navItems = document.querySelectorAll('.dash-nav-item[data-tab]');

  function showSection(tabId, activateNav = true) {
    if (!tabId) return;
    sections.forEach(sec => sec.classList.toggle('active', sec.id === tabId));
    if (activateNav) {
      navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.tab === tabId);
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openSidebar() {
    if (!sidebar) return;
    sidebar.classList.add('open');
    if (overlay) overlay.classList.add('show');
    document.documentElement.classList.add('dash-nav-open');
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
    document.documentElement.classList.remove('dash-nav-open');
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      showSection(item.dataset.tab);
      closeSidebar();
    });
  });

  document.querySelectorAll('[data-goto]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-goto');
      closeSidebar();
      showSection(target);
      const dashed = document.querySelector('#dashSidebar');
      highlightedNav(dashed, target);
    });
  });

  function highlightedNav(ctx, tabId) {
    ctx.querySelectorAll('.dash-nav-item[data-tab]').forEach(item => {
      item.classList.toggle('active', item.dataset.tab === tabId);
    });
  }

  // ========== DASHBOARD: MOBILE SIDEBAR ==========
  const menuToggle = document.querySelector('.dash-menu-toggle');
  const sidebarClose = document.querySelector('.dash-sidebar-close');
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', openSidebar);
  }
  if (sidebarClose && sidebar) {
    sidebarClose.addEventListener('click', closeSidebar);
  }
  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  // ========== DASHBOARD: DROPDOWNS ==========
  const notif = document.getElementById('dashNotif');
  const userDrop = document.getElementById('dashUser');
  if (notif) {
    notif.querySelector('.dash-icon-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      notif.querySelector('.dash-dropdown').classList.toggle('open');
      if (userDrop) userDrop.querySelector('.dash-dropdown').classList.remove('open');
    });
  }
  if (userDrop) {
    userDrop.querySelector('.dash-user-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      userDrop.querySelector('.dash-dropdown').classList.toggle('open');
      if (notif) notif.querySelector('.dash-dropdown').classList.remove('open');
    });
  }
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.dash-dropdown.open').forEach(dd => {
      if (!dd.parentElement.contains(e.target)) dd.classList.remove('open');
    });
  });

  // ========== DASHBOARD: NOTIFICATION ITEMS -> 404 ==========
  document.querySelectorAll('.dash-notif-item').forEach(item => {
    item.addEventListener('click', () => {
      window.location.href = '404.html';
    });
  });

  // ========== DASHBOARD: SEARCH / FILTER ==========
  const dashSearch = document.getElementById('dashSearchInput');
  if (dashSearch) {
    dashSearch.addEventListener('input', () => {
      const q = dashSearch.value.toLowerCase();
      const active = document.querySelector('.dash-section.active');
      if (!active) return;
      active.querySelectorAll('tbody tr').forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  // ========== SEARCH BARS -> 404 ON ENTER ==========
  document.querySelectorAll('.dash-search input').forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        window.location.href = '404.html';
      }
    });
  });

  // ========== DASHBOARD: FAVORITE HEARTS ==========
  document.querySelectorAll('.dash-heart').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('liked');
      const icon = btn.querySelector('i');
      icon.className = btn.classList.contains('liked') ? 'fas fa-heart' : 'far fa-heart';
    });
  });

  // ========== DASHBOARD: BOOKING APP/REJECT ==========
  document.querySelectorAll('.dash-approve').forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('tr');
      const status = row.querySelector('.status');
      status.className = 'status status-green';
      status.textContent = 'Confirmed';
      const actions = row.querySelector('.dash-row-actions');
      actions.innerHTML = '<button class="dash-table-btn">Reschedule</button>';
    });
  });
  document.querySelectorAll('.dash-reject').forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('tr');
      const status = row.querySelector('.status');
      status.className = 'status status-danger';
      status.textContent = 'Declined';
      const actions = row.querySelector('.dash-row-actions');
      actions.innerHTML = '<span class="status status-gray">Closed</span>';
    });
  });

  // ========== DASHBOARD: CHAT ==========
  const chatInput = document.querySelector('.dash-chat-input');
  if (chatInput) {
    chatInput.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = chatInput.querySelector('input');
      if (!input) return;
      if (!input.value.trim()) {
        showFieldError(input, 'Please type a message.');
        input.focus();
        return;
      }
      input.addEventListener('input', () => clearFieldError(input));
      window.location.href = '404.html';
    });
  }

  // ========== DASHBOARD: FORMS (demo) ==========
  document.querySelectorAll('.dash-profile-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let firstError = null;
      form.querySelectorAll('input').forEach(field => {
        if (['checkbox', 'radio', 'hidden', 'submit', 'button'].indexOf(field.type) !== -1) return;
        const value = String(field.value || '').trim();
        let msg = '';
        if (!value) {
          msg = 'This field is required.';
        } else if (field.type === 'email' && !isValidGmail(value)) {
          msg = 'Email must be a valid Gmail address ending with @gmail.com.';
        } else if (field.type === 'tel' && !/^[0-9+\-\s()]{10,15}$/.test(value)) {
          msg = 'Please enter a valid phone number.';
        } else if (field.type === 'password' && value.length < 6) {
          msg = 'Password must be at least 6 characters.';
        }
        if (msg) {
          showFieldError(field, msg);
          if (!firstError) firstError = field;
        }
        field.addEventListener('input', () => clearFieldError(field));
      });
      const pwds = form.querySelectorAll('input[type="password"]');
      if (!firstError && pwds.length >= 3 && pwds[1].value !== pwds[2].value) {
        showFieldError(pwds[2], 'Passwords do not match.');
        firstError = pwds[2];
      }
      if (firstError) { firstError.focus(); return; }
      window.location.href = '404.html';
    });
  });

  // ========== DASHBOARD: SIGNED-IN IDENTITY ==========
  const signedUser = JSON.parse(localStorage.getItem('stacklyUser') || 'null');
  if (signedUser && signedUser.email) {
    const email = signedUser.email;
    const local = email.split('@')[0].replace(/[._%+\-]+/g, ' ').trim();
    const displayName = local.replace(/\b\w/g, c => c.toUpperCase());

    document.querySelectorAll('.dash-user-drop').forEach(drop => {
      const line = document.createElement('div');
      line.className = 'dash-user-email';
      line.innerHTML = '<i class="fas fa-envelope"></i> ' + email;
      if (!drop.querySelector('.dash-user-email')) drop.insertBefore(line, drop.firstChild);
    });

    document.querySelectorAll('.dash-user-name').forEach(el => { el.textContent = email; });
    document.querySelectorAll('.dash-sidebar-user-name').forEach(el => { el.textContent = email; });

    const welcomeName = document.querySelector('.dash-banner h1 .gold-text');
    if (welcomeName) welcomeName.textContent = displayName;

  const firstName = document.querySelector('.dash-profile-form input[aria-label="First name"]');
  if (firstName) firstName.value = displayName.split(' ')[0];
  const lastName = document.querySelector('.dash-profile-form input[aria-label="Last name"]');
  if (lastName) lastName.value = '';
  const profileEmail = document.querySelector('.dash-profile-form input[aria-label="Email"]');
  if (profileEmail) profileEmail.value = email;
  }
});
