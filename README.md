# Instagram Reels Tracker

A lightweight Chrome extension that automatically tracks the number of unique Instagram Reels viewed in a browser.

Built using **JavaScript, HTML, CSS, and Chrome Extension Manifest V3**, this project helps users understand their Instagram Reels browsing habits.

## Features

- **Automatic Reel Detection:** Detects Instagram Reels through URL changes.
- **Unique Reel Counting:** Counts each Reel ID only once per day.
- **Duplicate Prevention:** Prevents previously viewed reels from being counted again on the same day.
- **Daily Tracking:** Maintains separate viewing records for each day.
- **Persistent Storage:** Saves viewing data locally using the Chrome Storage API.
- **Popup Dashboard:** Displays the total number of unique reels viewed today.

## Tech Stack

| Technology | Purpose |
|---|---|
| JavaScript | Reel detection and tracking logic |
| HTML5 | Extension popup structure |
| CSS3 | Popup interface styling |
| Chrome Extension Manifest V3 | Extension configuration |
| Chrome Storage API | Persistent local data storage |
| Regular Expressions | Extracting Reel IDs from URLs |

## How It Works

1. The extension runs a content script when Instagram is opened in Chrome.
2. JavaScript monitors the current Instagram URL.
3. A regular expression extracts the Reel ID.
4. The extension checks whether that Reel ID has already been recorded today.
5. New Reel IDs are saved using `chrome.storage.local`.
6. The popup displays the total number of unique reels viewed today.

**Example:**

If a user watches Reel A → Reel B → Reel C → Reel A, the tracker displays **3 unique reels**, because Reel A is counted only once.

## Project Structure

```text
reels-tracker/
├── manifest.json
├── content.js
├── popup.html
├── popup.js
└── style.css
```

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/pradeeporaon/instagram-reels-tracker.git
   ```

2. Open Google Chrome.
3. Navigate to `chrome://extensions`.
4. Enable **Developer mode**.
5. Click **Load unpacked**.
6. Select the cloned project folder.
7. Open Instagram Reels and start browsing.
8. Click the Reels Tracker icon to view your count.

No backend server, database installation, or additional dependencies are required.

## Current Limitations

- Counts unique Reel IDs rather than every replay.
- Depends on Instagram exposing Reel IDs in URLs.
- Does not yet reliably identify every Reel transition when the URL remains unchanged.
- Designed for Instagram's desktop website in Chrome.

## Future Improvements

- DOM-based video detection using `MutationObserver`
- More reliable reel transition tracking
- Total reel encounters, including revisits
- Time spent watching reels
- Daily and weekly analytics
- Custom viewing limits and notifications
- Improved dashboard interface

## Development Status

**Phase 1 — Completed:** URL-based reel detection, unique counting, Chrome Storage integration, and popup interface.

**Phase 2 — In Development:** DOM observation and video change detection.

## Author

Developed by [pradeeporaon](https://github.com/pradeeporaon).

## Disclaimer

This is an independent educational project and is not affiliated with or endorsed by Instagram or Meta.
