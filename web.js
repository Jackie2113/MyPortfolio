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
    let targetPage = '';
    switch (section) {
        case 'journey':
            targetPage = 'journey.html';
            break;
        case 'works':
            targetPage = 'works.html';
            break;
        case 'experience':
            targetPage = 'experience.html';
            break;
        default:
            targetPage = 'index.html'; // Fallback to index if something goes wrong
    }
    if (targetPage) {
        window.location.href = targetPage; // Redirects the browser to the new page
    }
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
        { stateIndex: 8, duration: 800, transition: 'fade' }    // Final avatar state (profile.jpg)
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

const years = [
  {
    year: 2003,
    title: "The Beginning",
    text: "Born into a world full of ideas and potential. Even as a child, I was curious and eager to understand how things work."
  },
  {
    year: 2019,
    title: "Milestone Moment",
    text: "Completed 10th grade. I began to seriously explore my interests in science and art, laying the groundwork for creative expression."
  },
  {
    year: 2021,
    title: "A Step Closer",
    text: "Graduated 12th. My passion for design, electronics, and visual media became clearer, guiding me into engineering."
  },
  {
    year: 2025,
    title: "Coming of Age",
    text: "Graduation from IIT Tirupati (expected). A moment that marks the start of a bigger journey beyond academics, toward identity and impact."
  }
];

let currentYearIndex = -1;

window.addEventListener("DOMContentLoaded", () => {
  // Timeline starts only after BEGIN is clicked
  if (window.innerWidth <= 768) {
    buildMobileJourney();
  }
});

function startJourney() {
  document.getElementById("journeyIntro").style.display = "none";
  const wrapper = document.getElementById("timelineWrapper");
  wrapper.classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("timelineLine").classList.add("visible");
  }, 300);

  injectTimeline();
  showYearDetail(0);
}

function injectTimeline() {
  const line = document.getElementById("timelineLine");
  line.innerHTML = "";

  const baseYear = years[0].year;
  const yearOffsets = years.map(y => y.year - baseYear);
  const maxOffset = yearOffsets[yearOffsets.length - 1] + 5;

  years.forEach((entry, idx) => {
    const gapPercent = (yearOffsets[idx] / maxOffset) * 100;

    const dot = document.createElement("div");
    dot.className = "timeline-dot";
    dot.style.left = `calc(${gapPercent}% - 10px)`;
    dot.style.pointerEvents = "auto";
    dot.onclick = () => showYearDetail(idx);

    setTimeout(() => {
      dot.classList.add("show");
    }, 500 + idx * 300);

    const label = document.createElement("div");
    label.className = "timeline-label";
    label.textContent = entry.year;
    label.style.left = `calc(${gapPercent}% - 20px)`;
    label.style.top = idx % 2 === 0 ? "-2.5rem" : "1.5rem";

    line.appendChild(dot);
    line.appendChild(label);
  });
}

function showYearDetail(index) {
  if (index === currentYearIndex) return;
  currentYearIndex = index;

  const detail = document.getElementById("timelineDetail");
  detail.classList.remove("visible");

  setTimeout(() => {
    const year = years[index];
    detail.innerHTML = `
      <h3>${year.year} — ${year.title}</h3>
      <p>${year.text}</p>
    `;
    detail.classList.add("visible");
  }, 300);

  document.querySelectorAll(".timeline-dot").forEach(dot => dot.classList.remove("active"));
  document.querySelectorAll(".timeline-dot")[index].classList.add("active");
}

function goToPrevYear() {
  if (currentYearIndex > 0) {
    showYearDetail(currentYearIndex - 1);
  }
}

function goToNextYear() {
  if (currentYearIndex < years.length - 1) {
    showYearDetail(currentYearIndex + 1);
  } else {
    const detail = document.getElementById("timelineDetail");
    detail.classList.remove("visible");
    setTimeout(() => {
      detail.innerHTML = "<h3>2030+</h3><p>More memories and milestones to come...</p>";
      detail.classList.add("visible");
    }, 300);
  }
}

function buildMobileJourney() {
  const list = document.getElementById("mobileYearList");

  years.forEach((entry, idx) => {
    const item = document.createElement("li");
    item.textContent = `${entry.year}`;
    item.onclick = () => showMobileDetail(idx, item);
    list.appendChild(item);
  });
}

function showMobileDetail(index, clickedItem) {
  const allItems = document.querySelectorAll("#mobileYearList li");
  allItems.forEach(li => {
    li.classList.remove("active");
    const next = li.nextElementSibling;
    if (next && next.classList.contains("mobile-detail")) {
      next.remove();
    }
  });

  clickedItem.classList.add("active");

  const detail = document.createElement("div");
  detail.className = "mobile-detail";
  detail.innerHTML = `
    <strong>${years[index].title}</strong><br/>
    ${years[index].text}
  `;

  clickedItem.insertAdjacentElement("afterend", detail);
  setTimeout(() => {
    detail.classList.add("visible");
  }, 50);
}

function openWorkModal(imageSrc, title, description, link = null) {
  const modal = document.getElementById("workModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalLink = document.getElementById("modalLink");
  const linkText = document.getElementById("linkText");

  modalImage.src = imageSrc;
  modalTitle.textContent = title;
  modalDescription.textContent = description;

  if (link) {
    modalLink.href = link;
    modalLink.classList.remove("no-link");
    modalLink.setAttribute("aria-disabled", "false");
    modalLink.setAttribute("tabindex", "0");
    linkText.textContent = "View Project";
  } else {
    modalLink.href = "javascript:void(0)";
    modalLink.classList.add("no-link");
    modalLink.setAttribute("aria-disabled", "true");
    modalLink.setAttribute("tabindex", "-1");
    linkText.textContent = "No Link Available";
  }

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}


function closeWorkModal() {
  const modal = document.getElementById("workModal");
  const content = document.querySelector(".work-modal-content");

  modal.classList.add("fade-out");

  // Delay full close until animation ends
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("fade-out");
    document.body.style.overflow = "auto";
  }, 400); // Match duration of fadeOutDown
}

// ESC key closes the modal
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeWorkModal();
});

// Clicking outside modal content closes the modal
function handleModalClick(e) {
  const content = document.querySelector(".work-modal-content");
  if (!content.contains(e.target)) {
    closeWorkModal();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-audio");
  const muteToggle = document.getElementById("mute-toggle");
  const widget = document.querySelector(".audio-widget");
  const progressBar = document.getElementById("audio-progress");
  const hint = document.getElementById("audio-hint");
  const text = document.getElementById("scrolling-text");

  const songs = [
    { file: "songs/song1.mp3", name: "Pink Blue - Tsumyoki x Bharg" },
    { file: "songs/song2.mp3", name: "Forget about Everything - Marcus Warner" },
    { file: "songs/song3.mp3", name: "Little Bit More - Suriel Hess" }
  ];

  let currentIndex = Math.floor(Math.random() * songs.length);

  function loadAndPlay(index) {
    const song = songs[index];
    audio.src = song.file;
    audio.load();
    audio.volume = 0.1;
    audio.play().then(() => {
      console.log("🔇 Playing muted...");
    }).catch((err) => {
      console.warn("Autoplay blocked:", err);
    });
    text.textContent = song.name;

    // Enable bouncing animation if it's too wide
    requestAnimationFrame(() => {
    const container = document.getElementById("song-name");
    const overflow = text.scrollWidth - container.clientWidth;
    if (overflow > 0) {
      text.classList.add("bounce-scroll");
      text.style.setProperty('--scroll-amount', `${overflow}px`);
    } else {
      text.classList.remove("bounce-scroll");
      text.style.removeProperty('--scroll-amount');
    }
  });
  
  }

  // Apply default mute once (to pass autoplay rules)
  audio.muted = true;

  loadAndPlay(currentIndex);

  // Next song on end
  audio.addEventListener("ended", () => {
    currentIndex = (currentIndex + 1) % songs.length;
    loadAndPlay(currentIndex);
  });

  // Progress fill
  audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    const isLight = document.body.classList.contains("light-mode");
    const fillColor = isLight ? "#000" : "#fff";
    const emptyColor = isLight ? "#ccc" : "#777";
    progressBar.style.background = `linear-gradient(to right, ${fillColor} ${progress}%, ${emptyColor} ${progress}%)`;
  });

  // 🔓 Only first click anywhere unblocks audio (but not unmute toggle)
  window.addEventListener("click", () => {
    if (audio.muted) {
      audio.muted = false;
      widget.classList.remove("audio-muted");
      if (hint) {
        hint.style.opacity = "0";
        setTimeout(() => hint.remove(), 600);
      }
    }
  }, { once: true });

  // 🔊 Only the wave toggles mute/unmute
  muteToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent it from being treated as the first unmute gesture
    audio.muted = !audio.muted;
    widget.classList.toggle("audio-muted", audio.muted);
  });

  // Show hint only once
  if (localStorage.getItem("audioHintAcknowledged")) {
    if (hint) hint.remove();
  }

  // Unmute on first click (anywhere), and remove hint
  window.addEventListener("click", () => {
  if (audio.muted) {
    audio.muted = false;
    widget.classList.remove("audio-muted");

    if (hint) {
      hint.classList.add("fade-out");
      setTimeout(() => hint.remove(), 800); // Optional: add easing
    }

    localStorage.setItem("audioHintAcknowledged", "true");
  }
  }, { once: true });

});


// document.addEventListener("DOMContentLoaded", () => {
//   const audio = document.getElementById("bg-audio");
//   audio.src = "songs/song1.mp3";
//   audio.volume = 1.0;  // Max volume just for test
//   audio.muted = false;

//   audio.play().then(() => {
//     console.log("✅ Audio is playing!");
//   }).catch(err => {
//     console.warn("⚠️ Autoplay blocked. Trying muted fallback.");

//     audio.muted = true;
//     audio.play().then(() => {
//       console.log("🔇 Playing muted. Click anywhere to unmute.");

//       // Add unmute on click
//       window.addEventListener("click", () => {
//         audio.muted = false;
//         console.log("🔊 Unmuted by user gesture.");
//       }, { once: true });
//     });
//   });
// });