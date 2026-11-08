# Dastarhan Endterm Project

A continuation of the Dastarhan Kazakh restaurant website created for the SE-2527 midterm. The same topic, six connected pages, responsive layout, shared navigation, and visual style are preserved. This endterm adds interactive JavaScript and jQuery features.

## Group

- Yerasyl
- Dosymzhan
- Dastan

## Pages and files

- `index.html` — Home
- `about.html` — Our Story
- `menu.html` — Interactive menu and semantic price table
- `gallery.html` — Keyboard accessible photo gallery
- `reservation.html` — Reservation request form with custom validation
- `contact.html` — Contact and visit information
- `styles.css` — Shared responsive design and light/dark themes
- `app.js` — Menu data, DOM rendering, interactions, and booking validation
- `.github/workflows/pages.yml` — Publishes the site from `main` to GitHub Pages

## Endterm features

- Menu search and course filters built from a JavaScript dishes array
- Favorite dishes saved in browser local storage
- Sample order with add, remove, clear, item count, and live estimated total
- Light/dark theme switch saved between pages
- Gallery lightbox with click, Enter, Space, and Escape support
- Expandable menu help panel using jQuery animation
- Reservation form validation for name, email, phone, guest count, date, and time, with field-level messages and a success state
- Responsive menu and gallery controls for desktop and mobile

## How to try the features

1. Open `index.html` or visit the published GitHub Pages website.
2. Open **Menu**. Search for a dish, choose a course, save a favorite, and add dishes to the sample order. Try removing one item and clearing the selection.
3. Change the color theme with the navigation button. Open another page to see that the choice is remembered.
4. Open **Gallery**. Select a photo, then close it with the close button, by clicking the dark background, or by pressing Escape. Keyboard users can focus an image and press Enter or Space.
5. Open **Reservations**. Submit an empty or invalid form to see specific messages. Complete all fields with valid values to see the success message.
6. On **Menu**, open “How to use the menu” to see the jQuery slide animation.

## JavaScript and jQuery examples

`app.js` uses the `dishes` and `featuredDishIds` arrays, `filter`, `map`, `forEach`, and `for...of` loops, and reusable functions such as `formatPrice`, `makeDishCard`, `getFilteredDishes`, `renderDishes`, and `validateBooking`. Event listeners respond to input, change, click, submit, and keyboard actions. The menu cards and order rows are created dynamically.

jQuery is loaded from the official jQuery CDN. The gallery and menu help use class, ID, and descendant selectors; traversal methods include `closest()`, `children()`, and `find()`. Click and keydown handlers support the gallery, and `fadeIn`, `fadeOut`, `slideDown`, and `slideUp` make the image viewer and help panel usable.

## Suggested defence contribution plan

- **Yerasyl:** explain the shared page structure, responsive layout, theme control, and navigation.
- **Dosymzhan:** explain the dish arrays, search and category filters, favorites, and sample order.
- **Dastan:** explain reservation validation, accessible gallery controls, and the jQuery selectors, events, and effects.

All group members should practise explaining the full project, including arrays, loops, functions, DOM changes, events, form validation, and jQuery.

## Run and test

Open `index.html` in a browser. Bootstrap, jQuery, Google Fonts, and the Unsplash photos load from external CDNs, so an internet connection is needed. Test the menu, gallery, and reservation interactions listed above. The reservation form is a front-end demonstration: it validates the request and displays a success state but does not send or store a booking.

The project is published at: https://yeeeku1.github.io/dastarhan-midterm/

