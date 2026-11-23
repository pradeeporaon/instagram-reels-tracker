
console.log("Reels Tracker started!");

// Prevent the same Reel from being processed simultaneously
const pendingReels = new Set();

// This function will be called by observer.js
window.handleReelDetected = async function (reelId) {

    if (!reelId) return;

    // Avoid duplicate processing while storage is being updated
    if (pendingReels.has(reelId)) return;

    pendingReels.add(reelId);

    try {
        const today = new Date().toLocaleDateString("en-CA");

        // Get existing daily Reel data
        const data = await chrome.storage.local.get("daily");

        const daily = data.daily || {};
        const viewed = Array.isArray(daily[today])
            ? daily[today]
            : [];

        // Check whether this Reel was already counted
        if (!viewed.includes(reelId)) {

            viewed.push(reelId);
            daily[today] = viewed;

            // Save updated data
            await chrome.storage.local.set({ daily });

            console.log("NEW REEL COUNTED:", reelId);
            console.log("TOTAL REELS TODAY:", viewed.length);

        } else {
            console.log("Already counted:", reelId);
        }

    } catch (error) {
        console.error("Tracker error:", error);

    } finally {
        pendingReels.delete(reelId);
    }
};
