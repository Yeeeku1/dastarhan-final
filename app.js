class JsonStore {
  constructor(key, fallback) { this.key = key; this.fallback = fallback; }
  read() {
    try {
      const value = JSON.parse(localStorage.getItem(this.key));
      return value === null ? structuredClone(this.fallback) : value;
    } catch { return structuredClone(this.fallback); }
  }
  write(value) {
    try { localStorage.setItem(this.key, JSON.stringify(value)); return true; }
    catch { return false; }
  }
  clear() { localStorage.removeItem(this.key); }
}

class CelebrationPlan {
  constructor(data = {}) {
    this.id = data.id || (globalThis.crypto?.randomUUID?.() || `plan-${Date.now()}-${Math.random().toString(16).slice(2)}`);
    this.title = String(data.title || "").trim();
    this.occasion = String(data.occasion || "Family gathering");
    this.date = String(data.date || "");
    this.guests = Number(data.guests) || 1;
    this.notes = String(data.notes || "").trim();
  }
  update(data) { Object.assign(this, new CelebrationPlan({ ...this.toJSON(), ...data, id: this.id })); }
  toJSON() { return { id: this.id, title: this.title, occasion: this.occasion, date: this.date, guests: this.guests, notes: this.notes }; }
}

class WeatherWidget {
  constructor() {
    this.status = document.querySelector("#weatherStatus");
    this.content = document.querySelector("#weatherContent");
    this.retry = document.querySelector("#weatherRetry");
    this.controller = null;
    this.labels = { 0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast", 45: "Fog", 48: "Rime fog", 51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle", 61: "Light rain", 63: "Rain", 65: "Heavy rain", 71: "Light snow", 73: "Snow", 75: "Heavy snow", 80: "Rain showers", 81: "Rain showers", 82: "Heavy showers", 95: "Thunderstorm", 96: "Thunderstorm with hail", 99: "Thunderstorm with hail" };
    this.retry?.addEventListener("click", () => this.load());
  }
  async load() {
    if (!this.status || !this.content || !astanaWeatherApi) return;
    this.controller?.abort();
    this.controller = new AbortController();
    this.status.textContent = "Loading current weather for Astana…";
    this.content.replaceChildren();
    this.retry.hidden = true;
    try {
      const response = await fetch(astanaWeatherApi.toString(), { signal: this.controller.signal });
      if (!response.ok) throw new Error(`Weather service returned ${response.status}.`);
      const data = await response.json();
      const current = data?.current;
      if (!current || !Number.isFinite(current.temperature_2m) || !Number.isFinite(current.weather_code)) {
        this.status.textContent = "No current weather data is available right now.";
        return;
      }
      const values = [
        ["Temperature", `${Math.round(current.temperature_2m)}°C`],
        ["Feels like", `${Math.round(current.apparent_temperature)}°C`],
        ["Conditions", this.labels[current.weather_code] || "Current conditions"],
        ["Wind", `${Math.round(current.wind_speed_10m)} km/h`]
      ];
      const fragment = document.createDocumentFragment();
      values.forEach(([label, value]) => {
        const item = document.createElement("div");
        item.className = "weather-item";
        const name = document.createElement("span");
        name.textContent = label;
        const detail = document.createElement("strong");
        detail.textContent = value;
        item.append(name, detail);
        fragment.append(item);
      });
      this.content.append(fragment);
      this.status.textContent = `Current weather in Astana · updated ${current.time || "just now"}`;
    } catch (error) {
      if (error.name === "AbortError") return;
      this.status.textContent = "Weather could not be loaded. Check your connection and try again.";
      this.retry.hidden = false;
    }
  }
}

class RestaurantMenu {
  constructor(data) {
    this.dishes = data;
    this.favoritesStore = new JsonStore("dastarhanFavorites", []);
    this.cartStore = new JsonStore("dastarhanCart", []);
    this.favorites = this.safeFavorites(this.favoritesStore.read());
    this.cart = this.safeCart(this.cartStore.read());
    this.results = document.querySelector("#menuResults");
    if (!this.results) return;
    this.bind();
    this.render();
    this.renderCart();
  }
  safeFavorites(value) { return Array.isArray(value) ? value.filter((id) => this.dishes.some((dish) => dish.id === id)) : []; }
  safeCart(value) {
    return Array.isArray(value) ? value.filter((item) => item && this.dishes.some((dish) => dish.id === item.id) && Number.isInteger(item.quantity) && item.quantity > 0).map((item) => ({ id: item.id, quantity: item.quantity })) : [];
  }
  format(amount) { return `₸ ${amount.toLocaleString("en-US")}`; }
  filtered() {
    const query = (document.querySelector("#menuSearch")?.value || "").trim().toLowerCase();
    const category = document.querySelector("#categoryFilter")?.value || "all";
    const favoritesOnly = document.querySelector("#favoritesFilter")?.getAttribute("aria-pressed") === "true";
    const sort = document.querySelector("#menuSort")?.value || "featured";
    const filtered = this.dishes.filter((dish) => `${dish.name} ${dish.description}`.toLowerCase().includes(query) && (category === "all" || dish.category === category) && (!favoritesOnly || this.favorites.includes(dish.id)));
    if (sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "low") filtered.sort((a, b) => a.price - b.price);
    if (sort === "high") filtered.sort((a, b) => b.price - a.price);
    return filtered;
  }
  makeCard(dish) {
    const article = document.createElement("article"); article.className = "dish-card interactive-dish";
    const image = document.createElement("img"); image.src = dish.image; image.alt = dish.alt; image.loading = "lazy";
    const body = document.createElement("div"); body.className = "dish-body";
    const row = document.createElement("div"); row.className = "dish-meta";
    const title = document.createElement("h3"); title.textContent = dish.name;
    const price = document.createElement("span"); price.className = "price"; price.textContent = this.format(dish.price); row.append(title, price);
    const description = document.createElement("p"); description.textContent = dish.description;
    const actions = document.createElement("div"); actions.className = "dish-actions";
    const favorite = document.createElement("button"); favorite.type = "button"; favorite.className = "favorite-button"; favorite.dataset.action = "favorite"; favorite.dataset.id = dish.id;
    const saved = this.favorites.includes(dish.id); favorite.setAttribute("aria-pressed", String(saved)); favorite.setAttribute("aria-label", `${saved ? "Remove" : "Add"} ${dish.name} ${saved ? "from" : "to"} favorites`); favorite.textContent = saved ? "♥ Saved" : "♡ Save";
    const add = document.createElement("button"); add.type = "button"; add.className = "add-button"; add.dataset.action = "add"; add.dataset.id = dish.id; add.textContent = "Add to selection +";
    actions.append(favorite, add); body.append(row, description, actions); article.append(image, body); return article;
  }
  render() {
    const matches = this.filtered(); this.results.replaceChildren(...matches.map((dish) => this.makeCard(dish)));
    document.querySelector("#menuEmpty").hidden = matches.length > 0;
    document.querySelector("#favoriteCount").textContent = this.favorites.length;
  }
  renderCart() {
    const list = document.querySelector("#cartItems"); if (!list) return;
    let total = 0; list.replaceChildren();
    this.cart.forEach((item) => {
      const dish = this.dishes.find((entry) => entry.id === item.id); if (!dish) return;
      total += dish.price * item.quantity;
      const row = document.createElement("li"); const label = document.createElement("span"); label.textContent = `${dish.name} × ${item.quantity}`;
      const controls = document.createElement("span"); controls.className = "cart-row-controls";
      const amount = document.createElement("span"); amount.textContent = this.format(dish.price * item.quantity);
      const remove = document.createElement("button"); remove.type = "button"; remove.className = "remove-button"; remove.dataset.action = "remove"; remove.dataset.id = dish.id; remove.setAttribute("aria-label", `Remove ${dish.name} from selection`); remove.textContent = "×";
      controls.append(amount, remove); row.append(label, controls); list.append(row);
    });
    if (!this.cart.length) { const empty = document.createElement("li"); empty.className = "note"; empty.textContent = "No dishes added yet."; list.append(empty); }
    document.querySelector("#cartCount").textContent = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector("#cartTotal").textContent = this.format(total);
  }
  save() { this.favoritesStore.write(this.favorites); this.cartStore.write(this.cart); }
  bind() {
    document.querySelector("#menuSearch").addEventListener("input", () => this.render());
    document.querySelector("#categoryFilter").addEventListener("change", () => this.render());
    document.querySelector("#menuSort").addEventListener("change", () => this.render());
    document.querySelector("#favoritesFilter").addEventListener("click", (event) => {
      const button = event.currentTarget; const next = button.getAttribute("aria-pressed") !== "true";
      button.setAttribute("aria-pressed", String(next)); button.firstChild.textContent = next ? "Show All " : "Show Favorites "; this.render();
    });
    this.results.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-action]"); if (!button) return;
      const dish = this.dishes.find((item) => item.id === button.dataset.id); if (!dish) return;
      if (button.dataset.action === "favorite") {
        this.favorites = this.favorites.includes(dish.id) ? this.favorites.filter((id) => id !== dish.id) : [...this.favorites, dish.id];
        this.favoritesStore.write(this.favorites); this.render();
      }
      if (button.dataset.action === "add") {
        const existing = this.cart.find((item) => item.id === dish.id); if (existing) existing.quantity += 1; else this.cart.push({ id: dish.id, quantity: 1 });
        this.cartStore.write(this.cart); this.renderCart(); button.textContent = "Added ✓";
      }
    });
    document.querySelector("#cartItems").addEventListener("click", (event) => {
      const button = event.target.closest("button[data-action='remove']"); if (!button) return;
      this.cart = this.cart.filter((item) => item.id !== button.dataset.id); this.cartStore.write(this.cart); this.renderCart();
    });
    document.querySelector("#clearCart").addEventListener("click", () => { this.cart = []; this.cartStore.write(this.cart); this.renderCart(); });
  }
}

class ThemeController {
  constructor() {
    this.store = new JsonStore("dastarhanTheme", "light");
    const links = document.querySelector(".nav-links"); if (!links) return;
    this.button = document.createElement("button"); this.button.type = "button"; this.button.className = "theme-toggle"; this.button.id = "themeToggle";
    links.append(this.button);
    this.set(this.store.read() === "dark");
    this.button.addEventListener("click", () => this.set(document.documentElement.dataset.theme !== "dark"));
  }
  set(dark) {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    this.button?.setAttribute("aria-pressed", String(dark));
    if (this.button) this.button.textContent = dark ? "Light theme" : "Dark theme";
    this.store.write(dark ? "dark" : "light");
  }
}

class ReservationForm {
  constructor() {
    this.form = document.querySelector("#reservationForm"); if (!this.form) return;
    this.date = this.form.elements.date; this.date.min = this.today();
    this.form.addEventListener("input", (event) => { if (event.target.matches("input, select, textarea")) this.error(event.target, ""); });
    this.form.addEventListener("change", (event) => { if (event.target.matches("select, input[type='date']")) this.error(event.target, ""); });
    this.form.addEventListener("submit", (event) => this.submit(event));
  }
  today() { const date = new Date(); date.setMinutes(date.getMinutes() - date.getTimezoneOffset()); return date.toISOString().slice(0, 10); }
  error(input, message) {
    const field = input.closest(".field"); if (!field) return;
    let output = field.querySelector(".field-error");
    if (!output) { output = document.createElement("span"); output.className = "field-error"; output.id = `${input.id}Error`; field.append(output); }
    output.textContent = message; input.classList.toggle("is-invalid", Boolean(message)); input.setAttribute("aria-invalid", String(Boolean(message)));
    if (message) input.setAttribute("aria-describedby", output.id); else input.removeAttribute("aria-describedby");
  }
  submit(event) {
    event.preventDefault();
    const checks = [
      [this.form.elements.name, (v) => v.trim().length >= 2 ? "" : "Please enter your name (at least 2 characters)."],
      [this.form.elements.email, (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Enter a valid email address."],
      [this.form.elements.phone, (v) => v.replace(/\D/g, "").length >= 7 ? "" : "Enter a phone number with at least 7 digits."],
      [this.form.elements.guests, (v) => v ? "" : "Choose the number of guests."],
      [this.form.elements.date, (v) => v && v >= this.today() ? "" : "Choose today or a future date."],
      [this.form.elements.time, (v) => v ? "" : "Choose a reservation time."]
    ];
    let first = null;
    checks.forEach(([input, check]) => { const message = check(input.value); this.error(input, message); if (message && !first) first = input; });
    const status = document.querySelector("#reservationStatus"); status.className = "form-status";
    if (first) { status.textContent = "Please fix the highlighted fields before continuing."; first.focus(); return; }
    status.textContent = `Thank you, ${this.form.elements.name.value.trim()}. Your details passed validation. This demo does not send or store bookings; please call us to confirm your table.`;
    status.className = "form-status success"; this.form.reset(); this.date.min = this.today();
  }
}

class EventPlanner {
  constructor() {
    this.form = document.querySelector("#eventPlanForm"); if (!this.form) return;
    this.store = new JsonStore("dastarhanCelebrationPlans", []);
    this.plans = this.safePlans(this.store.read());
    this.list = document.querySelector("#savedPlans");
    this.form.elements.planDate.min = this.today();
    this.form.addEventListener("submit", (event) => this.submit(event));
    this.form.addEventListener("input", () => { document.querySelector("#planStatus").textContent = ""; });
    document.querySelector("#cancelPlanEdit").addEventListener("click", () => this.resetForm());
    this.list.addEventListener("click", (event) => this.handleListClick(event));
    this.render();
  }
  today() { const date = new Date(); date.setMinutes(date.getMinutes() - date.getTimezoneOffset()); return date.toISOString().slice(0, 10); }
  safePlans(value) {
    if (!Array.isArray(value)) return [];
    return value.filter((item) => item && typeof item === "object" && typeof item.title === "string" && typeof item.date === "string" && Number.isInteger(Number(item.guests)) && Number(item.guests) > 0).map((item) => new CelebrationPlan(item));
  }
  submit(event) {
    event.preventDefault();
    if (!this.form.reportValidity()) return;
    const values = { title: this.form.elements.planTitle.value, occasion: this.form.elements.planOccasion.value, date: this.form.elements.planDate.value, guests: this.form.elements.planGuests.value, notes: this.form.elements.planNotes.value };
    const editingId = this.form.elements.planId.value;
    if (editingId) { const plan = this.plans.find((item) => item.id === editingId); if (plan) plan.update(values); }
    else this.plans.push(new CelebrationPlan(values));
    this.persist(); this.render(); this.resetForm();
    document.querySelector("#planStatus").textContent = editingId ? "Your celebration plan was updated." : "Your celebration plan was saved on this device.";
  }
  handleListClick(event) {
    const button = event.target.closest("button[data-plan-action]"); if (!button) return;
    const plan = this.plans.find((item) => item.id === button.dataset.id); if (!plan) return;
    if (button.dataset.planAction === "edit") {
      this.form.elements.planId.value = plan.id; this.form.elements.planTitle.value = plan.title; this.form.elements.planOccasion.value = plan.occasion;
      this.form.elements.planDate.value = plan.date; this.form.elements.planGuests.value = plan.guests; this.form.elements.planNotes.value = plan.notes;
      this.form.querySelector("button[type='submit']").textContent = "Save Changes"; document.querySelector("#cancelPlanEdit").hidden = false;
      this.form.scrollIntoView({ behavior: "smooth", block: "center" }); this.form.elements.planTitle.focus();
    }
    if (button.dataset.planAction === "delete") { this.plans = this.plans.filter((item) => item.id !== plan.id); this.persist(); this.render(); document.querySelector("#planStatus").textContent = "The celebration plan was removed."; }
  }
  resetForm() { this.form.reset(); this.form.elements.planId.value = ""; this.form.elements.planDate.min = this.today(); this.form.querySelector("button[type='submit']").textContent = "Save Plan"; document.querySelector("#cancelPlanEdit").hidden = true; }
  persist() { this.store.write(this.plans.map((plan) => plan.toJSON())); }
  render() {
    const fragment = document.createDocumentFragment();
    this.plans.slice().sort((a, b) => a.date.localeCompare(b.date)).forEach((plan) => {
      const card = document.createElement("article"); card.className = "plan-card";
      const heading = document.createElement("div"); heading.className = "plan-card-heading";
      const title = document.createElement("h3"); title.textContent = plan.title;
      const date = document.createElement("span"); date.className = "plan-date"; date.textContent = new Date(`${plan.date}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); heading.append(title, date);
      const detail = document.createElement("p"); detail.textContent = `${plan.occasion} · ${plan.guests} guests${plan.notes ? ` · ${plan.notes}` : ""}`;
      const actions = document.createElement("div"); actions.className = "plan-actions";
      [["edit", "Edit"], ["delete", "Delete"]].forEach(([action, label]) => { const button = document.createElement("button"); button.type = "button"; button.dataset.planAction = action; button.dataset.id = plan.id; button.className = action === "delete" ? "text-button danger" : "text-button"; button.textContent = label; actions.append(button); });
      card.append(heading, detail, actions); fragment.append(card);
    });
    this.list.replaceChildren(...(this.plans.length ? [fragment] : []));
    if (!this.plans.length) { const empty = document.createElement("p"); empty.className = "note"; empty.textContent = "No celebration plans yet. Add one to start planning."; this.list.append(empty); }
    document.querySelector("#planCount").textContent = this.plans.length;
    document.querySelector("#guestSeats").textContent = this.plans.reduce((sum, plan) => sum + plan.guests, 0);
    const next = this.plans.filter((plan) => plan.date >= this.today()).sort((a, b) => a.date.localeCompare(b.date))[0];
    document.querySelector("#nextPlan").textContent = next ? new Date(`${next.date}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "—";
  }
}

function renderFeaturedDishes() {
  const target = document.querySelector("#featuredDishes"); if (!target) return;
  target.replaceChildren();
  featuredDishIds.forEach((id) => {
    const dish = dishes.find((item) => item.id === id); if (!dish) return;
    const card = document.createElement("article"); card.className = "dish-card";
    const image = document.createElement("img"); image.src = dish.image; image.alt = dish.alt; image.loading = "lazy";
    const body = document.createElement("div"); body.className = "dish-body";
    const row = document.createElement("div"); row.className = "dish-meta";
    const title = document.createElement("h3"); title.textContent = dish.name;
    const price = document.createElement("span"); price.className = "price"; price.textContent = `₸ ${dish.price.toLocaleString("en-US")}`;
    const description = document.createElement("p"); description.textContent = dish.description;
    row.append(title, price); body.append(row, description); card.append(image, body); target.append(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedDishes();
  new ThemeController();
  new RestaurantMenu(dishes);
  new ReservationForm();
  new EventPlanner();
  new WeatherWidget().load();
  const menuButton = document.querySelector(".navbar-toggler");
  const navLinks = document.querySelector(".nav-links");
  if (menuButton && navLinks) menuButton.addEventListener("click", () => { const open = navLinks.classList.toggle("open"); menuButton.setAttribute("aria-expanded", String(open)); });
  document.querySelector(".back-top")?.addEventListener("click", (event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });
});

if (window.jQuery) jQuery(($) => {
  $(".gallery-grid figure").attr({ tabindex: "0", role: "button" }).each(function () { $(this).attr("aria-label", `Open image: ${$(this).children("figcaption").text().trim()}`); });
  function openImage(figure) {
    const image = $(figure).find("img").first(); if (!image.length) return;
    let box = $("#galleryLightbox");
    if (!box.length) { box = $('<div class="gallery-lightbox" id="galleryLightbox" role="dialog" aria-modal="true" aria-label="Gallery image"><div class="lightbox-content"><button class="lightbox-close" type="button" aria-label="Close image">×</button><img alt=""><p></p></div></div>'); $("body").append(box); }
    box.find("img").attr({ src: image.attr("src"), alt: image.attr("alt") }); box.find("p").text($(figure).children("figcaption").first().text()); box.stop(true, true).fadeIn(180); box.find(".lightbox-close").trigger("focus");
  }
  function closeImage() { $("#galleryLightbox").stop(true, true).fadeOut(180); }
  $(document).on("click", ".gallery-grid figure", function () { openImage(this); });
  $(document).on("keydown", ".gallery-grid figure", function (event) { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openImage(this); } });
  $(document).on("click", ".lightbox-close", closeImage);
  $(document).on("click", "#galleryLightbox", function (event) { if (event.target === this) closeImage(); });
  $(document).on("keydown", (event) => { if (event.key === "Escape") closeImage(); });
  $(document).on("click", ".guide-trigger", function () {
    const content = $(this).closest(".menu-guide").children(".menu-guide-content"); const opening = content.prop("hidden"); $(this).attr("aria-expanded", String(opening));
    if (opening) content.prop("hidden", false).hide().slideDown(180); else content.stop(true, true).slideUp(180, () => content.prop("hidden", true));
  });
});

