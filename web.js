// web.js
let animationInProgress = false; // Prevent re-triggering animation if already running

function toggleDarkMode() {
    document.body.classList.toggle("light-mode");
    const themeIcon = document.getElementById("theme-icon");
    const themeText = document.getElementById("theme-text"); // Get the span for text
    const siteLogo = document.querySelector('.site-logo'); // Get the logo image

    // Get social media icons
    const facebookIcon = document.getElementById('facebook-icon');
    const instagramIcon = document.getElementById('instagram-icon');
    const gmailIcon = document.getElementById('gmail-icon');

    if (document.body.classList.contains("light-mode")) {
        // Switch to sun icon for light mode
        themeIcon.src = "images/sun.png"; // Sun icon from images folder
        themeIcon.alt = "Light Mode Icon";
        // Assuming sun.png is black, so filter: invert(0) keeps it black.
        themeIcon.style.filter = "invert(0)";
        themeText.textContent = "Light Mode"; // Change text to "Light Mode"
        if (siteLogo) {
            // Logo is WHITE by default (assumed), and user wants it BLACK in light mode. So, invert(1) makes it black.
            siteLogo.style.filter = "invert(1)";
        }
        // Social media icons: original are WHITE, so invert(1) to make them BLACK in light mode
        if (facebookIcon) facebookIcon.style.filter = "invert(1)";
        if (instagramIcon) instagramIcon.style.filter = "invert(1)";
        if (gmailIcon) gmailIcon.style.filter = "invert(1)";

    } else {
        // Switch to moon icon for dark mode
        themeIcon.src = "images/moon-and-stars-14.png"; // Moon icon from images folder
        themeIcon.alt = "Dark Mode Icon";
        // Assuming moon-and-stars-14.png is WHITE, so filter: invert(0) keeps it white.
        themeIcon.style.filter = "invert(0)";
        themeText.textContent = "Dark Mode"; // Change text to "Dark Mode"
        if (siteLogo) {
            // Logo is WHITE by default (assumed), and user wants it WHITE in dark mode. So, invert(0) keeps it white.
            siteLogo.style.filter = "invert(0)";
        }
        // Social media icons: original are WHITE, so invert(0) to keep them WHITE in dark mode
        if (facebookIcon) facebookIcon.style.filter = "invert(0)";
        if (instagramIcon) instagramIcon.style.filter = "invert(0)";
        if (gmailIcon) gmailIcon.style.filter = "invert(0)";
    }
}

function navigate(section) {
    alert(`Navigation to ${section.toUpperCase()} section is under construction.`);
}

function startAvatarAnimation() {
    if (animationInProgress) return;
    animationInProgress = true;

    const avatarContainer = document.querySelector('.avatar-animation-container');
    // Disable pointer events on the container during animation
    avatarContainer.style.pointerEvents = 'none';

    const states = [
        avatarContainer.querySelector('[data-state="initial"]'), // Initial tech frame
        avatarContainer.querySelector('[data-state="text1"]'),
        avatarContainer.querySelector('[data-state="text2"]'),
        avatarContainer.querySelector('[data-state="text3"]'),
        avatarContainer.querySelector('[data-state="text4"]'),
        avatarContainer.querySelector('[data-state="text5"]'),
        avatarContainer.querySelector('[data-state="text6"]'),
        avatarContainer.querySelector('[data-state="text7"]'), // Final text state
        avatarContainer.querySelector('[data-state="final"]')   // Final profile image
    ];

    let currentIndex = 0; // Keep track of current visible state

    // Function to hide all states
    function hideAllStates() {
        states.forEach(state => {
            state.classList.remove('active', 'fade-out');
            state.style.transition = ''; // Reset transition to allow instant changes
        });
    }

    // Sequence for text states and then final image
    const sequence = [
        { stateIndex: 1, duration: 300, transition: 'instant' }, // "// sudo load_avatar -u Jacob"
        { stateIndex: 2, duration: 300, transition: 'instant' }, // "// Initializing pixels..."
        { stateIndex: 3, duration: 300, transition: 'instant' }, // "// Locating profile image..."
        { stateIndex: 4, duration: 300, transition: 'instant' }, // "// Data chunk 1/3... OK"
        { stateIndex: 5, duration: 300, transition: 'instant' }, // "// Data chunk 2/3... OK"
        { stateIndex: 6, duration: 300, transition: 'instant' }, // "// Data chunk 3/3... OK"
        { stateIndex: 7, duration: 500, transition: 'instant' }, // "// Avatar loaded ♥"
        { stateIndex: 8, duration: 800, transition: 'fade' }   // Final avatar state (profile.jpg)
    ];

    function runSequence(i) {
        if (i >= sequence.length) {
            animationInProgress = false; // Animation finished
            // After animation, ensure pointer events are disabled on the container for the final state
            avatarContainer.style.pointerEvents = 'none'; 
            return;
        }

        const { stateIndex, duration, transition } = sequence[i];
        const previousState = states[currentIndex];
        const nextState = states[stateIndex];

        if (transition === 'instant') {
            hideAllStates(); // Hide all to ensure only one is active
            nextState.classList.add('active');
            currentIndex = stateIndex; // Update current index
        } else if (transition === 'fade') {
            if (previousState) {
                previousState.style.transition = 'opacity 0.8s ease-out'; // Apply fade transition
                previousState.classList.add('fade-out'); // Trigger fade-out
            }
            nextState.classList.add('active'); // Immediately make next state active (it will fade in)
            currentIndex = stateIndex; // Update current index

            // Remove previous state's active class after fade-out completes
            setTimeout(() => {
                if (previousState) {
                    previousState.classList.remove('active', 'fade-out');
                    previousState.style.transition = ''; // Reset transition
                }
            }, duration);
        }

        setTimeout(() => {
            runSequence(i + 1);
        }, duration);
    }

    // Reset all states and show initial avatar before starting animation
    hideAllStates();
    states[0].classList.add('active');

    // Start animation after a short delay to see the initial state
    setTimeout(() => {
        runSequence(0);
    }, 500);
}