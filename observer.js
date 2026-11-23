
console.log("Phase 2 observer started!");

// Remember the previously detected video
let lastVideo = null;
let lastSource = null;
let lastPath = null;

// Find the video occupying the largest visible area
function findActiveVideo() {

    const videos = document.querySelectorAll("video");

    let activeVideo = null;
    let largestArea = 0;

    for (const video of videos) {

        const rect = video.getBoundingClientRect();

        const visibleWidth = Math.max(
            0,
            Math.min(rect.right, window.innerWidth) -
            Math.max(rect.left, 0)
        );

        const visibleHeight = Math.max(
            0,
            Math.min(rect.bottom, window.innerHeight) -
            Math.max(rect.top, 0)
        );

        const area = visibleWidth * visibleHeight;

        if (area > largestArea) {
            largestArea = area;
            activeVideo = video;
        }
    }

    return activeVideo;
}


// Detect video changes
function checkVideoChange() {

    const path = window.location.pathname;

    // Extract Reel ID
    const match = path.match(/^\/reels?\/([^/]+)\/?$/);

    if (!match) {

        lastVideo = null;
        lastSource = null;
        lastPath = null;

        return;
    }

    const reelId = match[1];

    const video = findActiveVideo();

    if (!video) return;

    const source = video.currentSrc || video.src;

    // Check whether video, source or URL has changed
    if (
        video !== lastVideo ||
        source !== lastSource ||
        path !== lastPath
    ) {

        console.log("VIDEO CHANGE DETECTED!");
        console.log("Current URL:", path);
        console.log("Reel ID:", reelId);
        console.log("Video Source:", source || "(not available)");

        lastVideo = video;
        lastSource = source;
        lastPath = path;

        // Send Reel ID to content.js for counting
        if (typeof window.handleReelDetected === "function") {

            window.handleReelDetected(reelId);

        } else {

            console.warn("Reel counting function not available!");
        }
    }
}


// Observe changes in Instagram's DOM
let scheduled = false;

const domObserver = new MutationObserver(() => {

    if (scheduled) return;

    scheduled = true;

    setTimeout(() => {

        scheduled = false;
        checkVideoChange();

    }, 250);
});

domObserver.observe(document.documentElement, {
    childList: true,
    subtree: true
});


// Periodically check for video changes
setInterval(checkVideoChange, 800);

// Initial check
checkVideoChange();
