/**
 * STACKLY - FINANCE CONSULTING
 * Interactive Main JavaScript File
 */




(function initFinancePreloader() {
  const runPreloader = () => {
    const preloader = document.getElementById('financePreloader');
    if (!preloader) return;

    
    document.body.classList.add('preloader-active');
    document.documentElement.classList.add('preloader-active');

    const percentEl = document.getElementById('preloaderPercent');
    const barEl = document.getElementById('preloaderProgressFill');
    const statusEl = document.getElementById('preloaderStatusText');

    const milestones = [
      { max: 28, text: 'Connecting Secure Ledger...' },
      { max: 58, text: 'Analyzing Portfolio Metrics...' },
      { max: 88, text: 'Synchronizing Market Insights...' },
      { max: 100, text: 'Stackly Advisory Ready' }
    ];

    const startTime = performance.now();
    
    const targetDuration = 1150; 
    let animationFrameId;
    let finished = false;

    const finishPreloader = () => {
      if (finished) return;
      finished = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      if (percentEl) percentEl.textContent = '100%';
      if (barEl) barEl.style.width = '100%';
      if (statusEl) statusEl.textContent = 'Stackly Advisory Ready';

      setTimeout(() => {
        preloader.classList.add('preloader-hidden');
        document.body.classList.remove('preloader-active');
        document.documentElement.classList.remove('preloader-active');

        setTimeout(() => {
          preloader.style.display = 'none';
          try { preloader.remove(); } catch (e) {}
        }, 400);
      }, 200);
    };

    const update = (now) => {
      if (finished) return;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / targetDuration, 1);

      
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentPercent = Math.min(Math.floor(ease * 100), 100);

      if (percentEl) percentEl.textContent = `${currentPercent}%`;
      if (barEl) barEl.style.width = `${currentPercent}%`;

      if (statusEl) {
        for (const m of milestones) {
          if (currentPercent <= m.max) {
            statusEl.textContent = m.text;
            break;
          }
        }
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(update);
      } else {
        finishPreloader();
      }
    };

    animationFrameId = requestAnimationFrame(update);

    
    setTimeout(finishPreloader, 1800);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runPreloader);
  } else {
    runPreloader();
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  
  
  
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');

  const toggleMobileMenu = (open) => {
    const shouldOpen = open !== undefined ? open : !navMenu.classList.contains('active');
    if (shouldOpen) {
      mobileToggle?.classList.add('active');
      navMenu?.classList.add('active');
      mobileOverlay?.classList.add('active');
      document.body.classList.add('menu-open');
      document.documentElement.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
    } else {
      mobileToggle?.classList.remove('active');
      navMenu?.classList.remove('active');
      mobileOverlay?.classList.remove('active');
      document.body.classList.remove('menu-open');
      document.documentElement.classList.remove('menu-open');
      document.body.style.overflow = '';
    }
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => toggleMobileMenu());
  }

  document.querySelectorAll('#mobileCloseBtn, .mobile-nav-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMobileMenu(false);
    });
  });

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => toggleMobileMenu(false));
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        toggleMobileMenu(false);
      }
    });
  });

  
  document.querySelectorAll('.mobile-nav-logo, .btn-mobile-login').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        toggleMobileMenu(false);
      }
    });
  });

  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
      toggleMobileMenu(false);
    }
  });

  
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && (navMenu?.classList.contains('active') || mobileOverlay?.classList.contains('active'))) {
      toggleMobileMenu(false);
    }
  });


  
  
  
  const revealElements = document.querySelectorAll('[data-reveal], [data-slide], [data-scale]');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }


  
  
  
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const animateNumber = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 2000; 
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      
      const progress = 1 - Math.pow(1 - (frame / totalFrames), 3);
      const current = Math.round(target * progress);

      element.textContent = current.toLocaleString();

      if (frame >= totalFrames) {
        element.textContent = target.toLocaleString();
        clearInterval(counter);
      }
    }, frameRate);
  };

  const statsSection = document.querySelector('.stats-bar');
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          statNumbers.forEach(stat => animateNumber(stat));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }


  
  
  
  const slider = document.querySelector('.testimonials-slider');
  const cards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const dotsContainer = document.querySelector('.slider-dots');

  if (slider && cards.length > 0) {
    let currentIndex = 0;
    let autoplayTimer = null;
    let cardsPerView = 3;

    const updateCardsPerView = () => {
      if (window.innerWidth <= 640) {
        cardsPerView = 1;
      } else if (window.innerWidth <= 1080) {
        cardsPerView = 2;
      } else {
        cardsPerView = 3;
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);

    const maxIndex = () => Math.max(0, cards.length - cardsPerView);

    
    const totalPages = Math.ceil(cards.length / cardsPerView);
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i <= maxIndex(); i++) {
        const dot = document.createElement('span');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
          goToSlide(i);
          resetAutoplay();
        });
        dotsContainer.appendChild(dot);
      }
    }

    const updateDots = () => {
      const dots = document.querySelectorAll('.slider-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    };

    const goToSlide = (index) => {
      const max = maxIndex();
      if (index < 0) {
        currentIndex = max;
      } else if (index > max) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      
      const cardWidthPercent = 100 / cardsPerView;
      const gapOffset = 24 / cardsPerView; 
      const translateVal = currentIndex * (cardWidthPercent);

      slider.style.transform = `translateX(-${translateVal}%)`;
      updateDots();
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        resetAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        resetAutoplay();
      });
    }

    
    const startAutoplay = () => {
      autoplayTimer = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 5000);
    };

    const stopAutoplay = () => {
      if (autoplayTimer) clearInterval(autoplayTimer);
    };

    const resetAutoplay = () => {
      stopAutoplay();
      startAutoplay();
    };

    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);

    
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoplay();
    }, { passive: true });

    const handleSwipe = () => {
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) > 40) {
        if (swipeDistance < 0) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(currentIndex - 1);
        }
      }
    };

    startAutoplay();
  }


  
  
  
  const pricingTabs = document.querySelectorAll('.pricing-tab-btn');
  const priceDisplay = document.querySelector('.pricing-amount .price');
  const planDesc = document.querySelector('.pricing-plan-desc');
  const planFeaturesList = document.querySelector('.pricing-features');

  const pricingData = {
    'starter': {
      price: '$34',
      period: '/Month',
      desc: 'Each package is designed to address specific business needs, providing clients with tailored solutions for success:',
      features: [
        'Comprehensive business analysis',
        'Customized strategic planning',
        'One-on-one consultation sessions',
        'Quarterly progress reviews',
        'Email support'
      ]
    },
    'basic': {
      price: '$59',
      period: '/Month',
      desc: 'Each package is designed to address specific business needs, providing clients with tailored solutions for success:',
      features: [
        'Comprehensive business analysis',
        'Customized strategic planning',
        'Bi-weekly consultation sessions',
        'Monthly progress reviews',
        'Priority email & chat support'
      ]
    },
    'professional': {
      price: '$99',
      period: '/Month',
      desc: 'Each package is designed to address specific business needs, providing clients with tailored solutions for success:',
      features: [
        'Full enterprise diagnostic analysis',
        'Customized strategic & financial planning',
        'Weekly one-on-one consultation sessions',
        'Bi-weekly progress reviews & audits',
        '24/7 dedicated advisor desk support'
      ]
    },
    'enterprise': {
      price: '$199',
      period: '/Month',
      desc: 'Each package is designed to address specific business needs, providing clients with tailored solutions for success:',
      features: [
        'Comprehensive global market intelligence',
        'Executive board strategic advisory',
        'Unlimited one-on-one consultation sessions',
        'Continuous performance & risk reviews',
        'Dedicated senior consulting partner'
      ]
    }
  };

  if (pricingTabs.length > 0) {
    pricingTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        pricingTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const tier = tab.getAttribute('data-tier') || 'starter';
        const data = pricingData[tier];

        if (data && priceDisplay && planDesc) {
          
          priceDisplay.style.opacity = '0';
          planDesc.style.opacity = '0';

          setTimeout(() => {
            priceDisplay.textContent = data.price;
            planDesc.textContent = data.desc;

            if (planFeaturesList && data.features) {
              planFeaturesList.innerHTML = data.features.map(f => `
                <li>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="8 12 11 15 16 9"></polyline>
                  </svg>
                  ${f}
                </li>
              `).join('');
            }

            priceDisplay.style.opacity = '1';
            planDesc.style.opacity = '1';
          }, 150);
        }
      });
    });
  }


  
  
  
  const officeItems = document.querySelectorAll('.office-item');

  if (officeItems.length > 0) {
    officeItems.forEach(item => {
      item.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        officeItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }


  
  
  
  const heroTypingEl = document.getElementById('heroTypingText');
  if (heroTypingEl) {
    const textPhrases = [
      'Strategic Insights',
      'Financial Growth',
      'Market Foresight',
      'Scalable Roadmaps'
    ];
    let phraseIdx = 0;
    let charIdx = textPhrases[0].length;
    let isDeleting = true;
    let typeSpeed = 120;

    const runTypeAnimation = () => {
      const currentPhrase = textPhrases[phraseIdx];

      if (isDeleting) {
        charIdx--;
        heroTypingEl.textContent = currentPhrase.substring(0, charIdx) || '\u00A0';
        typeSpeed = 60;
      } else {
        charIdx++;
        heroTypingEl.textContent = currentPhrase.substring(0, charIdx);
        typeSpeed = 110;
      }

      if (!isDeleting && charIdx === currentPhrase.length) {
        typeSpeed = 2400; 
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % textPhrases.length;
        typeSpeed = 450; 
      }

      setTimeout(runTypeAnimation, typeSpeed);
    };

    
    setTimeout(runTypeAnimation, 2500);
  }


  
  
  
  const heroBgSlides = document.querySelectorAll('.hero-bg-slide');
  const heroSection = document.querySelector('.hero-section.full-cover-hero');

  if (heroBgSlides.length > 0) {
    let heroCurrentIndex = 0;
    let heroTimer = null;

    const showHeroSlide = (idx) => {
      if (idx < 0) {
        heroCurrentIndex = heroBgSlides.length - 1;
      } else if (idx >= heroBgSlides.length) {
        heroCurrentIndex = 0;
      } else {
        heroCurrentIndex = idx;
      }

      heroBgSlides.forEach((slide, sIdx) => {
        slide.classList.toggle('active', sIdx === heroCurrentIndex);
      });
    };

    const startHeroAutoplay = () => {
      stopHeroAutoplay();
      heroTimer = setInterval(() => {
        showHeroSlide(heroCurrentIndex + 1);
      }, 4000); 
    };

    const stopHeroAutoplay = () => {
      if (heroTimer) clearInterval(heroTimer);
    };

    
    if (heroSection) {
      let touchStartX = 0;
      let touchEndX = 0;
      heroSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      heroSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 40) {
          if (diff < 0) {
            showHeroSlide(heroCurrentIndex + 1);
          } else {
            showHeroSlide(heroCurrentIndex - 1);
          }
          startHeroAutoplay();
        }
      }, { passive: true });
    }

    startHeroAutoplay();
  }


  
  
  
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const header = item.querySelector('.faq-header');
      if (header) {
        header.addEventListener('click', () => {
          const isCurrentlyActive = item.classList.contains('active');
          
          
          const parentGroup = item.closest('.faq-accordion-group');
          if (parentGroup) {
            parentGroup.querySelectorAll('.faq-item').forEach(sibling => {
              if (sibling !== item) sibling.classList.remove('active');
            });
          }

          item.classList.toggle('active', !isCurrentlyActive);
        });
      }
    });
  }


  
  
  
  const initCustomDropdown = (wrapId, selectId, triggerId) => {
    const wrap = document.getElementById(wrapId);
    const select = document.getElementById(selectId);
    const trigger = document.getElementById(triggerId);

    if (!wrap || !trigger || !select) return;

    const valueDisplay = wrap.querySelector('.custom-select-value');
    const options = wrap.querySelectorAll('.custom-select-option');

    
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = wrap.classList.contains('is-open');

      
      document.querySelectorAll('.custom-select-wrap.is-open').forEach(w => {
        if (w !== wrap) {
          w.classList.remove('is-open');
          const t = w.querySelector('.custom-select-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        wrap.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        wrap.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        wrap.classList.remove('is-invalid');
      }
    });

    
    options.forEach(opt => {
      opt.addEventListener('click', () => {
        const val = opt.getAttribute('data-value') || '';
        const text = opt.textContent.trim();

        select.value = val;
        select.dispatchEvent(new Event('change', { bubbles: true }));

        if (valueDisplay) {
          valueDisplay.textContent = text;
          if (val === '') {
            valueDisplay.classList.add('is-placeholder');
          } else {
            valueDisplay.classList.remove('is-placeholder');
          }
        }

        options.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');

        wrap.classList.remove('is-open', 'is-invalid');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      });
    });

    
    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) {
        wrap.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      } else if (e.key === 'Escape') {
        wrap.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  };

  
  initCustomDropdown('industryWrap', 'industry', 'industryTrigger');
  initCustomDropdown('regServiceWrap', 'regService', 'regServiceTrigger');


  
  
  
  const contactForm = document.getElementById('contactForm');
  const industryWrap = document.getElementById('industryWrap');
  const industrySelect = document.getElementById('industry');
  const industryTrigger = document.getElementById('industryTrigger');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      
      if (industrySelect && !industrySelect.value) {
        if (industryWrap) {
          industryWrap.classList.add('is-invalid');
        }
        if (industryTrigger) {
          industryTrigger.focus();
        }
        return;
      }

      
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const sendBtn = contactForm.querySelector('.btn-send');
      if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.textContent = 'REDIRECTING...';
        sendBtn.style.opacity = '0.85';
      }

      
      setTimeout(() => {
        window.location.href = '404.html';
      }, 350);

      
      setTimeout(() => {
        resetAllSubmitButtons();
      }, 1000);
    });

    
    contactForm.addEventListener('reset', () => {
      if (industryWrap) {
        setTimeout(() => {
          const valEl = industryWrap.querySelector('.custom-select-value');
          const opts = industryWrap.querySelectorAll('.custom-select-option');
          if (industrySelect) industrySelect.value = '';
          if (valEl) {
            valEl.textContent = 'Industry* Please select';
            valEl.classList.add('is-placeholder');
          }
          opts.forEach(o => {
            o.classList.toggle('selected', o.getAttribute('data-value') === '');
          });
          industryWrap.classList.remove('is-invalid', 'is-open');
        }, 0);
      }
    });
  }


  
  
  
  const regServiceWrap = document.getElementById('regServiceWrap');
  const regService = document.getElementById('regService');
  const regServiceTrigger = document.getElementById('regServiceTrigger');
  const blogInquiryForm = document.getElementById('blogInquiryForm');

  if (blogInquiryForm) {
    
    blogInquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      
      if (regService && !regService.value) {
        if (regServiceWrap) {
          regServiceWrap.classList.add('is-invalid');
        }
        if (regServiceTrigger) {
          regServiceTrigger.focus();
        }
        return;
      }

      
      if (!blogInquiryForm.checkValidity()) {
        blogInquiryForm.reportValidity();
        return;
      }

      const regBtn = blogInquiryForm.querySelector('.btn-register');
      if (regBtn) {
        regBtn.disabled = true;
        regBtn.textContent = 'REDIRECTING...';
        regBtn.style.opacity = '0.85';
      }

      
      setTimeout(() => {
        window.location.href = '404.html';
      }, 350);

      
      setTimeout(() => {
        resetAllSubmitButtons();
      }, 1000);
    });

    
    blogInquiryForm.addEventListener('reset', () => {
      if (regServiceWrap) {
        setTimeout(() => {
          const regServiceValue = regServiceWrap.querySelector('.custom-select-value');
          const regServiceOptions = regServiceWrap.querySelectorAll('.custom-select-option');
          if (regService) regService.value = '';
          if (regServiceValue) {
            regServiceValue.textContent = 'Select Services';
            regServiceValue.classList.add('is-placeholder');
          }
          regServiceOptions.forEach(o => {
            o.classList.toggle('selected', o.getAttribute('data-value') === '');
          });
          regServiceWrap.classList.remove('is-invalid', 'is-open');
        }, 0);
      }
    });
  }


  
  
  
  const resetAllSubmitButtons = () => {
    
    const sendBtn = document.querySelector('#contactForm .btn-send');
    if (sendBtn) {
      sendBtn.disabled = false;
      sendBtn.textContent = 'SEND';
      sendBtn.style.opacity = '';
      sendBtn.style.backgroundColor = '';
      sendBtn.style.color = '';
    }

    
    const regBtn = document.querySelector('#blogInquiryForm .btn-register');
    if (regBtn) {
      regBtn.disabled = false;
      regBtn.textContent = 'REGISTER';
      regBtn.style.opacity = '';
      regBtn.style.backgroundColor = '';
      regBtn.style.color = '';
    }

    
    const signinFormEl = document.getElementById('signinForm');
    if (signinFormEl) {
      const signinBtn = signinFormEl.querySelector('.btn-auth-submit');
      if (signinBtn) {
        signinBtn.disabled = false;
        signinBtn.textContent = 'Login';
        signinBtn.style.opacity = '';
        signinBtn.style.backgroundColor = '';
        signinBtn.style.color = '';
      }
    }

    const signupFormEl = document.getElementById('signupForm');
    if (signupFormEl) {
      const signupBtn = signupFormEl.querySelector('.btn-auth-submit');
      if (signupBtn) {
        signupBtn.disabled = false;
        signupBtn.textContent = 'Create Account';
        signupBtn.style.opacity = '';
        signupBtn.style.backgroundColor = '';
        signupBtn.style.color = '';
      }
    }
  };

  
  const freshResetAuthForms = () => {
    
    document.querySelectorAll('.auth-modal-backdrop.is-active, #signupSuccessModal.is-active, #logoutModal.is-active').forEach(m => {
      m.classList.remove('is-active');
    });

    
    resetAllSubmitButtons();

    
    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
      signinForm.reset();
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
      signupForm.reset();
    }

    
    const roleCorporate = document.getElementById('roleCorporate');
    const roleAdmin = document.getElementById('roleAdmin');
    const selectedRole = document.getElementById('selectedRole');
    if (roleCorporate && roleAdmin) {
      roleCorporate.classList.add('active');
      roleAdmin.classList.remove('active');
      if (selectedRole) selectedRole.value = 'corporate';
    }

    
    document.querySelectorAll('.auth-field.has-error, .form-input-box.has-error').forEach(box => {
      box.classList.remove('has-error');
    });
    document.querySelectorAll('.auth-error-msg, .error-msg').forEach(msg => {
      msg.textContent = '';
      msg.style.display = 'none';
    });

    
    document.querySelectorAll('.auth-input-wrap input[type="text"]').forEach(input => {
      if (input.id && input.id.toLowerCase().includes('password')) {
        input.setAttribute('type', 'password');
      }
    });
    document.querySelectorAll('.password-toggle-btn').forEach(btn => {
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      `;
      btn.setAttribute('aria-label', 'Show password');
    });
  };

  
  window.addEventListener('pageshow', (event) => {
    freshResetAuthForms();
  });

  
  window.addEventListener('pagehide', () => {
    freshResetAuthForms();
  });

  
  window.addEventListener('popstate', () => {
    freshResetAuthForms();
  });

  
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      freshResetAuthForms();
    }
  });
  window.addEventListener('focus', () => {
    freshResetAuthForms();
  });


  
  
  
  const goBackBtn = document.getElementById('goBackBtn');
  if (goBackBtn) {
    goBackBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = 'index.html';
      }
    });
  }


  
  
  
  const passwordToggles = document.querySelectorAll('.password-toggle-btn');
  passwordToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const wrap = btn.closest('.auth-input-wrap');
      const input = wrap ? wrap.querySelector('input') : null;
      if (!input) return;

      const isPassword = input.getAttribute('type') === 'password';
      input.setAttribute('type', isPassword ? 'text' : 'password');

      
      if (isPassword) {
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        `;
        btn.setAttribute('aria-label', 'Hide password');
      } else {
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        `;
        btn.setAttribute('aria-label', 'Show password');
      }
    });
  });


  
  
  
  const roleCards = document.querySelectorAll('.role-card');
  const selectedRoleInput = document.getElementById('selectedRole');
  if (roleCards.length > 0 && selectedRoleInput) {
    roleCards.forEach(card => {
      card.addEventListener('click', () => {
        roleCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const role = card.getAttribute('data-role');
        if (role) {
          selectedRoleInput.value = role;
        }
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  
  const setAuthFieldError = (fieldId, errorId, message) => {
    const field = document.getElementById(fieldId);
    const err = document.getElementById(errorId);
    if (field) field.classList.add('has-error');
    if (err) {
      err.textContent = message;
      err.style.display = 'block';
    }
  };

  const clearAuthFieldError = (fieldId, errorId) => {
    const field = document.getElementById(fieldId);
    const err = document.getElementById(errorId);
    if (field) field.classList.remove('has-error');
    if (err) {
      err.textContent = '';
      err.style.display = 'none';
    }
  };

  
  
  
  const signinForm = document.getElementById('signinForm');
  if (signinForm) {
    const emailInput = document.getElementById('signinEmail');
    const passwordInput = document.getElementById('signinPassword');
    const submitBtn = signinForm.querySelector('.btn-auth-submit');

    if (emailInput) {
      emailInput.addEventListener('input', () => {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailInput.value.trim())) {
          clearAuthFieldError('signinEmailField', 'signinEmailError');
        }
      });
    }

    if (passwordInput) {
      passwordInput.addEventListener('input', () => {
        if (passwordInput.value.length >= 6) {
          clearAuthFieldError('signinPasswordField', 'signinPasswordError');
        }
      });
    }

    signinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const emailVal = emailInput ? emailInput.value.trim() : '';
      const passVal = passwordInput ? passwordInput.value : '';
      const roleVal = selectedRoleInput ? selectedRoleInput.value : 'corporate';

      if (!emailVal) {
        setAuthFieldError('signinEmailField', 'signinEmailError', 'Please enter your corporate email address.');
        if (isValid && emailInput) emailInput.focus();
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailVal)) {
        setAuthFieldError('signinEmailField', 'signinEmailError', 'Please enter a valid email address (e.g. name@company.com).');
        if (isValid && emailInput) emailInput.focus();
        isValid = false;
      } else {
        clearAuthFieldError('signinEmailField', 'signinEmailError');
      }

      if (!passVal) {
        setAuthFieldError('signinPasswordField', 'signinPasswordError', 'Please enter your password.');
        if (isValid && passwordInput) passwordInput.focus();
        isValid = false;
      } else if (passVal.length < 6) {
        setAuthFieldError('signinPasswordField', 'signinPasswordError', 'Password must be at least 6 characters.');
        if (isValid && passwordInput) passwordInput.focus();
        isValid = false;
      } else {
        clearAuthFieldError('signinPasswordField', 'signinPasswordError');
      }

      if (!isValid) return;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Verifying Credentials...';
        submitBtn.style.opacity = '0.85';
      }

      
      localStorage.setItem('stackly_user_email', emailVal);
      localStorage.setItem('stackly_user_role', roleVal);

      
      if (!localStorage.getItem('stackly_user_name')) {
        const usernamePart = emailVal.split('@')[0].replace(/[._-]/g, ' ');
        const formattedName = usernamePart.charAt(0).toUpperCase() + usernamePart.slice(1);
        localStorage.setItem('stackly_user_name', formattedName || (roleVal === 'admin' ? 'Vignesh Moorthy' : 'Corporate Client'));
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.textContent = 'Access Granted! Redirecting...';
          submitBtn.style.backgroundColor = '#98E300';
          submitBtn.style.color = '#031F19';
        }

        setTimeout(() => {
          if (roleVal === 'admin') {
            window.location.href = 'admin-dashboard.html';
          } else {
            window.location.href = 'customer-dashboard.html';
          }
        }, 800);

        
        setTimeout(() => {
          freshResetAuthForms();
        }, 1200);
      }, 700);
    });
  }

  
  
  
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    const nameInput = document.getElementById('signupName');
    const emailInput = document.getElementById('signupEmail');
    const passInput = document.getElementById('signupPassword');
    const confirmPassInput = document.getElementById('signupConfirmPassword');
    const agreeTerms = document.getElementById('agreeTerms');
    const successModal = document.getElementById('signupSuccessModal');
    const submitBtn = signupForm.querySelector('.btn-auth-submit');

    if (nameInput) {
      nameInput.addEventListener('input', () => {
        if (nameInput.value.trim().length >= 2) {
          clearAuthFieldError('signupNameField', 'signupNameError');
        }
      });
    }

    if (emailInput) {
      emailInput.addEventListener('input', () => {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailInput.value.trim())) {
          clearAuthFieldError('signupEmailField', 'signupEmailError');
        }
      });
    }

    if (passInput) {
      passInput.addEventListener('input', () => {
        if (passInput.value.length >= 6) {
          clearAuthFieldError('signupPasswordField', 'signupPasswordError');
        }
      });
    }

    if (confirmPassInput) {
      confirmPassInput.addEventListener('input', () => {
        if (confirmPassInput.value === passInput.value) {
          clearAuthFieldError('signupConfirmPasswordField', 'signupConfirmPasswordError');
        }
      });
    }

    if (agreeTerms) {
      agreeTerms.addEventListener('change', () => {
        if (agreeTerms.checked) {
          clearAuthFieldError('termsField', 'termsError');
        }
      });
    }

    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const passVal = passInput ? passInput.value : '';
      const confirmVal = confirmPassInput ? confirmPassInput.value : '';
      const roleVal = selectedRoleInput ? selectedRoleInput.value : 'corporate';

      if (!nameVal || nameVal.length < 2) {
        setAuthFieldError('signupNameField', 'signupNameError', 'Please enter your full legal name (min. 2 characters).');
        if (isValid && nameInput) nameInput.focus();
        isValid = false;
      } else {
        clearAuthFieldError('signupNameField', 'signupNameError');
      }

      if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailVal)) {
        setAuthFieldError('signupEmailField', 'signupEmailError', 'Please enter a valid official corporate email.');
        if (isValid && emailInput) emailInput.focus();
        isValid = false;
      } else {
        clearAuthFieldError('signupEmailField', 'signupEmailError');
      }

      if (!passVal || passVal.length < 6) {
        setAuthFieldError('signupPasswordField', 'signupPasswordError', 'Password must be at least 6 characters.');
        if (isValid && passInput) passInput.focus();
        isValid = false;
      } else {
        clearAuthFieldError('signupPasswordField', 'signupPasswordError');
      }

      if (!confirmVal) {
        setAuthFieldError('signupConfirmPasswordField', 'signupConfirmPasswordError', 'Please re-enter your password to confirm.');
        if (isValid && confirmPassInput) confirmPassInput.focus();
        isValid = false;
      } else if (confirmVal !== passVal) {
        setAuthFieldError('signupConfirmPasswordField', 'signupConfirmPasswordError', 'Passwords do not match. Please verify.');
        if (isValid && confirmPassInput) confirmPassInput.focus();
        isValid = false;
      } else {
        clearAuthFieldError('signupConfirmPasswordField', 'signupConfirmPasswordError');
      }

      if (agreeTerms && !agreeTerms.checked) {
        setAuthFieldError('termsField', 'termsError', 'You must agree to the terms & policy to proceed.');
        isValid = false;
      } else {
        clearAuthFieldError('termsField', 'termsError');
      }

      if (!isValid) return;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Provisioning Account...';
        submitBtn.style.opacity = '0.85';
      }

      
      localStorage.setItem('stackly_user_name', nameVal);
      localStorage.setItem('stackly_user_email', emailVal);
      localStorage.setItem('stackly_user_role', roleVal);

      
      if (successModal) {
        successModal.classList.add('is-active');
      }

      
      setTimeout(() => {
        window.location.href = 'signin.html';
      }, 1600);

      
      setTimeout(() => {
        freshResetAuthForms();
      }, 1800);
    });
  }

  
  
  
  const initDashboards = () => {
    const storedName = localStorage.getItem('stackly_user_name');
    const storedEmail = localStorage.getItem('stackly_user_email');
    const storedRole = localStorage.getItem('stackly_user_role');

    
    if (storedName) {
      document.querySelectorAll('#dashUserName, #sideUserName, #adminUserName, #sideAdminName').forEach(el => {
        el.textContent = storedName;
      });
      const initial = storedName.trim().charAt(0).toUpperCase();
      document.querySelectorAll('#userAvatar, #adminAvatar, #sideAvatar').forEach(el => {
        el.textContent = initial;
      });
    }

    
    if (storedEmail) {
      document.querySelectorAll('#dashUserEmail, #sideUserEmail, #adminEmail, #sideAdminEmail').forEach(el => {
        el.textContent = storedEmail;
      });
    }

    
    const tabLinks = document.querySelectorAll('.dashboard-sidebar-menu a[data-tab]');
    tabLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = link.getAttribute('data-tab');
        if (!tabId) return;

        tabLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        document.querySelectorAll('.dash-tab-pane').forEach(pane => {
          pane.classList.remove('active');
        });

        const targetPane = document.getElementById(`tab-${tabId}`);
        if (targetPane) {
          targetPane.classList.add('active');
        }

        
        closeMobileDashSidebar();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    
    const dashSidebarToggle = document.getElementById('dashSidebarToggle');
    const dashSidebarDock = document.querySelector('.dash-sidebar-dock');
    const dashSidebarBackdrop = document.getElementById('dashSidebarBackdrop');

    const openMobileDashSidebar = () => {
      dashSidebarDock?.classList.add('is-open');
      dashSidebarBackdrop?.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    };

    const closeMobileDashSidebar = () => {
      dashSidebarDock?.classList.remove('is-open');
      dashSidebarBackdrop?.classList.remove('is-active');
      document.body.style.overflow = '';
    };

    dashSidebarToggle?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (dashSidebarDock?.classList.contains('is-open')) {
        closeMobileDashSidebar();
      } else {
        openMobileDashSidebar();
      }
    });

    dashSidebarBackdrop?.addEventListener('click', closeMobileDashSidebar);

    
    const dashBellBtn = document.getElementById('dashBellBtn');
    const dashNotifDropdown = document.getElementById('dashNotifDropdown');
    const clearNotifBtn = document.getElementById('clearNotifBtn');

    dashBellBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      dashNotifDropdown?.classList.toggle('is-open');
    });

    document.addEventListener('click', (e) => {
      if (dashNotifDropdown && !dashNotifDropdown.contains(e.target) && e.target !== dashBellBtn && !dashBellBtn?.contains(e.target)) {
        dashNotifDropdown.classList.remove('is-open');
      }
    });

    clearNotifBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      const notifBody = dashNotifDropdown?.querySelector('.notif-body');
      const badge = document.querySelector('.bell-badge-pulse');
      if (notifBody) {
        notifBody.innerHTML = '<div style="padding: 24px; text-align: center; color: #94a3b8; font-size: 0.85rem;"><i class="fas fa-check-circle" style="color: #10b981; font-size: 1.4rem; display: block; margin-bottom: 6px;"></i>All notifications cleared</div>';
      }
      if (badge) {
        badge.style.display = 'none';
      }
    });

    
    const searchInput = document.getElementById('table-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const activePane = document.querySelector('.dash-tab-pane.active') || document;
        const rows = activePane.querySelectorAll('.modern-data-table tbody tr');
        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(query) ? '' : 'none';
        });
      });
    }

    
    const logoutTriggers = document.querySelectorAll('.dash-logout-trigger');
    const logoutModal = document.getElementById('logoutModal');
    const cancelLogoutBtn = document.getElementById('cancelLogoutBtn');
    const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');

    logoutTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        logoutModal?.classList.add('is-active');
      });
    });

    cancelLogoutBtn?.addEventListener('click', () => {
      logoutModal?.classList.remove('is-active');
    });

    confirmLogoutBtn?.addEventListener('click', () => {
      localStorage.removeItem('stackly_user_name');
      localStorage.removeItem('stackly_user_email');
      localStorage.removeItem('stackly_user_role');
      window.location.href = 'index.html';
    });

    logoutModal?.addEventListener('click', (e) => {
      if (e.target === logoutModal) {
        logoutModal.classList.remove('is-active');
      }
    });

    
    
    
    const dashLiveClock = document.getElementById('dashLiveClock');
    if (dashLiveClock) {
      const updateClock = () => {
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        dashLiveClock.textContent = `${hrs}:${mins}:${secs} IST`;
      };
      updateClock();
      setInterval(updateClock, 1000);
    }

    
    
    
    const requestHotlineBtn = document.getElementById('requestHotlineBtn');
    if (requestHotlineBtn) {
      requestHotlineBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '404.html';
      });
    }

    const hotlineModal = document.getElementById('hotlineModal');
    const closeHotlineModalBtn = document.getElementById('closeHotlineModalBtn');
    const cancelHotlineBtn = document.getElementById('cancelHotlineBtn');
    const hotlineRequestForm = document.getElementById('hotlineRequestForm');
    const hotlineSuccessNotice = document.getElementById('hotlineSuccessNotice');
    const dismissHotlineSuccessBtn = document.getElementById('dismissHotlineSuccessBtn');

    if (hotlineModal) {
      const closeHotline = () => hotlineModal.classList.remove('is-active');
      closeHotlineModalBtn?.addEventListener('click', closeHotline);
      cancelHotlineBtn?.addEventListener('click', closeHotline);
      dismissHotlineSuccessBtn?.addEventListener('click', closeHotline);

      hotlineModal.addEventListener('click', (e) => {
        if (e.target === hotlineModal) closeHotline();
      });

      hotlineRequestForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('submitHotlineBtn');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        }
        setTimeout(() => {
          if (hotlineRequestForm) hotlineRequestForm.style.display = 'none';
          if (hotlineSuccessNotice) hotlineSuccessNotice.style.display = 'block';
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-phone-volume"></i> Request Immediate Call';
          }
        }, 600);
      });
    }

    
    
    
    const runHealthScanBtn = document.getElementById('runHealthScanBtn');
    const auditScanModal = document.getElementById('auditScanModal');
    const closeAuditScanBtn = document.getElementById('closeAuditScanBtn');
    const dismissAuditScanBtn = document.getElementById('dismissAuditScanBtn');
    const auditScanningState = document.getElementById('auditScanningState');
    const auditScanCompleteState = document.getElementById('auditScanCompleteState');
    const auditScanProgressBar = document.getElementById('auditScanProgressBar');
    const auditScanPercent = document.getElementById('auditScanPercent');
    const auditScanStatusText = document.getElementById('auditScanStatusText');

    let scanTimer = null;

    if (runHealthScanBtn && auditScanModal) {
      const closeScan = () => {
        auditScanModal.classList.remove('is-active');
        if (scanTimer) clearTimeout(scanTimer);
      };

      closeAuditScanBtn?.addEventListener('click', closeScan);
      dismissAuditScanBtn?.addEventListener('click', closeScan);
      auditScanModal.addEventListener('click', (e) => {
        if (e.target === auditScanModal) closeScan();
      });

      runHealthScanBtn.addEventListener('click', () => {
        auditScanModal.classList.add('is-active');
        if (auditScanningState) auditScanningState.style.display = 'block';
        if (auditScanCompleteState) auditScanCompleteState.style.display = 'none';

        
        if (auditScanProgressBar) auditScanProgressBar.style.width = '0%';
        if (auditScanPercent) auditScanPercent.textContent = '0%';
        if (auditScanStatusText) auditScanStatusText.textContent = 'Initializing Ledger Audit Engine...';

        const steps = [
          document.getElementById('scanStep1'),
          document.getElementById('scanStep2'),
          document.getElementById('scanStep3'),
          document.getElementById('scanStep4')
        ];
        steps.forEach(s => {
          if (s) {
            s.style.opacity = '0.4';
            s.innerHTML = s.innerHTML.replace('fa-check-circle style="color: #10B981;"', 'fa-circle-notch fa-spin');
          }
        });

        
        setTimeout(() => {
          if (auditScanProgressBar) auditScanProgressBar.style.width = '28%';
          if (auditScanPercent) auditScanPercent.textContent = '28%';
          if (auditScanStatusText) auditScanStatusText.textContent = 'Reconciling 164 Corporate Accounts...';
          if (steps[0]) {
            steps[0].style.opacity = '1';
            steps[0].innerHTML = '<i class="fas fa-check-circle" style="color: #10B981;"></i> 164 Corporate Retainer Ledgers & Escrows Verified (₹38.4 Cr)';
          }
        }, 500);

        
        setTimeout(() => {
          if (auditScanProgressBar) auditScanProgressBar.style.width = '62%';
          if (auditScanPercent) auditScanPercent.textContent = '62%';
          if (auditScanStatusText) auditScanStatusText.textContent = 'Cross-verifying MCA Form AOC-4...';
          if (steps[1]) {
            steps[1].style.opacity = '1';
            steps[1].innerHTML = '<i class="fas fa-check-circle" style="color: #10B981;"></i> MCA AOC-4 & ROC Filings Validated with DSC signatures';
          }
        }, 1100);

        
        setTimeout(() => {
          if (auditScanProgressBar) auditScanProgressBar.style.width = '88%';
          if (auditScanPercent) auditScanPercent.textContent = '88%';
          if (auditScanStatusText) auditScanStatusText.textContent = 'Checking GSTIN Section 73 & ITC...';
          if (steps[2]) {
            steps[2].style.opacity = '1';
            steps[2].innerHTML = '<i class="fas fa-check-circle" style="color: #10B981;"></i> GSTIN Section 73 & ITC GSTR-2B: Zero Mismatch Found';
          }
        }, 1700);

        
        scanTimer = setTimeout(() => {
          if (auditScanProgressBar) auditScanProgressBar.style.width = '100%';
          if (auditScanPercent) auditScanPercent.textContent = '100%';
          if (steps[3]) {
            steps[3].style.opacity = '1';
            steps[3].innerHTML = '<i class="fas fa-check-circle" style="color: #10B981;"></i> ICAI Peer-Review Audit Certification Key Issued: #STK-2026-AA';
          }
          setTimeout(() => {
            if (auditScanningState) auditScanningState.style.display = 'none';
            if (auditScanCompleteState) auditScanCompleteState.style.display = 'block';
          }, 400);
        }, 2200);
      });
    }
  };

  initDashboards();

  
  document.addEventListener('click', (e) => {
    const clickable = e.target.closest('a, button');
    if (!clickable) return;

    if (clickable.tagName.toLowerCase() === 'a') {
      const href = clickable.getAttribute('href');
      
      if (clickable.hasAttribute('data-tab') || 
          clickable.classList.contains('dash-logout-trigger') || 
          clickable.id === 'clearNotifBtn') {
        return;
      }
      if (href === '#' || href === '' || href === 'javascript:void(0)' || href === 'javascript:;') {
        e.preventDefault();
        window.location.href = '404.html';
      }
    } else if (clickable.tagName.toLowerCase() === 'button') {
      
      if (clickable.type !== 'submit' && 
          !clickable.id && 
          !clickable.classList.contains('mobile-toggle') && 
          !clickable.classList.contains('mobile-nav-close') && 
          !clickable.classList.contains('password-toggle-btn') && 
          !clickable.classList.contains('pricing-tab-btn') && 
          !clickable.hasAttribute('onclick')) {
        
        if (!clickable.classList.contains('btn-dash-outline') && !clickable.classList.contains('btn-dash-action')) {
          
        }
      }
    }
  });

});
