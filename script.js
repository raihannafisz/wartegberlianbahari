/**
 * ====================================================================
 * WARTEG BERLIAN BAHARI - SCRIPT LOGIC (VANILLA JS)
 * Fitur:
 *  1. Mobile Navigation & Hamburger Menu
 *  2. Header Scroll Shadow & Active Section Spy
 *  3. Smooth Scrolling dengan Kompensasi Tinggi Header
 *  4. Accordion Interaktif FAQ (10 Pertanyaan)
 *  5. Formulir Calon Mitra Auto-Format ke WhatsApp (087756091087)
 *  6. Fade-in Animasi Halus Saat Scroll (Intersection Observer)
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. NOMOR WHATSAPP RESMI ---
  const OFFICIAL_WA_NUMBER = '6287756091087';

  // --- 2. MOBILE NAVIGATION / HAMBURGER MENU ---
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navBackdrop = document.getElementById('navBackdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMobileMenu);
    }

    // Tutup menu saat salah satu link diklik
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Tutup menu jika klik di luar drawer
    document.addEventListener('click', (event) => {
      if (navMenu.classList.contains('open') && 
          !navMenu.contains(event.target) && 
          !hamburgerBtn.contains(event.target)) {
        closeMobileMenu();
      }
    });
  }

  function openMobileMenu() {
    navMenu.classList.add('open');
    if (navBackdrop) navBackdrop.classList.add('active');
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Kunci scroll layar saat menu buka
  }

  function closeMobileMenu() {
    navMenu.classList.remove('open');
    if (navBackdrop) navBackdrop.classList.remove('active');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // Kembalikan scroll
  }


  // --- 3. ACCORDION INTERAKTIF FAQ ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item, index) => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    // Secara default, biarkan FAQ 1 terbuka untuk menarik perhatian calon investor
    if (index === 0) {
      item.classList.add('active');
      questionBtn.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Opsional: Tutup accordion lain agar tampilan tetap rapi
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      // Toggle item yang diklik
      if (isActive) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });


  // --- 4. FORMULIR CALON MITRA -> WHATSAPP OTOMATIS ---
  const partnerForm = document.getElementById('partnerForm');

  if (partnerForm) {
    partnerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nama = document.getElementById('formNama').value.trim();
      const wa = document.getElementById('formWa').value.trim();
      const kota = document.getElementById('formKota').value.trim();
      const paket = document.getElementById('formPaket').value;
      const pesan = document.getElementById('formPesan').value.trim();

      if (!nama || !wa || !kota || !paket) {
        alert('Mohon lengkapi seluruh kolom yang wajib diisi (*).');
        return;
      }

      // Susun pesan WhatsApp terstruktur dan profesional
      let waMessage = `Halo Warteg Berlian Bahari,\nSaya ingin mengajukan permohonan konsultasi kemitraan franchise.\n\n`;
      waMessage += `*DATA CALON MITRA:*\n`;
      waMessage += `• *Nama Lengkap:* ${nama}\n`;
      waMessage += `• *No. WhatsApp:* ${wa}\n`;
      waMessage += `• *Kota / Rencana Lokasi:* ${kota}\n`;
      waMessage += `• *Tipe Outlet Diminati:* ${paket}\n`;

      if (pesan) {
        waMessage += `• *Catatan / Pesan:* ${pesan}\n`;
      }

      waMessage += `\nMohon informasi ketersediaan wilayah dan jadwal konsultasi. Terima kasih.`;

      // Buat tautan WhatsApp resmi
      const encodedMessage = encodeURIComponent(waMessage);
      const waUrl = `https://wa.me/${OFFICIAL_WA_NUMBER}?text=${encodedMessage}`;

      // Buka WhatsApp di tab baru
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }


  // --- 5. ACTIVE NAVIGATION SPY PADA SCROLL ---
  const sections = document.querySelectorAll('section[id]');
  const siteHeader = document.querySelector('.site-header');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    const headerHeight = siteHeader ? siteHeader.offsetHeight : 70;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - headerHeight - 50;
      const sectionId = section.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });


  // --- 6. HERO COVER SLIDER (FADE, 5s, DOTS, PAUSE, SWIPE) ---
  const heroSlider = document.getElementById('heroSlider');
  if (heroSlider) {
    const slides = heroSlider.querySelectorAll('.hero-slide');
    const dots = heroSlider.querySelectorAll('.hero-dot');
    let currentSlide = 0;
    let slideInterval = null;
    let isPaused = false;

    function goToSlide(index) {
      if (index === currentSlide) return;
      slides[currentSlide].classList.remove('active');
      slides[currentSlide].setAttribute('aria-hidden', 'true');
      dots[currentSlide].classList.remove('active');
      dots[currentSlide].setAttribute('aria-selected', 'false');

      currentSlide = (index + slides.length) % slides.length;

      slides[currentSlide].classList.add('active');
      slides[currentSlide].setAttribute('aria-hidden', 'false');
      dots[currentSlide].classList.add('active');
      dots[currentSlide].setAttribute('aria-selected', 'true');
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    function startTimer() {
      stopTimer();
      slideInterval = setInterval(() => {
        if (!isPaused) {
          nextSlide();
        }
      }, 5000);
    }

    function stopTimer() {
      if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
      }
    }

    // Dot navigation click
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        startTimer();
      });
    });

    // Pause on hover
    heroSlider.addEventListener('mouseenter', () => {
      isPaused = true;
    });
    heroSlider.addEventListener('mouseleave', () => {
      isPaused = false;
    });

    // Touch events for mobile pause & swipe
    let touchStartX = 0;
    let touchStartY = 0;
    let isTouching = false;

    heroSlider.addEventListener('touchstart', (e) => {
      isPaused = true;
      isTouching = true;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    heroSlider.addEventListener('touchend', (e) => {
      isPaused = false;
      if (!isTouching) return;
      isTouching = false;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        startTimer();
      }
    }, { passive: true });

    startTimer();
  }


  // --- 7. SEKSI DOKUMENTASI & LIGHTBOX (VANILLA JS) ---
  const galleryData = [
    {
      webp: 'assets/galeri/01-staf-melayani.webp',
      jpg: 'assets/galeri/01-staf-melayani.jpg',
      alt: 'Staf berseragam Warteg Berlian Bahari melayani pelanggan'
    },
    {
      webp: 'assets/galeri/02-etalase-ayam.webp',
      jpg: 'assets/galeri/02-etalase-ayam.jpg',
      alt: 'Etalase ayam dan lauk di Warteg Berlian Bahari'
    },
    {
      webp: 'assets/galeri/03-lauk-aneka.webp',
      jpg: 'assets/galeri/03-lauk-aneka.jpg',
      alt: 'Aneka lauk rumahan Warteg Berlian Bahari'
    },
    {
      webp: 'assets/galeri/04-lauk-masakan.webp',
      jpg: 'assets/galeri/04-lauk-masakan.jpg',
      alt: 'Pilihan lauk dan gorengan Warteg Berlian Bahari'
    },
    {
      webp: 'assets/galeri/05-etalase-panjang.webp',
      jpg: 'assets/galeri/05-etalase-panjang.jpg',
      alt: 'Etalase lengkap Warteg Berlian Bahari'
    },
    {
      webp: 'assets/galeri/06-sayur-segar.webp',
      jpg: 'assets/galeri/06-sayur-segar.jpg',
      alt: 'Aneka sayur segar Warteg Berlian Bahari'
    },
    {
      webp: 'assets/galeri/07-kasir-counter.webp',
      jpg: 'assets/galeri/07-kasir-counter.jpg',
      alt: 'Area kasir dan counter Warteg Berlian Bahari'
    },
    {
      webp: 'assets/galeri/08-ruang-makan-ac.webp',
      jpg: 'assets/galeri/08-ruang-makan-ac.jpg',
      alt: 'Ruang makan bersih dan nyaman Warteg Berlian Bahari'
    },
    {
      webp: 'assets/galeri/09-area-makan.webp',
      jpg: 'assets/galeri/09-area-makan.jpg',
      alt: 'Area makan Warteg Berlian Bahari'
    },
    {
      webp: 'assets/galeri/10-pelanggan-memilih.webp',
      jpg: 'assets/galeri/10-pelanggan-memilih.jpg',
      alt: 'Pelanggan memilih lauk di Warteg Berlian Bahari'
    },
    {
      webp: 'assets/galeri/11-sepiring-nasi.webp',
      jpg: 'assets/galeri/11-sepiring-nasi.jpg',
      alt: 'Sepiring nasi dengan lauk Warteg Berlian Bahari'
    },
    {
      webp: 'assets/galeri/12-piring-meja-marmer.webp',
      jpg: 'assets/galeri/12-piring-meja-marmer.jpg',
      alt: 'Sajian di meja marmer Warteg Berlian Bahari'
    }
  ];

  const docLightbox = document.getElementById('docLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxStage = document.getElementById('lightboxStage');
  const galleryItems = document.querySelectorAll('.doc-gallery-item');

  let currentPhotoIndex = 0;

  function openLightbox(index) {
    if (!docLightbox || !galleryData[index]) return;
    currentPhotoIndex = index;
    updateLightboxContent();
    docLightbox.classList.add('active');
    docLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lightboxCloseBtn) lightboxCloseBtn.focus();
  }

  function closeLightbox() {
    if (!docLightbox) return;
    docLightbox.classList.remove('active');
    docLightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const item = galleryData[currentPhotoIndex];
    if (!item) return;

    if (lightboxImg) {
      lightboxImg.style.opacity = '0.3';
      lightboxImg.onerror = () => {
        lightboxImg.src = item.jpg;
      };
      lightboxImg.src = item.webp;
      lightboxImg.alt = item.alt;
      lightboxImg.onload = () => {
        lightboxImg.style.opacity = '1';
      };
    }

    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentPhotoIndex + 1} / ${galleryData.length}`;
    }

    if (lightboxCaption) {
      lightboxCaption.textContent = item.alt;
    }
  }

  function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % galleryData.length;
    updateLightboxContent();
  }

  function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxContent();
  }

  // Click & keyboard Enter on gallery items
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.getAttribute('data-index'), 10);
      if (!isNaN(idx)) openLightbox(idx);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const idx = parseInt(item.getAttribute('data-index'), 10);
        if (!isNaN(idx)) openLightbox(idx);
      }
    });
  });

  // Lightbox controls
  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }
  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', closeLightbox);
  }
  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextPhoto();
    });
  }
  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevPhoto();
    });
  }

  // Keyboard navigation: Escape, ArrowLeft, ArrowRight
  document.addEventListener('keydown', (e) => {
    if (!docLightbox || !docLightbox.classList.contains('active')) return;
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      nextPhoto();
    } else if (e.key === 'ArrowLeft') {
      prevPhoto();
    }
  });

  // Touch swipe in lightbox
  if (lightboxStage) {
    let lbTouchStartX = 0;
    let lbTouchStartY = 0;

    lightboxStage.addEventListener('touchstart', (e) => {
      lbTouchStartX = e.touches[0].clientX;
      lbTouchStartY = e.touches[0].clientY;
    }, { passive: true });

    lightboxStage.addEventListener('touchend', (e) => {
      const lbTouchEndX = e.changedTouches[0].clientX;
      const lbTouchEndY = e.changedTouches[0].clientY;
      const diffX = lbTouchEndX - lbTouchStartX;
      const diffY = lbTouchEndY - lbTouchStartY;

      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          nextPhoto();
        } else {
          prevPhoto();
        }
      }
    }, { passive: true });
  }


  // --- 8. ANIMASI FADE-IN SAAT SCROLL (RINGAN & HALUS) ---
  // Menambahkan class animasi secara progresif pada elemen kartu & seksi
  const animatableElements = document.querySelectorAll(
    '.about-card, .feature-card, .outlet-card, .facility-card, .transparency-mini-card, .timeline-step, .gallery-item, .doc-gallery-item'
  );

  // Set style transisi awal
  animatableElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatableElements.forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback jika browser lawas tidak mendukung IntersectionObserver
    animatableElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

});
