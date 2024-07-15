
$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        smartSpeed: 800,
        items: 1,
        dotsEach: true,
        dotClass: 'owl-dot',
        dotsClass: 'owl-dots',
        dotsContainer: '.owl-dots',
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 3
            }
        }
    });
});
$(document).ready(function () {
    $('.card1').hover(function () {
        $('.img1').css({
            'z-index': '1',
            'opacity': '1'
        });
        $('.img2, .img3').css({
            'z-index': '0',
            'opacity': '0'
        });
    });

    $('.card2').hover(function () {
        $('.img2').css({
            'z-index': '1',
            'opacity': '1'
        });
        $('.img1, .img3').css({
            'z-index': '0',
            'opacity': '0'
        });
    });

    $('.card3').hover(function () {
        $('.img3').css({
            'z-index': '1',
            'opacity': '1'
        });
        $('.img1, .img2').css({
            'z-index': '0',
            'opacity': '0'
        });
    });
});

// Script For Animation

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.growth-card');
    const section = document.getElementById('content-3');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                cards.forEach((card, index) => {
                    card.classList.add('visible');
                    card.style.transitionDelay = `${index * 0.3}s`;

                    const countElement = card.querySelector('.grow-count');
                    const targetCount = parseInt(countElement.textContent.replace(/\D/g, ''));
                    countElement.textContent = '0';

                    const count = (target) => {
                        let currentCount = 0;
                        const increment = target / 100;

                        const counter = setInterval(() => {
                            currentCount += increment;
                            if (currentCount >= target) {
                                clearInterval(counter);
                                countElement.textContent = target + '+';
                            } else {
                                countElement.textContent = Math.floor(currentCount) + '+';
                            }
                        }, 20);
                    };
                    card.addEventListener('transitionend', () => {
                        if (card.classList.contains('visible')) {
                            count(targetCount);
                        }
                    });
                });
            } else {
                cards.forEach((card) => {
                    card.classList.remove('visible');
                });
            }
        });
    }, options);

    observer.observe(section);
});


//Header
document.addEventListener('DOMContentLoaded', function () {
    const description = document.querySelector('.description');
    const headerImg = document.querySelector('.header_img img');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === description) {
                    entry.target.classList.add('visible');
                } else if (entry.target === headerImg) {
                    entry.target.classList.add('visible');
                }
            }
        });
    }, options);

    observer.observe(description);
    observer.observe(headerImg);
});


//Content

document.addEventListener('DOMContentLoaded', function () {
    const service = document.querySelector('.service');
    const serviceText = document.querySelector('.service-text');
    const carousel = document.querySelector('.owl-carousel');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, options);

    observer.observe(service);
    observer.observe(serviceText);
    observer.observe(carousel);
});

//Content-2
document.addEventListener('DOMContentLoaded', function () {
    const elementsToObserve = [
        document.querySelectorAll('.select-us'),
        document.querySelectorAll('.select-us-2'),
        document.querySelectorAll('.features-left'),
        document.querySelectorAll('.features-right'),
        document.querySelectorAll('.our-project-img img'),
        document.querySelectorAll('.our-project-card')
    ];

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('select-us') || entry.target.classList.contains('select-us-2')) {
                    entry.target.classList.add('visible-delay');
                } else {
                    entry.target.classList.add('visible');
                }
            }
        });
    }, options);

    elementsToObserve.forEach(group => {
        group.forEach(element => observer.observe(element));
    });
});


//Form Handling

document.addEventListener('DOMContentLoaded', function () {
    const formGroups = document.querySelectorAll('.form-group');

    formGroups.forEach(formGroup => {
        const input = formGroup.querySelector('input');

        input.addEventListener('blur', function () {
            const inputValue = this.value.trim();
            const label = formGroup.querySelector('label');

            console.log('Input value:', inputValue);
            console.log('Label:', label);

            if (inputValue !== '') {
                label.classList.add('filled');
            } else {
                label.classList.remove('filled');
            }
        });
    });

    const closeFormBtn = document.getElementById('closeFormBtn');
    const formContainer = document.getElementById('contactFormContainer');
    const header = document.getElementById('header');

    closeFormBtn.addEventListener('click', function () {
        formContainer.style.opacity = 0;
        formContainer.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => {
            formContainer.style.display = 'none';
        }, 800);

        header.style.opacity = 1;
        header.style.filter = 'none';
        document.body.classList.remove('no-scroll');
    });

    document.getElementById('showFormBtn').addEventListener('click', function () {
        formContainer.style.display = 'block';
        // Trigger the transition by updating opacity and scale
        setTimeout(() => {
            formContainer.style.opacity = 1;
            formContainer.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 0);

        header.style.opacity = 0.5;
        header.style.filter = 'blur(5px)';
        document.body.classList.add('no-scroll');
    });

    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        fetch("https://getform.io/f/amdpkjrb", {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json",
            },
        })
            .then(response => {
                if (response.ok) {
                    alert('Form submitted successfully!');
                    form.reset();

                    formContainer.style.opacity = 0;
                    formContainer.style.transform = 'translate(-50%, -50%) scale(0)';
                    setTimeout(() => {
                        formContainer.style.display = 'none';
                    }, 800);

                    header.style.opacity = 1;
                    header.style.filter = 'none';
                    document.body.classList.remove('no-scroll');
                } else {
                    alert('Form submission failed. Please try again.');
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                alert('An error occurred. Please try again.');
            });
    });
});











