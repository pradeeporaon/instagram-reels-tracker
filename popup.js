
async function updateCount() {
  const today = new Date().toLocaleDateString("en-CA");
  const data = await chrome.storage.local.get("daily");

  const daily = data.daily || {};
  const viewed = daily[today] || [];

  document.getElementById("count").textContent =
    viewed.length;
}

updateCount();

chrome.storage.onChanged.addListener(updateCount);
