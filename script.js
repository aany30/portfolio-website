/* ==========================================================
   Aanya Jain — Portfolio Interactions
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. Hero entrance animation ──────────────────────── */
    const heroItems = [
        '.hero-pre',
        '.hero-name',
        '.hero-role',
        '.hero-sub',
        '.hero-actions',
        '.hero-links',
        '.hero-photo-col',
    ];
    heroItems.forEach((sel, i) => {
        const el = document.querySelector(sel);
        if (!el) return;
        el.style.opacity = '0';
        el.style.transform = i === heroItems.length - 1 ? 'translateY(20px)' : 'translateY(18px)';
        el.style.transition = `opacity 0.95s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.1}s, transform 0.95s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.1}s`;
        requestAnimationFrame(() => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            }, 50);
        });
    });


    /* ── 2. Scroll Reveal ────────────────────────────────── */
    const revealGroups = [
        { sel: '.section-tag', delay: 0 },
        { sel: '.section-title', delay: 0.06 },
        { sel: '.build-card', delay: 0 },
        { sel: '.about-photo-side', delay: 0 },
        { sel: '.about-text-side', delay: 0.12 },
        { sel: '.skill-category', delay: 0 },
        { sel: '.work-card', delay: 0 },
        { sel: '.edu-item', delay: 0 },
        { sel: '.contact-left', delay: 0 },
        { sel: '.contact-right', delay: 0.12 },
        { sel: '.exp-block-label', delay: 0 },
    ];

    revealGroups.forEach(({ sel, delay }) => {
        document.querySelectorAll(sel).forEach((el, i) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${delay + i * 0.1}s`;
        });
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


    /* ── 3. Nav scroll ───────────────────────────────────── */
    const nav = document.getElementById('nav');
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();


    /* ── 4. Active link highlight ────────────────────────── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                const m = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (m) m.classList.add('active');
            }
        });
    }, { rootMargin: `-${nav.offsetHeight + 10}px 0px -55% 0px` });

    sections.forEach(s => navObs.observe(s));


    /* ── 5. Mobile nav ───────────────────────────────────── */
    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('mobile-nav');

    burger.addEventListener('click', () => {
        const open = mobileNav.classList.toggle('open');
        const [s1, s2] = burger.querySelectorAll('span');
        if (open) {
            s1.style.transform = 'rotate(45deg) translate(4px, 4px)';
            s2.style.transform = 'rotate(-45deg) translate(4px, -4px)';
        } else {
            s1.style.transform = '';
            s2.style.transform = '';
        }
    });

    mobileNav.querySelectorAll('.m-link').forEach(l => {
        l.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            burger.querySelectorAll('span').forEach(s => s.style.transform = '');
        });
    });


    /* ── 6. Smooth scroll ────────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.pageYOffset - nav.offsetHeight - 20;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });


    /* ── 7. Skill item stagger on enter ─────────────────── */
    const skillObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.querySelectorAll('.skill-item').forEach((item, i) => {
                item.style.opacity = '0';
                item.style.paddingLeft = '0';
                setTimeout(() => {
                    item.style.transition = `opacity 0.5s ease ${i * 0.06}s, color 0.25s ease, padding-left 0.25s ease`;
                    item.style.opacity = '1';
                }, 100 + i * 60);
            });
            skillObs.unobserve(entry.target);
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.skill-category').forEach(c => skillObs.observe(c));


    /* ── 8. Scroll-visibility video autoplay ────────────────── */
    const mentorVideo = document.getElementById('mentorship-video');
    if (mentorVideo) {
        const videoObs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    mentorVideo.play().catch(() => { });
                } else {
                    mentorVideo.pause();
                }
            });
        }, { threshold: 0.35 });
        videoObs.observe(mentorVideo);
    }

    /* ── 9. Magnetic Card Glow Effect ────────────────────── */
    document.querySelectorAll('.build-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    /* ── 10. Hero Parallax Effect ────────────────────────── */
    const heroSection = document.getElementById('hero');
    const heroPhoto = document.querySelector('.hero-photo-frame img');
    if (heroSection && heroPhoto) {
        heroSection.addEventListener('mousemove', e => {
            const x = (window.innerWidth / 2 - e.pageX) / 25;
            const y = (window.innerHeight / 2 - e.pageY) / 25;
            heroPhoto.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
        });
        heroSection.addEventListener('mouseleave', () => {
            heroPhoto.style.transform = 'scale(1) translate(0px, 0px)';
        });
    }

    /* ── 11. Staggered Skill Pill Fade ───────────────────── */
    const pillObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const pills = entry.target.querySelectorAll('.spill');
            pills.forEach((pill, i) => {
                pill.style.opacity = '0';
                pill.style.transform = 'translateX(-10px)';
                setTimeout(() => {
                    pill.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
                    pill.style.opacity = '1';
                    pill.style.transform = 'translateX(0)';
                }, 150 + i * 50);
            });
            pillObs.unobserve(entry.target);
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.skills-band').forEach(band => pillObs.observe(band));

    /* ── 12. Hover 3D Tilt on Photos ────────────────────── */
    const tiltEls = document.querySelectorAll('.about-photo, .split-photo, .hero-photo-frame');
    tiltEls.forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            el.style.transition = 'transform 0.1s ease';
            el.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${y * -10}deg) scale3d(1.03, 1.03, 1.03)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
            el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
        });
    });

    /* ── 13. Text Highlight on Scroll ───────────────────── */
    document.querySelectorAll('.about-body').forEach(p => {
        // Skip the signature line
        if (p.classList.contains('about-sign')) return;

        const originalHTML = p.innerHTML;
        const words = originalHTML.split(/\s+/);
        p.innerHTML = words.map(w => `<span class="scroll-word">${w}</span>`).join(' ');
    });

    const wordEls = document.querySelectorAll('.scroll-word');
    const highlightOnScroll = () => {
        wordEls.forEach(word => {
            const rect = word.getBoundingClientRect();
            const viewMid = window.innerHeight * 0.7;
            if (rect.top < viewMid) {
                word.classList.add('highlighted');
            }
        });
    };
    window.addEventListener('scroll', highlightOnScroll, { passive: true });
    highlightOnScroll(); // Run once on load

    /* ── 14. Hero Typing Animation ──────────────────────── */
    const typingEl = document.getElementById('hero-typing');
    if (typingEl) {
        const text = 'Building technology that thinks, learns, and makes an impact.';
        let i = 0;
        const cursor = document.createElement('span');
        cursor.classList.add('typing-cursor');
        typingEl.appendChild(cursor);

        const typeChar = () => {
            if (i < text.length) {
                typingEl.insertBefore(document.createTextNode(text.charAt(i)), cursor);
                i++;
                setTimeout(typeChar, 45 + Math.random() * 35);
            }
        };
        setTimeout(typeChar, 800); // Start after page settles
    }

    /* ── 15. Number Counter Animation ───────────────────── */
    const countObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'), 10);
            const duration = 2000;
            const start = performance.now();

            const animate = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target);
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    el.textContent = target;
                }
            };
            requestAnimationFrame(animate);
            countObs.unobserve(el);
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.count-up').forEach(el => countObs.observe(el));

    /* ── 16. Scroll Progress Bar ────────────────────────── */
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        const updateProgress = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        };
        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

});
