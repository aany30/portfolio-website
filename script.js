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

});
