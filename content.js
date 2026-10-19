
console.log("Reels Tracker started!");

let lastReelId = null; //store last reelID processed, null means no reelID processed
let checking = false; //it means if a tracker processing reelID, if false then not processing

async function checkReel() {
  if (checking) return;

  console.log("Checking URL:", window.location.pathname);

  const match = window.location.pathname.match(
    /^\/reels?\/([^/]+)\/?$/
  );

  if (!match) {
    console.log("Not a reel URL");
    return;
  }

  const reelId = match[1];

  if (reelId === lastReelId) return;

  checking = true;

  try {
    const today = new Date().toLocaleDateString("en-CA");

    const data = await chrome.storage.local.get("daily");
    const daily = data.daily || {};
    const viewed = daily[today] || [];

    if (!viewed.includes(reelId)) {
      viewed.push(reelId);
      daily[today] = viewed;

      await chrome.storage.local.set({ daily });

      console.log("NEW REEL COUNTED:", reelId);
      console.log("TOTAL REELS TODAY:", viewed.length);
    } else {
      console.log("Already counted:", reelId);
    }

    lastReelId = reelId;
  } catch (error) {
    console.error("Tracker error:", error);
  } finally {
    checking = false;
  }
}

checkReel();
setInterval(checkReel, 500);
