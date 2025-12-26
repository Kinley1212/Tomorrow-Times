// Global News Network - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
            link.classList.add('active');
        }
    });

    // Search button functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            // Add search functionality here
            console.log('Search button clicked');
            alert('Search functionality coming soon!');
        });
    }

    // Watch Live button functionality
    const watchLiveBtn = document.querySelector('.watch-live-btn');
    if (watchLiveBtn) {
        watchLiveBtn.addEventListener('click', function() {
            // Add live stream functionality here
            console.log('Watch Live clicked');
            alert('Live stream will start soon!');
        });
    }

    // View More button functionality
    const viewMoreBtn = document.querySelector('.view-more-btn');
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            // Add load more functionality here
            console.log('View More clicked');
            alert('Loading more articles...');
        });
    }

    // Add click tracking for all article links
    const articleLinks = document.querySelectorAll('.news-item a, .politics-item, .sports-item');
    articleLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track article clicks
            console.log('Article clicked:', this.querySelector('h2, h3')?.textContent || 'Unknown');
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Add fade-in animation for articles
    const articles = document.querySelectorAll('.news-item, .politics-item, .sports-item');
    const articleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    }, {
        threshold: 0.1
    });

    articles.forEach(article => {
        articleObserver.observe(article);
    });

    // Footer links
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Footer link clicked:', this.textContent);
        });
    });

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.boxShadow = 'none';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Add reading progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 126px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #ff4757 0%, #ff6b7a 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Video Modal Functionality
    const liveVideo = document.querySelector('.live-video');
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const closeModal = document.getElementById('closeModal');

    if (liveVideo && videoModal && modalVideo) {
        // Open modal when clicking live-video
        liveVideo.addEventListener('click', function() {
            videoModal.classList.add('active');
            modalVideo.play();
            document.body.style.overflow = 'hidden';
        });

        // Close modal when clicking close button
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                videoModal.classList.remove('active');
                modalVideo.pause();
                modalVideo.currentTime = 0;
                document.body.style.overflow = '';
            });
        }

        // Close modal when clicking outside video
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                modalVideo.pause();
                modalVideo.currentTime = 0;
                document.body.style.overflow = '';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                videoModal.classList.remove('active');
                modalVideo.pause();
                modalVideo.currentTime = 0;
                document.body.style.overflow = '';
            }
        });
    }

    // Video play button hover effect
    const videoIcon = document.querySelector('.video-icon');
    if (videoIcon) {
        videoIcon.style.cursor = 'pointer';
        videoIcon.addEventListener('mouseenter', function() {
            this.style.transform = 'translate(-50%, -50%) scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        videoIcon.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }

    // Console log for debugging
    console.log('Global News Network initialized');
    console.log('Total articles:', articles.length);
    console.log('Total images:', images.length);

    // Hero Carousel Functionality
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.dot');
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroDescription = document.querySelector('.hero-description');
        let currentIndex = 0;
        let autoPlayInterval;

        // Function to show a specific slide
        function showSlide(index) {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Add active class to current slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;

            // Update hero content text
            const currentSlide = slides[index];
            if (heroTitle && currentSlide.dataset.title) {
                heroTitle.textContent = currentSlide.dataset.title;
            }
            if (heroSubtitle && currentSlide.dataset.subtitle) {
                heroSubtitle.innerHTML = currentSlide.dataset.subtitle;
            }
            if (heroDescription && currentSlide.dataset.description) {
                heroDescription.innerHTML = currentSlide.dataset.description;
            }
        }

        // Function to go to next slide
        function nextSlide() {
            let nextIndex = (currentIndex + 1) % slides.length;
            showSlide(nextIndex);
        }

        // Function to start autoplay
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 4000);
        }

        // Function to stop autoplay
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        // Add click event to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoPlay();
                showSlide(index);
                startAutoPlay();
            });
        });

        // Pause autoplay on hover
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // Start autoplay
        startAutoPlay();

        console.log('Carousel initialized with', slides.length, 'slides');
    }
});
