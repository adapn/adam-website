let teleportCount = 0;
let currentImageIndex = 0;

const images = [
    'straight face emoji.png',
    'sideeyecat.png',
    'ragedog.PNG',
    'ragecat.PNG',
    'catscared.PNG',
    'emoji side eye.PNG',
    'kidrage.PNG',
    'mrindc.PNG',
    'decline.PNG'

];

function teleportButton() {
    const button = document.getElementById('noButton');
    const container = document.querySelector('.container');

    teleportCount++;

    if (teleportCount >= 5) {
        showNextImage();
        button.removeEventListener('mouseover', teleportButton);
        return;
    }

    const containerRect = container.getBoundingClientRect();
    const maxX = containerRect.width - button.offsetWidth;
    const maxY = containerRect.height - button.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
}

// Falling Hearts + Countdown Trigger
function triggerHearts() {
    // Trigger 3 bursts of hearts
    const bursts = 10;
    const heartsPerBurst = 150;
    const delayBetweenBursts = 1000;

    for (let burst = 0; burst < bursts; burst++) {
        setTimeout(() => {
            for (let i = 0; i < heartsPerBurst; i++) {
                createHeart();
            }
        }, burst * delayBetweenBursts);
    }

    changeBackgroundToHearts();

    // Show Countdown After Hearts
    setTimeout(showCountdown, 3000); // Show after 3.5 seconds
}


function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '❤️';

    heart.style.color = 'rgba(100, 100, 100, 0.25)';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 20 + 'px';
    heart.style.animationDuration = Math.random() * 1 + 3 + 's';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 4000);
}

function changeBackgroundToHearts() {
    document.body.classList.add('hearts-background');
}

// Image Cycling Function
function showNextImage() {
    const imageElement = document.createElement('img');
    imageElement.src = images[currentImageIndex];
    imageElement.classList.add('cycle-image');

    document.body.appendChild(imageElement);

    currentImageIndex = (currentImageIndex + 1) % images.length;

    setTimeout(() => {
        imageElement.classList.add('fade-out');
        setTimeout(() => imageElement.remove(), 2000);
    }, 3000);
}
// Smooth Scroll Function
function scrollToValentines() {
    const valentinesSection = document.getElementById("valentines-section");
    valentinesSection.scrollIntoView({
        behavior: "smooth"  // Smooth scroll effect
    });
}

// Apply to the existing "Smitskis" element
const smitskisElement = document.querySelector('.you-receive p');  // Adjust selector if needed
smitskisElement.addEventListener('click', scrollToValentines);


function scrollToTop() {
    const scrollDuration = 2000; // 2 seconds for a smooth glide
    const startPosition = window.pageYOffset;
    const startTime = performance.now();

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const position = easeInOutQuad(elapsed, startPosition, -startPosition, scrollDuration);
        window.scrollTo(0, position);

        if (elapsed < scrollDuration) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
}

// Show Countdown Section and Start Timer
function showCountdown() {
    const countdownSection = document.getElementById("countdown-section");
    const countdownTimer = document.getElementById("countdown-timer");

    // Display the Countdown Section
    countdownSection.style.display = "block";

    // Smooth Scroll to Countdown Section
    countdownSection.scrollIntoView({
        behavior: "smooth"
    });

    // Set Target Date (April 1, 2026)
    const targetDate = new Date("April 1, 2026 00:00:00");

    // Update Countdown Every Second
    const timer = setInterval(() => {
        const now = new Date();
        const timeLeft = targetDate - now;

        if (timeLeft <= 0) {
            clearInterval(timer);
            countdownTimer.textContent = "WE MADE IT! 🎉";
        } else {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
            const seconds = Math.floor((timeLeft / 1000) % 60);

            countdownTimer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }, 1000);
}

