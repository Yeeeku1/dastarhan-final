# Dastarhan Restaurant — Final Project

A final continuation of the group’s earlier Dastarhan website. The project keeps its Kazakh restaurant topic, group, six-page structure, responsive design, and earlier interactions. The final version adds live weather data, object-oriented JavaScript, saved celebration plans, and persistent menu ordering.

## Group

- Yerasyl
- Dosymzhan
- Dastan
- Group: SE-2527

## Pages and files

- `index.html` — Home, featured dishes, and current Astana weather
- `about.html` — Restaurant story and Kazakh hospitality
- `menu.html` — Searchable, filterable, sortable menu, favorites, sample order, and semantic price table
- `gallery.html` — Keyboard-accessible photo gallery and jQuery lightbox
- `reservation.html` — Validated reservation request and celebration-plan manager
- `contact.html` — Contact and visit details
- `styles.css` — Shared design, Bootstrap-compatible layout, themes, and responsive breakpoints
- `data.js` — Menu records and weather API URL
- `app.js` — JavaScript classes, API handling, DOM rendering, validation, CRUD, storage, and jQuery interactions
- `DEFENCE-STUDY-GUIDE.md` — Theory-only oral defence review in English and Chinese
- `.github/workflows/pages.yml` — GitHub Pages deployment workflow

## Features

### Continued from the previous project

- Six connected pages with a shared navigation bar and footer
- Responsive layout using semantic HTML, CSS Flexbox, CSS Grid, Bootstrap grid and utility classes, and mobile navigation
- Menu search, category filter, favorites, sample order, item totals, and a semantic HTML table
- Light/dark theme preference saved in browser storage
- Gallery lightbox with mouse and keyboard controls; jQuery animations for the lightbox and menu guide
- Reservation form with custom field validation and accessible status messages

### New final-project features

1. **Live weather API:** Asynchronous Open-Meteo request for Astana with loading, success, empty, error, and retry states.
2. **OOP architecture:** `JsonStore`, `CelebrationPlan`, `WeatherWidget`, `RestaurantMenu`, `ThemeController`, `ReservationForm`, and `EventPlanner` classes.
3. **Celebration planner CRUD:** Create, read, update, and delete gathering plans; a small dashboard counts plans, guest seats, and the next date.
4. **Persistent sample order:** Cart items are restored, updated, and cleared through localStorage, along with favorites and theme preferences.
5. **Advanced menu sort:** Sort filtered dishes by name or price in either direction.

## API information

The home page requests current temperature, apparent temperature, humidity, weather code, and wind speed from the Open-Meteo Forecast API. Coordinates are set for Astana, Kazakhstan (51.1694, 71.4491), with `Asia/Almaty` time zone. The API does not require an access key for this public use. The page checks the HTTP response, parses JSON, validates the current-data object, and safely inserts displayed values as text nodes. If a request fails, the page shows a retry control.

API documentation: [Open-Meteo Forecast API](https://open-meteo.com/en/docs).

## Data and privacy

Favorites, the sample order, theme, and celebration plans are stored only in the visitor’s browser using JSON in `localStorage`. Invalid saved values fall back to safe defaults. Data is not uploaded to a server and does not synchronize between devices. The reservation form validates entries but intentionally does not send or save booking details. Do not use the sample planner for sensitive personal information.

## Run and try the project

1. Download or clone the repository.
2. Open `index.html` in a browser, or visit the deployed website.
3. Use **Menu** to search, filter, sort, save favorites, add items, remove them, and reload the page to see the sample order restored.
4. Use the navigation theme button and open another page to see the theme preference retained.
5. Open **Reservations** to test invalid and valid reservation form entries. Under **Plan a gathering**, save a plan, edit it, delete it, and refresh to see the saved plan persist.
6. Open **Gallery** to select an image, use the close button, or press Escape. On **Home**, the weather panel loads from Open-Meteo; try the retry control if the service is unavailable.

Bootstrap, jQuery, Google Fonts, and Unsplash images are loaded from external services, so an internet connection is needed. The site is a static front-end project; bookings are not transmitted and local browser data has no shared server backup.

## Suggested group contribution and defence

- **Yerasyl:** shared page structure, responsive styling, weather API states, and OOP overview.
- **Dosymzhan:** menu records, search/filter/sort, favorites, sample order, and JSON storage.
- **Dastan:** form validation, celebration-plan CRUD, dashboard, and jQuery gallery behaviors.

Every member should be ready to explain the whole project. Use the theory-only bilingual practice guide for individual preparation.

## Published project

- Repository: https://github.com/Yeeeku1/dastarhan-final
- Website: https://yeeeku1.github.io/dastarhan-final/

