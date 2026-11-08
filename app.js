const dishes = [
  { id: "baursak-basket", name: "Baursak Basket", description: "Warm dough bites with whipped honey butter.", price: 1800, category: "starter", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80", alt: "Fresh baked bread" },
  { id: "kuurdak", name: "Kuurdak", description: "Pan-seared lamb, potato, onion, and garden herbs.", price: 5900, category: "main", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80", alt: "Grilled meat served with herbs" },
  { id: "beshbarmak", name: "Beshbarmak", description: "Slow-cooked beef, handmade noodles, and onion broth.", price: 6900, category: "main", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80", alt: "A hearty meat dish" },
  { id: "plov-for-two", name: "Plov for Two", description: "Fragrant rice, tender beef, carrot, and warm spices.", price: 8400, category: "sharing", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80", alt: "A bowl of seasoned rice" },
  { id: "village-table", name: "Village Table", description: "Seasonal greens, tomato, cucumber, herbs, and flatbread.", price: 4200, category: "sharing", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80", alt: "Fresh seasonal salad" },
  { id: "honey-cake", name: "Honey Cake", description: "Soft layered cake with local honey and cultured cream.", price: 2400, category: "dessert", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80", alt: "Layered cake" },
  { id: "baursak-tea", name: "Baursak & Tea", description: "Golden dough pillows with fragrant black tea.", price: 2800, category: "drink", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80", alt: "A cup of tea" }
];

const featuredDishIds = ["beshbarmak", "village-table", "baursak-tea"];
const cart = [];
let favoriteIds = loadFavorites();

function formatPrice(amount) {
  return `₸ ${amount.toLocaleString("en-US")}`;
}

function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem("dastarhanFavorites") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveFavorites() {
  localStorage.setItem("dastarhanFavorites", JSON.stringify(favoriteIds));
}

function getLocalDateISO() {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  return today.toISOString().slice(0, 10);
}

function makeDishCard(dish) {
  const article = document.createElement("article");
  article.className = "dish-card interactive-dish";
  const image = document.createElement("img");
  image.src = dish.image;
  image.alt = dish.alt;
  image.loading = "lazy";
  const body = document.createElement("div");
  body.className = "dish-body";
  const titleRow = document.createElement("div");
  titleRow.className = "dish-meta";
  const title = document.createElement("h3");
  title.textContent = dish.name;
  const price = document.createElement("span");
  price.className = "price";
  price.textContent = formatPrice(dish.price);
  titleRow.append(title, price);
  const description = document.createElement("p");
  description.textContent = dish.description;
  const actions = document.createElement("div");
  actions.className = "dish-actions";
  const favorite = document.createElement("button");
  favorite.type = "button";
  favorite.className = "favorite-button";
  favorite.dataset.action = "favorite";
  favorite.dataset.id = dish.id;
  favorite.setAttribute("aria-pressed", String(favoriteIds.includes(dish.id)));
  favorite.setAttribute("aria-label", `${favoriteIds.includes(dish.id) ? "Remove" : "Add"} ${dish.name} ${favoriteIds.includes(dish.id) ? "from" : "to"} favorites`);
  favorite.textContent = favoriteIds.includes(dish.id) ? "♥ Saved" : "♡ Save";
  const add = document.createElement("button");
  add.type = "button";
  add.className = "add-button";
  add.dataset.action = "add";
  add.dataset.id = dish.id;
  add.textContent = "Add to selection +";
  actions.append(favorite, add);
  body.append(titleRow, description, actions);
  article.append(image, body);
  return article;
}

function renderFeaturedDishes() {
  const target = document.querySelector("#featuredDishes");
  if (!target) return;
  target.replaceChildren();
  featuredDishIds.forEach((id) => {
    const dish = dishes.find((entry) => entry.id === id);
    if (!dish) return;
    const card = document.createElement("article");
    card.className = "dish-card";
    const image = document.createElement("img");
    image.src = dish.image;
    image.alt = dish.alt;
    image.loading = "lazy";
    const body = document.createElement("div");
    body.className = "dish-body";
    const titleRow = document.createElement("div");
    titleRow.className = "dish-meta";
    const title = document.createElement("h3");
    title.textContent = dish.name;
    const price = document.createElement("span");
    price.className = "price";
    price.textContent = formatPrice(dish.price);
    titleRow.append(title, price);
    const description = document.createElement("p");
    description.textContent = dish.description;
    body.append(titleRow, description);
    card.append(image, body);
    target.append(card);
  });
}

function getFilteredDishes() {
  const query = (document.querySelector("#menuSearch")?.value || "").trim().toLowerCase();
  const category = document.querySelector("#categoryFilter")?.value || "all";
  const favoritesOnly = document.querySelector("#favoritesFilter")?.getAttribute("aria-pressed") === "true";
  return dishes.filter((dish) => {
    const matchesQuery = `${dish.name} ${dish.description}`.toLowerCase().includes(query);
    const matchesCategory = category === "all" || dish.category === category;
    const matchesFavorite = !favoritesOnly || favoriteIds.includes(dish.id);
    return matchesQuery && matchesCategory && matchesFavorite;
  });
}

function renderDishes() {
  const results = document.querySelector("#menuResults");
  if (!results) return;
  const matches = getFilteredDishes();
  const cards = matches.map(makeDishCard);
  results.replaceChildren(...cards);
  document.querySelector("#menuEmpty").hidden = matches.length > 0;
  document.querySelector("#favoriteCount").textContent = favoriteIds.length;
}

function renderCart() {
  const list = document.querySelector("#cartItems");
  if (!list) return;
  list.replaceChildren();
  let total = 0;
  for (const item of cart) {
    const dish = dishes.find((entry) => entry.id === item.id);
    if (!dish) continue;
    total += dish.price * item.quantity;
    const row = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = `${dish.name} × ${item.quantity}`;
    const controls = document.createElement("span");
    controls.className = "cart-row-controls";
    const amount = document.createElement("span");
    amount.textContent = formatPrice(dish.price * item.quantity);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-button";
    remove.dataset.action = "remove";
    remove.dataset.id = dish.id;
    remove.setAttribute("aria-label", `Remove ${dish.name} from selection`);
    remove.textContent = "×";
    controls.append(amount, remove);
    row.append(label, controls);
    list.append(row);
  }
  if (cart.length === 0) {
    const empty = document.createElement("li");
    empty.className = "note";
    empty.textContent = "No dishes added yet.";
    list.append(empty);
  }
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector("#cartCount").textContent = count;
  document.querySelector("#cartTotal").textContent = formatPrice(total);
}

function setTheme(isDark) {
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  localStorage.setItem("dastarhanTheme", isDark ? "dark" : "light");
  const button = document.querySelector("#themeToggle");
  if (button) {
    button.setAttribute("aria-pressed", String(isDark));
    button.textContent = isDark ? "Light theme" : "Dark theme";
  }
}

function addThemeControl() {
  const navLinks = document.querySelector(".nav-links");
  if (!navLinks || document.querySelector("#themeToggle")) return;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "theme-toggle";
  button.id = "themeToggle";
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => setTheme(document.documentElement.dataset.theme !== "dark"));
  navLinks.append(button);
  setTheme(localStorage.getItem("dastarhanTheme") === "dark");
}

function showFieldError(input, message) {
  const field = input.closest(".field");
  if (!field) return;
  let error = field.querySelector(".field-error");
  if (!error) {
    error = document.createElement("span");
    error.className = "field-error";
    error.id = `${input.id}Error`;
    field.append(error);
  }
  error.textContent = message;
  input.classList.toggle("is-invalid", Boolean(message));
  input.setAttribute("aria-invalid", String(Boolean(message)));
  if (message) input.setAttribute("aria-describedby", error.id);
  else input.removeAttribute("aria-describedby");
}

function validateBooking(form) {
  const checks = [
    [form.elements.name, (value) => value.trim().length >= 2 ? "" : "Please enter your name (at least 2 characters)."],
    [form.elements.email, (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Enter a valid email address, such as name@example.com."],
    [form.elements.phone, (value) => value.replace(/\D/g, "").length >= 7 ? "" : "Enter a phone number with at least 7 digits."],
    [form.elements.guests, (value) => value ? "" : "Choose the number of guests."],
    [form.elements.date, (value) => value && value >= getLocalDateISO() ? "" : "Choose today or a future date."],
    [form.elements.time, (value) => value ? "" : "Choose a reservation time."]
  ];
  let firstInvalid = null;
  for (const [input, check] of checks) {
    const message = check(input.value);
    showFieldError(input, message);
    if (message && !firstInvalid) firstInvalid = input;
  }
  return firstInvalid;
}

function bindReservationForm() {
  const form = document.querySelector("#reservationForm");
  if (!form) return;
  const dateInput = form.elements.date;
  dateInput.min = getLocalDateISO();
  form.addEventListener("input", (event) => {
    if (event.target.matches("input, select, textarea")) {
      showFieldError(event.target, "");
      document.querySelector("#reservationStatus").textContent = "";
    }
  });
  form.addEventListener("change", (event) => {
    if (event.target.matches("select, input[type='date']")) showFieldError(event.target, "");
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const firstInvalid = validateBooking(form);
    const status = document.querySelector("#reservationStatus");
    status.className = "form-status";
    if (firstInvalid) {
      status.textContent = "Please fix the highlighted fields before continuing.";
      firstInvalid.focus();
      return;
    }
    const guestName = form.elements.name.value.trim();
    status.textContent = `Thank you, ${guestName}. Your details passed validation. This demo does not send or store bookings; please call us to confirm your table.`;
    status.className = "form-status success";
    form.reset();
    dateInput.min = getLocalDateISO();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedDishes();
  addThemeControl();
  const menuButton = document.querySelector(".navbar-toggler");
  const navLinks = document.querySelector(".nav-links");
  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });
  }
  const search = document.querySelector("#menuSearch");
  const category = document.querySelector("#categoryFilter");
  const favoritesFilter = document.querySelector("#favoritesFilter");
  if (search) {
    renderDishes();
    renderCart();
    search.addEventListener("input", renderDishes);
    category.addEventListener("change", renderDishes);
    favoritesFilter.addEventListener("click", () => {
      const next = favoritesFilter.getAttribute("aria-pressed") !== "true";
      favoritesFilter.setAttribute("aria-pressed", String(next));
      favoritesFilter.firstChild.textContent = next ? "Show All " : "Show Favorites ";
      renderDishes();
    });
    document.querySelector("#menuResults").addEventListener("click", (event) => {
      const button = event.target.closest("button[data-action]");
      if (!button) return;
      const dish = dishes.find((entry) => entry.id === button.dataset.id);
      if (!dish) return;
      if (button.dataset.action === "favorite") {
        favoriteIds = favoriteIds.includes(dish.id) ? favoriteIds.filter((id) => id !== dish.id) : [...favoriteIds, dish.id];
        saveFavorites();
        renderDishes();
      }
      if (button.dataset.action === "add") {
        const existing = cart.find((item) => item.id === dish.id);
        if (existing) existing.quantity += 1;
        else cart.push({ id: dish.id, quantity: 1 });
        renderCart();
        button.textContent = "Added ✓";
        window.setTimeout(() => { if (button.isConnected) button.textContent = "Add to selection +"; }, 900);
      }
    });
    document.querySelector("#cartItems").addEventListener("click", (event) => {
      const button = event.target.closest("button[data-action='remove']");
      if (!button) return;
      const index = cart.findIndex((item) => item.id === button.dataset.id);
      if (index !== -1) cart.splice(index, 1);
      renderCart();
    });
    document.querySelector("#clearCart").addEventListener("click", () => {
      cart.length = 0;
      renderCart();
    });
  }
  bindReservationForm();
});

if (window.jQuery) {
  jQuery(($) => {
    $(".gallery-grid figure").attr({ tabindex: "0", role: "button" }).each(function () {
      const caption = $(this).children("figcaption").text().trim();
      $(this).attr("aria-label", `Open image: ${caption}`);
    });

    function openGalleryImage(figure) {
      const image = $(figure).find("img").first();
      const caption = $(figure).children("figcaption").first().text();
      if (!image.length) return;
      let lightbox = $("#galleryLightbox");
      if (!lightbox.length) {
        lightbox = $('<div class="gallery-lightbox" id="galleryLightbox" role="dialog" aria-modal="true" aria-label="Gallery image"><div class="lightbox-content"><button class="lightbox-close" type="button" aria-label="Close image">×</button><img alt=""><p></p></div></div>');
        $("body").append(lightbox);
      }
      lightbox.find("img").attr({ src: image.attr("src"), alt: image.attr("alt") });
      lightbox.find("p").text(caption);
      lightbox.stop(true, true).fadeIn(180);
      lightbox.find(".lightbox-close").trigger("focus");
    }

    function closeGalleryImage() {
      $("#galleryLightbox").stop(true, true).fadeOut(180);
    }

    $(document).on("click", ".gallery-grid figure", function () {
      openGalleryImage(this);
    });
    $(document).on("keydown", ".gallery-grid figure", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openGalleryImage(this);
      }
    });
    $(document).on("click", ".lightbox-close", closeGalleryImage);
    $(document).on("click", "#galleryLightbox", function (event) {
      if (event.target === this) closeGalleryImage();
    });
    $(document).on("keydown", function (event) {
      if (event.key === "Escape") closeGalleryImage();
    });
    $(document).on("click", ".guide-trigger", function () {
      const content = $(this).closest(".menu-guide").children(".menu-guide-content");
      const opening = content.prop("hidden");
      $(this).attr("aria-expanded", String(opening));
      if (opening) content.prop("hidden", false).hide().slideDown(180);
      else content.stop(true, true).slideUp(180, () => content.prop("hidden", true));
    });
  });
}

