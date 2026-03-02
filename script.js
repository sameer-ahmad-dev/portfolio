/* ========================================
   SAMEER AHMAD - Portfolio JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // PARTICLES BACKGROUND
    // ========================================
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.4 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    const opacity = (1 - dist / 150) * 0.15;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        animationId = requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // ========================================
    // CURSOR GLOW
    // ========================================
    const cursorGlow = document.getElementById('cursorGlow');
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.style.left = mouseX + 'px';
        cursorGlow.style.top = mouseY + 'px';
    });

    // ========================================
    // TYPEWRITER EFFECT
    // ========================================
    const typewriterEl = document.getElementById('typewriter');
    const phrases = [
        'Odoo ERP Solutions',
        'Custom Business Apps',
        'AI-Powered Systems',
        'API Integrations',
        'System Migrations',
        'Machine Learning Models'
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeWriter() {
        const current = phrases[phraseIdx];

        if (isDeleting) {
            typewriterEl.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 40;
        } else {
            typewriterEl.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIdx === current.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            typingSpeed = 300;
        }

        setTimeout(typeWriter, typingSpeed);
    }

    typeWriter();

    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========================================
    // MOBILE NAVIGATION
    // ========================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ========================================
    // SCROLL REVEAL ANIMATION (Custom AOS)
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // ========================================
    // SKILL BARS ANIMATION
    // ========================================
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ========================================
    // COUNTER ANIMATION
    // ========================================
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.getAttribute('data-count'));
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 16);

                function updateCount() {
                    count += increment;
                    if (count < target) {
                        entry.target.textContent = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.textContent = target;
                    }
                }

                updateCount();
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ========================================
    // CONTACT FORM
    // ========================================
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;

        // Simulate sending
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
            btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 3000);
        }, 1500);
    });

    // ========================================
    // SMOOTH SCROLLING FOR ALL ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // SERVICE CARDS TILT EFFECT
    // ========================================
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ========================================
    // PROJECT GALLERY FILTER & LIGHTBOX
    // ========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Lightbox modal
    document.querySelectorAll('.project-view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.getAttribute('data-title');
            const desc = btn.getAttribute('data-desc');
            const tech = btn.getAttribute('data-tech');
            const gradient = btn.getAttribute('data-gradient');
            const icon = btn.getAttribute('data-icon');

            document.getElementById('modalThumb').style.background = gradient;
            document.getElementById('modalIcon').className = icon;
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalDesc').textContent = desc;

            // Build category tag
            const card = btn.closest('.project-card');
            const categoryTag = card.querySelector('.project-category-tag').textContent;
            document.getElementById('modalCategory').textContent = categoryTag;

            // Build tech tags
            const techContainer = document.getElementById('modalTech');
            techContainer.innerHTML = '';
            tech.split(',').forEach(t => {
                const tag = document.createElement('span');
                tag.classList.add('tech-tag');
                tag.textContent = t.trim();
                techContainer.appendChild(tag);
            });

            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) closeModal();
    });

    // ========================================
    // TESTIMONIALS SLIDER
    // ========================================
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('testimonialsDots');
    const tCards = track.querySelectorAll('.testimonial-card');
    let currentSlide = 0;

    function getPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function getMaxSlide() {
        return Math.max(0, tCards.length - getPerView());
    }

    function getCardFullWidth() {
        // card width + left margin + right margin
        const card = tCards[0];
        const style = getComputedStyle(card);
        return card.offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }

    function buildDots() {
        dotsContainer.innerHTML = '';
        const maxSlide = getMaxSlide();
        const perView = getPerView();
        const totalDots = Math.ceil(tCards.length / perView);
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('span');
            dot.classList.add('testimonial-dot');
            if (i === Math.floor(currentSlide / perView)) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(i * perView);
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const perView = getPerView();
        const activeDot = Math.floor(currentSlide / perView);
        document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === activeDot);
        });
    }

    function goToSlide(index) {
        const maxSlide = getMaxSlide();
        currentSlide = Math.max(0, Math.min(index, maxSlide));
        const offset = currentSlide * getCardFullWidth();
        track.style.transform = `translateX(-${offset}px)`;
        updateDots();
    }

    prevBtn.addEventListener('click', () => {
        const perView = getPerView();
        goToSlide(currentSlide - perView);
    });

    nextBtn.addEventListener('click', () => {
        const perView = getPerView();
        const maxSlide = getMaxSlide();
        if (currentSlide + perView > maxSlide) {
            goToSlide(0); // loop back
        } else {
            goToSlide(currentSlide + perView);
        }
    });

    buildDots();
    goToSlide(0);

    // Auto-slide every 5 seconds
    function startAutoSlide() {
        return setInterval(() => {
            const perView = getPerView();
            const maxSlide = getMaxSlide();
            if (currentSlide + perView > maxSlide) {
                goToSlide(0);
            } else {
                goToSlide(currentSlide + perView);
            }
        }, 5000);
    }

    let autoSlide = startAutoSlide();

    // Pause auto-slide on hover
    track.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.addEventListener('mouseleave', () => { autoSlide = startAutoSlide(); });

    // Rebuild on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            currentSlide = 0;
            buildDots();
            goToSlide(0);
        }, 200);
    });

    // ========================================
    // WHATSAPP DRAGGABLE FLOATING BUTTON
    // ========================================
    const waBtn = document.getElementById('whatsappFloat');
    const waLink = waBtn.querySelector('.whatsapp-link');
    let isDragging = false;
    let wasDragged = false;
    let startX, startY, initialX, initialY;

    function onDragStart(e) {
        const touch = e.touches ? e.touches[0] : e;
        isDragging = true;
        wasDragged = false;
        startX = touch.clientX;
        startY = touch.clientY;

        const rect = waBtn.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;

        waBtn.classList.add('dragging');
    }

    function onDragMove(e) {
        if (!isDragging) return;
        e.preventDefault();

        const touch = e.touches ? e.touches[0] : e;
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;

        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            wasDragged = true;
        }

        let newX = initialX + dx;
        let newY = initialY + dy;

        const maxX = window.innerWidth - waBtn.offsetWidth;
        const maxY = window.innerHeight - waBtn.offsetHeight;
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        waBtn.style.left = newX + 'px';
        waBtn.style.top = newY + 'px';
        waBtn.style.right = 'auto';
        waBtn.style.bottom = 'auto';
    }

    function onDragEnd() {
        if (!isDragging) return;
        isDragging = false;
        waBtn.classList.remove('dragging');

        // Snap to nearest edge (left or right)
        const rect = waBtn.getBoundingClientRect();
        const midScreen = window.innerWidth / 2;

        if (rect.left + rect.width / 2 < midScreen) {
            waBtn.style.left = '20px';
        } else {
            waBtn.style.left = (window.innerWidth - waBtn.offsetWidth - 20) + 'px';
        }
    }

    // Prevent link click if dragged
    waLink.addEventListener('click', (e) => {
        if (wasDragged) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    // Mouse events
    waBtn.addEventListener('mousedown', onDragStart);
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);

    // Touch events (mobile)
    waBtn.addEventListener('touchstart', onDragStart, { passive: false });
    document.addEventListener('touchmove', onDragMove, { passive: false });
    document.addEventListener('touchend', onDragEnd);

    // ============================
    // Green Theme Toggle
    // ============================
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Restore saved theme
        if (localStorage.getItem('greenTheme') === 'true') {
            document.body.classList.add('green-theme');
            themeToggle.classList.add('active');
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('green-theme');
            themeToggle.classList.toggle('active');
            localStorage.setItem('greenTheme', document.body.classList.contains('green-theme'));
        });
    }

});
