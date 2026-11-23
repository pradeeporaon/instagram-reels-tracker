
console.log("Phase 2 observer started!");

// Remember the previously detected video
let lastVideo = null;
let lastSource = null;

// Find the video occupying the largest visible area
function findActiveVideo() {
  const videos = document.querySelectorAll("video");

 // console.log("CHECK VIDEO FUNCTION RUNNING");
  //console.log("VIDEOS FOUND:", videos.length);

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

// Check whether the active video has changed
function checkVideoChange() {
  const path = window.location.pathname

  // Only detect videos on Instagram Reels pages
  if (!/^\/reels?(\/|$)/.test(path)) {
    lastVideo = null;
    lastSource = null;
    return;
  }

  const video = findActiveVideo();

  if (!video) return;

  const source = video.currentSrc || video.src;

  // Check if the video element or source changed
  if (video !== lastVideo || source !== lastSource) {
    console.log("VIDEO CHANGE DETECTED!");
    console.log("Current URL:", path);
    console.log("Video Source:", source || "(not available)");

    lastVideo = video;
    lastSource = source;
  }
}

// Observe changes to Instagram's HTML
let scheduled = false;

const observer = new MutationObserver(() => {
  if (scheduled) return;

  scheduled = true;

  setTimeout(() => {
    scheduled = false;
    checkVideoChange();
  }, 250);
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});

// Check periodically for video changes
setInterval(checkVideoChange, 800);

// Run the first check immediately
checkVideoChange();
