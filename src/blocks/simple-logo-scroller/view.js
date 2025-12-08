document.addEventListener('DOMContentLoaded', function() {

    class SimpleLogoScroller {
        constructor(container) {
            this.container = container;
            this.track = container.querySelector('.sls-scroller-track');
            this.logos = container.querySelectorAll('.sls-logo-item');
            this.wrapper = container.closest('.sls-scroller-wrapper');
            this.pagination = this.wrapper ? this.wrapper.querySelector('.sls-pagination') : null;
            this.dots = this.pagination ? this.pagination.querySelectorAll('.sls-dot') : [];

            // Get settings from data attributes
            this.autoScroll = container.dataset.autoScroll === 'true';
            this.scrollSpeed = parseInt(container.dataset.scrollSpeed) || 30;
            this.logosDesktop = parseInt(container.dataset.logosDesktop) || 4;
            this.logosTablet = parseInt(container.dataset.logosTablet) || 3;
            this.logosMobile = parseInt(container.dataset.logosMobile) || 2;
            this.showPagination = container.dataset.showPagination === 'true';

            // Animation state
            this.isAnimating = false;
            this.animationId = null;
            this.currentTransform = 0;
            this.logoWidth = 0;
            this.originalLogosCount = this.logos.length; // Store original count before duplication
            this.totalLogos = this.logos.length; // Will be updated after duplication

            // Pagination state
            this.currentPage = 0;
            this.totalPages = 0;
            this.logosPerView = 0;

            // Initialize
            this.init();
        }

        init() {
            if (this.totalLogos === 0) return;

            // Set up responsive layout first
            this.setupResponsive();

            // Always set up continuous scroll mode
            this.duplicateLogos();
            this.calculateDimensions();

            // Set up pagination controls if enabled
            if (this.showPagination) {
                this.setupPagination();
            }

            // Start auto-scroll if enabled
            if (this.autoScroll) {
                this.startAutoScroll();
            }

            // Handle resize
            window.addEventListener('resize', this.debounce(() => {
                this.setupResponsive();
                this.calculateDimensions();
                if (this.showPagination) {
                    this.calculatePagination();
                    this.updatePaginationDots();
                }
            }, 250));

            // Pause on hover for auto-scroll
            this.container.addEventListener('mouseenter', () => {
                if (this.autoScroll) this.pauseAutoScroll();
            });

            this.container.addEventListener('mouseleave', () => {
                if (this.autoScroll) this.resumeAutoScroll();
            });

            // Add mobile touch/swipe functionality
            this.setupSwipeHandlers();
        }

        duplicateLogos() {
            // Clone all logos for seamless scrolling
            const originalLogos = Array.from(this.logos);
            originalLogos.forEach(logo => {
                const clone = logo.cloneNode(true);
                this.track.appendChild(clone);
            });

            // Update logos list to include clones
            this.logos = this.track.querySelectorAll('.sls-logo-item');
            this.totalLogos = this.logos.length; // Update total count after duplication
        }

        setupResponsive() {
            const screenWidth = window.innerWidth;
            let logosPerView;

            // Determine breakpoint and logos per view
            if (screenWidth <= 768) {
                // Mobile
                logosPerView = this.logosMobile;
            } else if (screenWidth <= 1024) {
                // Tablet
                logosPerView = this.logosTablet;
            } else {
                // Desktop
                logosPerView = this.logosDesktop;
            }

            // Calculate logo width based on container width and logos per view
            const containerWidth = this.container.offsetWidth;
            const logoWidth = containerWidth / logosPerView;

            // Apply width to all logos
            this.logos.forEach(logo => {
                logo.style.flex = `0 0 ${logoWidth}px`;
                logo.style.width = `${logoWidth}px`;
            });

            this.logoWidth = logoWidth;
            this.logosPerView = logosPerView;
        }

        calculateDimensions() {
            this.totalWidth = this.logoWidth * this.originalLogosCount; // Use original count for seamless loop calculation
        }

        startAutoScroll() {
            this.isAnimating = true;
            this.animate();

            // Start updating pagination dots if enabled
            if (this.showPagination) {
                this.startDotUpdating();
            }
        }

        pauseAutoScroll() {
            this.isAnimating = false;
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
        }

        resumeAutoScroll() {
            if (!this.isAnimating) {
                this.isAnimating = true;
                this.animate();

                // Restart updating pagination dots if enabled
                if (this.showPagination) {
                    this.startDotUpdating();
                }
            }
        }

        animate() {
            if (!this.isAnimating) return;

            // Move left by scroll speed
            this.currentTransform -= (this.scrollSpeed / 100);

            // Reset position when we've scrolled through original logos
            if (Math.abs(this.currentTransform) >= this.totalWidth) {
                this.currentTransform = 0;
            }

            // Apply transform
            this.track.style.transform = `translateX(${this.currentTransform}px)`;

            // Continue animation
            this.animationId = requestAnimationFrame(() => this.animate());
        }

        setupPagination() {
            this.calculatePagination();
            this.updatePaginationDots();

            // Add click handlers to dots for manual navigation
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    this.jumpToPage(index);
                });
            });
        }

        calculatePagination() {
            // Create one dot per original logo for more granular navigation
            this.totalPages = this.originalLogosCount;
            if (this.currentPage >= this.totalPages) {
                this.currentPage = Math.max(0, this.totalPages - 1);
            }
        }

        updatePaginationDots() {
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentPage);
            });
        }

        jumpToPage(logoIndex) {
            if (logoIndex < 0 || logoIndex >= this.totalPages) return;

            // Pause auto-scroll temporarily
            const wasAnimating = this.isAnimating;
            if (wasAnimating) {
                this.pauseAutoScroll();
            }

            // Calculate the position to jump to (one logo width per index)
            const targetPosition = -(logoIndex * this.logoWidth);

            // Update current transform to the new position
            this.currentTransform = targetPosition;

            // Apply the jump with smooth transition
            this.track.style.transition = 'transform 0.3s ease';
            this.track.style.transform = `translateX(${targetPosition}px)`;

            // Update pagination dots
            this.currentPage = logoIndex;
            this.updatePaginationDots();

            // Resume auto-scroll after transition and remove transition
            setTimeout(() => {
                this.track.style.transition = '';
                if (wasAnimating && this.autoScroll) {
                    this.resumeAutoScroll();
                }
            }, 300);
        }

        startDotUpdating() {
            // Update active dot based on current scroll position
            const updateActiveDot = () => {
                if (!this.showPagination) return;

                // Calculate which logo is currently most visible
                // Each logo takes up logoWidth pixels
                const currentPosition = Math.abs(this.currentTransform);
                const currentLogoIndex = Math.round(currentPosition / this.logoWidth) % this.originalLogosCount;

                if (currentLogoIndex !== this.currentPage) {
                    this.currentPage = currentLogoIndex;
                    this.updatePaginationDots();
                }

                if (this.isAnimating) {
                    requestAnimationFrame(updateActiveDot);
                }
            };

            if (this.isAnimating) {
                updateActiveDot();
            }
        }

        setupSwipeHandlers() {
            if (!this.showPagination) return; // Only add swipe if pagination is enabled

            let startX = 0;
            let startTime = 0;
            let isScrolling = false;

            // Touch start
            this.container.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startTime = Date.now();
                isScrolling = false;

                // Pause auto-scroll during touch
                if (this.autoScroll) {
                    this.pauseAutoScroll();
                }
            }, { passive: true });

            // Touch move
            this.container.addEventListener('touchmove', (e) => {
                if (!startX) return;

                const currentX = e.touches[0].clientX;
                const diffX = Math.abs(startX - currentX);

                // If horizontal movement is significant, prevent vertical scrolling
                if (diffX > 10 && !isScrolling) {
                    isScrolling = true;
                }

                if (isScrolling) {
                    e.preventDefault();
                }
            }, { passive: false });

            // Touch end
            this.container.addEventListener('touchend', (e) => {
                if (!startX) return;

                const endX = e.changedTouches[0].clientX;
                const diffX = startX - endX;
                const diffTime = Date.now() - startTime;
                const absX = Math.abs(diffX);

                // Minimum swipe distance and maximum time for swipe detection
                const minSwipeDistance = 50;
                const maxSwipeTime = 500;

                if (absX >= minSwipeDistance && diffTime <= maxSwipeTime) {
                    // Determine swipe direction and navigate
                    if (diffX > 0) {
                        // Swipe left - go to next page
                        const nextPage = (this.currentPage + 1) % this.totalPages;
                        this.jumpToPage(nextPage);
                    } else {
                        // Swipe right - go to previous page
                        const prevPage = this.currentPage === 0 ? this.totalPages - 1 : this.currentPage - 1;
                        this.jumpToPage(prevPage);
                    }
                }

                // Reset values
                startX = 0;
                startTime = 0;
                isScrolling = false;

                // Resume auto-scroll after a delay
                if (this.autoScroll) {
                    setTimeout(() => {
                        this.resumeAutoScroll();
                    }, 1000); // 1 second delay before resuming auto-scroll
                }
            }, { passive: true });
        }

        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    }

    // Initialize all logo scrollers on the page
    const scrollers = document.querySelectorAll('.sls-scroller-container');
    scrollers.forEach(container => {
        new SimpleLogoScroller(container);
    });

});