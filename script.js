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

    // Apply each card's gradient as a CSS variable so the colorful accent strip
    // can use it without per-card inline styles. Also inject a clearly-visible
    // "View on Odoo Store" pill into store cards.
    projectCards.forEach(card => {
        const btn = card.querySelector('.project-view-btn');
        if (!btn) return;
        const gradient = btn.getAttribute('data-gradient');
        const storeUrl = btn.getAttribute('data-store-url');
        if (gradient) card.style.setProperty('--card-accent', gradient);
        if (storeUrl) {
            card.classList.add('has-store-link');
            const info = card.querySelector('.project-info');
            if (info) {
                const storeLink = document.createElement('a');
                storeLink.className = 'card-store-link';
                storeLink.href = storeUrl;
                storeLink.target = '_blank';
                storeLink.rel = 'noopener noreferrer';
                storeLink.setAttribute('aria-label', 'View on Odoo Apps Store');
                storeLink.innerHTML = '<i class="fas fa-store"></i><span>View on Odoo Apps Store</span><i class="fas fa-arrow-right"></i>';
                info.appendChild(storeLink);
            }
        }
    });

    // Lightbox modal
    document.querySelectorAll('.project-view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.getAttribute('data-title');
            const desc = btn.getAttribute('data-desc');
            const tech = btn.getAttribute('data-tech');
            const gradient = btn.getAttribute('data-gradient');
            const icon = btn.getAttribute('data-icon');
            const storeUrl = btn.getAttribute('data-store-url');

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

            // Show / hide the Odoo Apps Store CTA based on the project type
            const storeCta = document.getElementById('modalStoreCta');
            if (storeUrl) {
                storeCta.href = storeUrl;
                storeCta.hidden = false;
            } else {
                storeCta.removeAttribute('href');
                storeCta.hidden = true;
            }

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
    // GitHub Analytics Dashboard
    // ============================
    const GH_USERNAME = 'sameer-ahmad-dev';
    const ghCalendarBody = document.getElementById('ghCalendarBody');
    const ghYearTabs = document.getElementById('ghYearTabs');
    const contribCache = {};
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    if (ghCalendarBody && ghYearTabs) {
        const currentYear = new Date().getFullYear();
        const startYear = 2022;
        const years = [];
        for (let y = currentYear; y >= startYear; y--) years.push(y);

        years.forEach((y, idx) => {
            const btn = document.createElement('button');
            btn.className = 'gh-year-tab' + (idx === 0 ? ' active' : '');
            btn.textContent = y;
            btn.dataset.year = y;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.gh-year-tab').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                loadContributions(y);
            });
            ghYearTabs.appendChild(btn);
        });

        // ===== Tooltip =====
        let ghTooltip = null;
        const showTooltip = (target, html) => {
            if (!ghTooltip) {
                ghTooltip = document.createElement('div');
                ghTooltip.className = 'gh-tooltip';
                document.body.appendChild(ghTooltip);
            }
            ghTooltip.innerHTML = html;
            ghTooltip.style.display = 'block';
            const rect = target.getBoundingClientRect();
            const tipRect = ghTooltip.getBoundingClientRect();
            let left = rect.left + rect.width / 2 - tipRect.width / 2;
            left = Math.max(8, Math.min(left, window.innerWidth - tipRect.width - 8));
            ghTooltip.style.left = left + 'px';
            ghTooltip.style.top = (rect.top - tipRect.height - 10) + 'px';
        };
        const hideTooltip = () => { if (ghTooltip) ghTooltip.style.display = 'none'; };

        // ===== Heatmap render with month labels =====
        const renderHeatmap = (contributions, year) => {
            ghCalendarBody.innerHTML = '';
            const monthLabelEl = document.getElementById('ghMonthLabels');
            if (monthLabelEl) monthLabelEl.innerHTML = '';

            const heatmap = document.createElement('div');
            heatmap.className = 'gh-heatmap';

            let weekIdx = 0;
            const weekMonth = {}; // weekIdx -> month seen first

            contributions.forEach((c, i) => {
                const d = new Date(c.date);
                const dayOfWeek = d.getDay();
                if (i === 0 && dayOfWeek > 0) {
                    for (let p = 0; p < dayOfWeek; p++) {
                        const blank = document.createElement('span');
                        blank.className = 'gh-cell';
                        blank.style.visibility = 'hidden';
                        blank.style.gridColumn = 1;
                        blank.style.gridRow = (p + 1);
                        heatmap.appendChild(blank);
                    }
                }
                const cell = document.createElement('span');
                cell.className = 'gh-cell';
                cell.dataset.level = c.level || 0;
                cell.dataset.count = c.count;
                cell.dataset.date = c.date;
                cell.style.gridColumn = (weekIdx + 1);
                cell.style.gridRow = (dayOfWeek + 1);
                cell.addEventListener('mouseenter', () => {
                    const dateObj = new Date(c.date);
                    const dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
                    const noun = c.count === 1 ? 'contribution' : 'contributions';
                    showTooltip(cell, `<div><span class="gh-tooltip-count">${c.count}</span> ${noun}</div><div class="gh-tooltip-date">${dateStr}</div>`);
                });
                cell.addEventListener('mouseleave', hideTooltip);
                heatmap.appendChild(cell);

                // Track first appearance of each month per week column (using day index 0 / Sunday)
                if (weekMonth[weekIdx] === undefined) weekMonth[weekIdx] = d.getMonth();

                if (dayOfWeek === 6) weekIdx++;
            });

            ghCalendarBody.appendChild(heatmap);

            // Render month labels — show each month label at its first week column
            if (monthLabelEl) {
                const monthShown = new Set();
                Object.keys(weekMonth).forEach(weekKey => {
                    const wIdx = parseInt(weekKey);
                    const m = weekMonth[wIdx];
                    if (!monthShown.has(m)) {
                        monthShown.add(m);
                        const span = document.createElement('span');
                        span.textContent = MONTHS[m];
                        span.style.gridColumn = (wIdx + 1) + ' / span 4';
                        monthLabelEl.appendChild(span);
                    }
                });
            }

            // Update yearly stat + sparkline + monthly + weekday + insights
            const total = contributions.reduce((sum, d) => sum + (d.count || 0), 0);
            const totalEl = document.getElementById('ghTotalContrib');
            const yearLabelEl = document.getElementById('ghContribYear');
            const monthlyYearEl = document.getElementById('ghMonthlyYear');
            if (totalEl) totalEl.textContent = total.toLocaleString();
            if (yearLabelEl) yearLabelEl.textContent = `in ${year}`;
            if (monthlyYearEl) monthlyYearEl.textContent = year;

            renderSparkline(contributions);
            renderMonthlyChart(contributions, year);
            renderWeekdayChart(contributions);
            renderInsights(contributions, year);
        };

        // ===== Sparkline (in stat card) — 12-week rolling sum =====
        const renderSparkline = (contributions) => {
            const svg = document.getElementById('ghSparkContrib');
            if (!svg) return;
            // Group last 12 weeks
            const weeks = 12;
            const days = contributions.slice(-weeks * 7);
            const buckets = [];
            for (let w = 0; w < weeks; w++) {
                const slice = days.slice(w * 7, (w + 1) * 7);
                buckets.push(slice.reduce((s, d) => s + (d?.count || 0), 0));
            }
            const max = Math.max(...buckets, 1);
            const W = 120, H = 30;
            const pts = buckets.map((v, i) => {
                const x = (i / (buckets.length - 1)) * W;
                const y = H - (v / max) * (H - 4) - 2;
                return [x, y];
            });
            const linePath = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
            const areaPath = linePath + ` L${W},${H} L0,${H} Z`;
            svg.innerHTML = `
                <defs>
                    <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="var(--accent-cyan)" stop-opacity="0.5"/>
                        <stop offset="100%" stop-color="var(--accent-cyan)" stop-opacity="0"/>
                    </linearGradient>
                </defs>
                <path d="${areaPath}" fill="url(#sparkGrad)"/>
                <path d="${linePath}" fill="none" stroke="var(--accent-cyan)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            `;
        };

        // ===== Monthly bar chart =====
        const renderMonthlyChart = (contributions, year) => {
            const svg = document.getElementById('ghMonthlyChart');
            if (!svg) return;
            const monthly = new Array(12).fill(0);
            contributions.forEach(c => {
                const m = new Date(c.date).getMonth();
                monthly[m] += c.count;
            });
            const W = 600, H = 240;
            const padL = 36, padR = 12, padT = 16, padB = 32;
            const chartW = W - padL - padR;
            const chartH = H - padT - padB;
            const max = Math.max(...monthly, 5);
            const barW = chartW / 12 * 0.62;
            const gap = chartW / 12;

            // Y-axis grid lines (4 levels)
            let gridLines = '';
            for (let i = 0; i <= 4; i++) {
                const y = padT + (chartH / 4) * i;
                const val = Math.round(max - (max / 4) * i);
                gridLines += `<line class="gh-grid-line" x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}"/>`;
                gridLines += `<text class="gh-axis-label" x="${padL - 6}" y="${y + 3}" text-anchor="end">${val}</text>`;
            }

            // Bars
            let bars = '';
            monthly.forEach((v, i) => {
                const h = max > 0 ? (v / max) * chartH : 0;
                const x = padL + gap * i + (gap - barW) / 2;
                const y = padT + chartH - h;
                bars += `
                    <g>
                        <rect class="gh-bar" x="${x}" y="${y}" width="${barW}" height="${h}" rx="3" ry="3"
                              fill="url(#barGrad)" data-month="${MONTHS[i]}" data-count="${v}"/>
                        <text class="gh-bar-value" x="${x + barW / 2}" y="${y - 5}" text-anchor="middle">${v}</text>
                        <text class="gh-bar-label" x="${x + barW / 2}" y="${padT + chartH + 18}" text-anchor="middle">${MONTHS[i]}</text>
                    </g>
                `;
            });

            svg.innerHTML = `
                <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="var(--accent-cyan)"/>
                        <stop offset="100%" stop-color="var(--accent-blue)" stop-opacity="0.6"/>
                    </linearGradient>
                </defs>
                ${gridLines}
                ${bars}
            `;

            // Tooltips on bars
            svg.querySelectorAll('.gh-bar').forEach(bar => {
                bar.addEventListener('mouseenter', () => {
                    const m = bar.dataset.month, c = bar.dataset.count;
                    showTooltip(bar, `<div><span class="gh-tooltip-count">${c}</span> contributions</div><div class="gh-tooltip-date">${m} ${year}</div>`);
                });
                bar.addEventListener('mouseleave', hideTooltip);
            });
        };

        // ===== Weekday distribution radial chart =====
        const renderWeekdayChart = (contributions) => {
            const svg = document.getElementById('ghWeekdayChart');
            if (!svg) return;
            const byDay = new Array(7).fill(0);
            contributions.forEach(c => {
                const d = new Date(c.date).getDay();
                byDay[d] += c.count;
            });
            const cx = 160, cy = 130;
            const innerR = 38;
            const ringGap = 4;
            const ringMax = 92;
            const max = Math.max(...byDay, 1);
            const colors = ['#f59e0b', '#3b82f6', '#8b5cf6', '#00d4ff', '#10b981', '#ef4444', '#ec4899'];

            let bars = '';
            byDay.forEach((v, i) => {
                const r0 = innerR + i * ((ringMax - innerR) / 7 + ringGap / 2);
                const startAngle = -Math.PI / 2 + 0.15;
                const endAngle = startAngle + (v / max) * (Math.PI * 1.7);
                const trackEnd = startAngle + Math.PI * 1.7;
                bars += arcPath(cx, cy, r0, startAngle, trackEnd, true) + // track
                        arcPath(cx, cy, r0, startAngle, endAngle, false, colors[i], v, WEEKDAYS[i]);
            });

            // Center label
            const total = byDay.reduce((s, x) => s + x, 0);
            const peakIdx = byDay.indexOf(Math.max(...byDay));

            svg.innerHTML = `
                ${bars}
                <text x="${cx}" y="${cy - 8}" text-anchor="middle" fill="var(--text-muted)" font-size="10" font-family="JetBrains Mono">PEAK DAY</text>
                <text x="${cx}" y="${cy + 12}" text-anchor="middle" fill="var(--text-primary)" font-size="18" font-weight="700" font-family="Inter">${WEEKDAYS[peakIdx]}</text>
                <text x="${cx}" y="${cy + 28}" text-anchor="middle" fill="var(--accent-cyan)" font-size="11" font-weight="600" font-family="JetBrains Mono">${byDay[peakIdx]} commits</text>
                <g transform="translate(${cx + 105}, 30)">
                    ${WEEKDAYS.map((w, i) => `
                        <g transform="translate(0, ${i * 18})">
                            <rect width="10" height="10" rx="2" fill="${colors[i]}" opacity="0.85"/>
                            <text x="16" y="9" font-size="10" fill="var(--text-secondary)" font-family="Inter">${w}</text>
                            <text x="50" y="9" font-size="10" fill="var(--text-muted)" font-family="JetBrains Mono">${byDay[i]}</text>
                        </g>
                    `).join('')}
                </g>
            `;

            // Hover tooltips on arcs
            svg.querySelectorAll('.gh-radial-bar').forEach(arc => {
                arc.addEventListener('mouseenter', () => {
                    const d = arc.dataset.day, c = arc.dataset.count;
                    showTooltip(arc, `<div><span class="gh-tooltip-count">${c}</span> commits on</div><div class="gh-tooltip-date">${d}s</div>`);
                });
                arc.addEventListener('mouseleave', hideTooltip);
            });
        };

        // SVG arc path helper
        const arcPath = (cx, cy, r, a0, a1, isTrack, color, count, day) => {
            const x0 = cx + r * Math.cos(a0);
            const y0 = cy + r * Math.sin(a0);
            const x1 = cx + r * Math.cos(a1);
            const y1 = cy + r * Math.sin(a1);
            const large = (a1 - a0) > Math.PI ? 1 : 0;
            const cls = isTrack ? 'gh-radial-track-line' : 'gh-radial-bar';
            const stroke = isTrack ? 'rgba(255,255,255,0.05)' : color;
            const dataAttrs = isTrack ? '' : `data-day="${day}" data-count="${count}"`;
            // Skip rendering if arc has zero length (avoids invisible NaN paths)
            if (Math.abs(a1 - a0) < 0.001) {
                return `<circle cx="${x0}" cy="${y0}" r="3" fill="${stroke}" opacity="0.3" ${dataAttrs}/>`;
            }
            return `<path class="${cls}" d="M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}" fill="none" stroke="${stroke}" stroke-width="7" stroke-linecap="round" ${dataAttrs}/>`;
        };

        // ===== Insights (streaks, best day, average) =====
        const renderInsights = (contributions, year) => {
            // Best day
            let best = { count: 0, date: '' };
            contributions.forEach(c => {
                if (c.count > best.count) best = { count: c.count, date: c.date };
            });

            // Streaks
            let currentStreak = 0;
            let longestStreak = 0;
            let runningStreak = 0;
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            contributions.forEach(c => {
                if (c.count > 0) {
                    runningStreak++;
                    if (runningStreak > longestStreak) longestStreak = runningStreak;
                } else {
                    runningStreak = 0;
                }
            });

            // Current streak: count back from today (or last day in data)
            for (let i = contributions.length - 1; i >= 0; i--) {
                const cDate = new Date(contributions[i].date);
                cDate.setHours(0, 0, 0, 0);
                if (cDate > today) continue; // skip future dates
                if (contributions[i].count > 0) {
                    currentStreak++;
                } else {
                    break;
                }
            }

            // Daily average — only days that have already passed in this year
            const passedDays = contributions.filter(c => new Date(c.date) <= today).length;
            const total = contributions.reduce((s, c) => s + c.count, 0);
            const avg = passedDays > 0 ? (total / passedDays).toFixed(1) : '0';

            const elStreak = document.getElementById('ghCurrentStreak');
            const elLong = document.getElementById('ghLongestStreak');
            const elBest = document.getElementById('ghBestDay');
            const elAvg = document.getElementById('ghDailyAvg');

            if (elStreak) elStreak.textContent = `${currentStreak} day${currentStreak === 1 ? '' : 's'}`;
            if (elLong) elLong.textContent = `${longestStreak} day${longestStreak === 1 ? '' : 's'}`;
            if (elBest) {
                if (best.date) {
                    const d = new Date(best.date);
                    elBest.textContent = `${best.count} on ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
                } else {
                    elBest.textContent = '—';
                }
            }
            if (elAvg) elAvg.textContent = `${avg}/day`;
        };

        // ===== Fetch contributions =====
        const loadContributions = async (year) => {
            if (contribCache[year]) {
                renderHeatmap(contribCache[year], year);
                return;
            }
            ghCalendarBody.innerHTML = '<div class="gh-loading"><i class="fas fa-spinner fa-spin"></i> Loading ' + year + ' activity...</div>';
            try {
                const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GH_USERNAME}?y=${year}`);
                if (!res.ok) throw new Error('API ' + res.status);
                const data = await res.json();
                contribCache[year] = data.contributions;
                renderHeatmap(data.contributions, year);
            } catch (err) {
                ghCalendarBody.innerHTML = `
                    <div class="gh-error">
                        <i class="fas fa-exclamation-triangle"></i>
                        <div>Could not load contributions right now.</div>
                        <a href="https://github.com/${GH_USERNAME}" target="_blank" rel="noopener" style="color:var(--accent-cyan);margin-top:8px;">View profile on GitHub →</a>
                    </div>`;
            }
        };

        // ===== User stats =====
        const loadUserStats = async () => {
            try {
                const res = await fetch(`https://api.github.com/users/${GH_USERNAME}`);
                if (!res.ok) throw new Error('API ' + res.status);
                const user = await res.json();
                const repos = document.getElementById('ghRepos');
                const followers = document.getElementById('ghFollowers');
                const yearsEl = document.getElementById('ghYears');
                const reposMeta = document.getElementById('ghReposMeta');
                const followingMeta = document.getElementById('ghFollowingMeta');
                const joined = document.getElementById('ghJoined');

                if (repos) repos.textContent = user.public_repos ?? '—';
                if (followers) followers.textContent = user.followers ?? '—';
                if (followingMeta && user.following != null) followingMeta.textContent = `Following ${user.following}`;
                if (reposMeta && user.public_gists != null) reposMeta.textContent = `${user.public_gists} public gists`;

                if (yearsEl && user.created_at) {
                    const created = new Date(user.created_at);
                    const diff = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24 * 365);
                    yearsEl.textContent = Math.max(1, Math.floor(diff)) + '+';
                    if (joined) {
                        joined.textContent = `Member since ${created.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
                    }
                }
            } catch (err) { /* silent */ }
        };

        // ===== Lazy-load when section enters viewport =====
        const ghSection = document.getElementById('activity');
        let ghLoaded = false;
        const ghObserver = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting && !ghLoaded) {
                    ghLoaded = true;
                    loadUserStats();
                    loadContributions(currentYear);
                    ghObserver.disconnect();
                }
            });
        }, { rootMargin: '200px' });
        if (ghSection) ghObserver.observe(ghSection);
    }

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
