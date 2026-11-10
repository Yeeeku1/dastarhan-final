# Dastarhan Final Project — Theory Defence Guide

This guide prepares the group for an individual oral defence where the teacher asks theory questions and does not ask students to write code. A useful answer pattern is: **define the idea → connect it to this website → explain why it is useful**. Keep each answer clear and use your own words.

## Project summary to say first

**English:** “Our project is a continuation of our Dastarhan Kazakh restaurant website. It has six connected pages. For the final version, we added an asynchronous weather API, JavaScript classes, a celebration planner with create, read, update, and delete actions, persistent browser storage, and menu sorting. It is a static front-end site, so reservations are validated in the browser but are not sent to a server.”

**中文理解：** 我们延续了同一主题和小组的 Dastarhan 网站，共有六个页面。Final 新增了异步天气 API、JavaScript 类、庆祝计划的增删改查、本地持久化和菜单排序。它是静态前端项目，预约只做浏览器验证，不会发送到服务器。

## Course concepts

### HTML and page structure

- **Semantic HTML:** Elements such as `header`, `nav`, `main`, `section`, `article`, `form`, and `footer` describe the role of content. They improve structure, accessibility, and maintainability. The shared page shell uses semantic landmarks.
- **Attributes, IDs, and classes:** Attributes provide extra element information. An ID identifies one element on a page, for example the weather status; classes group elements for shared styling, such as menu cards.
- **Forms:** Labels connect to controls by matching `for` and `id`. Input types like `email`, `date`, and `number` give suitable browser controls. `required`, `min`, and `max` provide basic constraints.
- **Table:** The menu price list uses `table`, `thead`, `tbody`, `th`, and `td`. A table is appropriate for relationships between dishes, descriptions, and prices.

### CSS, Bootstrap, and responsive design

- **Box model:** Each element has content, padding, border, and margin. `box-sizing: border-box` makes declared width include padding and border, which makes sizing easier.
- **Flexbox:** A one-dimensional layout that aligns items along a row or column. The navigation and action rows use Flexbox.
- **CSS Grid:** A two-dimensional layout for rows and columns. Dish cards, page sections, contact cards, and the planner dashboard use Grid.
- **Bootstrap:** Bootstrap provides a responsive grid and utility classes such as `container`, `row`, `col-md-4`, `g-4`, `mt-3`, and `text-center`. The project combines those utilities with its own CSS.
- **Media queries:** CSS rules apply only at certain viewport widths. The project has tablet and mobile breakpoints so columns stack and controls fit small screens.
- **Positioning:** `position: sticky` keeps navigation near the top; `position: fixed` keeps the back-to-top button visible; `position: relative` creates a positioning context for overlay labels; `position: absolute` places those labels within their section.
- **Cascade and specificity:** When rules conflict, the cascade considers importance, specificity, and order. A class selector is generally more specific than an element selector. Avoid unnecessary overrides.
- **Accessibility:** Descriptive image `alt` text, labels, keyboard controls, visible focus, `aria-live` status regions, and accurate `aria-pressed` / `aria-expanded` states help different visitors operate the site.

### JavaScript, DOM, and events

- **Variables and data types:** `const` is used for bindings that should not be reassigned; `let` is used when the value must change. JavaScript values include strings, numbers, booleans, arrays, objects, and `null`.
- **Arrays and objects:** Each menu dish is an object, and the menu is an array of those records. Objects keep related values such as a dish name, category, price, and image together.
- **Functions and methods:** Functions package reusable work. A method is a function associated with a class or object, such as `render()` on the menu class.
- **DOM:** The Document Object Model is the browser’s object representation of an HTML page. JavaScript selects elements, creates nodes, updates text, and attaches them to the page.
- **Events:** Events report actions such as `click`, `input`, `change`, `submit`, and `keydown`. Event listeners connect those actions to a response.
- **Event delegation:** A listener on the menu results container handles clicks on its child buttons. Since cards are rebuilt after filtering, delegation lets newly created buttons keep working.
- **`preventDefault`:** This stops the browser’s default submit or link behavior. The reservation form uses it so JavaScript can validate before showing a result.
- **Safe DOM output:** API and user-entered values are assigned with `textContent`. This displays them as text rather than treating them as HTML markup.
- **Validation:** The reservation checks name, email format, phone digits, guest selection, date, and time. It reports field errors, focuses the first invalid control, and only then displays success.

### jQuery

- **Purpose:** jQuery is a JavaScript library that offers concise element selection, event handling, traversal, and effects.
- **Selectors and traversal:** The gallery uses class selectors and methods like `find()` and `children()`. The menu help uses `closest()` to find its containing panel.
- **Events and effects:** Delegated click/keyboard events open the gallery lightbox. `fadeIn`, `fadeOut`, `slideDown`, and `slideUp` animate the lightbox or help panel.
- **Native JavaScript and jQuery:** Both can work with the DOM. This site uses native JavaScript for its main classes and data operations, and jQuery for the existing gallery and help interactions.

### API and asynchronous JavaScript

- **API:** An Application Programming Interface is a defined way for one program to request data or services from another. The home page requests current weather from Open-Meteo for Astana.
- **HTTP and JSON:** `fetch` makes an HTTP request. A successful response contains JSON, which JavaScript parses into values. The browser checks `response.ok` because a server error response does not always reject the fetch promise by itself.
- **Promise:** A Promise represents work that may finish later. It can succeed or fail. `async` / `await` makes Promise-based flow easier to read.
- **Asynchronous flow:** While the weather request is pending, the page shows a loading message. It later shows data, an empty state, or an error with a retry action.
- **Error handling:** A request can fail because of network problems, service errors, or unexpected data. The widget catches errors and provides a readable fallback.
- **API key:** This public weather endpoint does not require a secret key. Secret keys should not be placed in front-end code because visitors can inspect downloaded files.
- **CORS:** Cross-Origin Resource Sharing is a browser security policy. An API must allow requests from the website’s origin; otherwise the browser blocks access to the response.

### OOP and persistence

- **Class and object:** A class describes shared properties and behavior; an object is an instance of that class. `new EventPlanner()` creates an object that manages the planner interface.
- **Constructor:** A constructor initializes an object’s properties. `CelebrationPlan` stores the plan ID, title, occasion, date, guest count, and notes.
- **Methods:** Methods describe behavior, such as `update`, `toJSON`, `render`, `submit`, or `load`.
- **Encapsulation:** A class groups the data and operations that manage one feature, which keeps code organized. `RestaurantMenu` owns menu filtering, rendering, and cart updates.
- **Multiple instances:** The program creates separate instances for the theme controller, menu, weather widget, form, and event planner. Multiple `JsonStore` objects use different storage keys for separate kinds of saved data.
- **CRUD:** Create adds a celebration plan; Read displays it; Update edits it; Delete removes it. The dashboard is recalculated after each change.
- **localStorage:** Browser storage keeps string values after refresh. The project converts arrays and objects to JSON strings when saving and parses them when reading.
- **Limitations of localStorage:** It is specific to one browser and device, has limited capacity, and is not a server or secure database. Clearing browser data removes it. This is why the project calls the order and plans local samples.
- **Invalid stored data:** Saved JSON can be missing, malformed, or the wrong shape. The `JsonStore` catches parse errors and the features filter and validate data before using it.

## Individual practice questions

The contribution headings are practice areas, not a reason to skip other sections. Every member should be able to discuss the whole site.

### Yerasyl — structure, responsive design, API, and OOP

1. **What does semantic HTML mean, and why use it?**  
   “Semantic HTML uses elements whose names describe their purpose. Our `nav`, `main`, `section`, and `footer` make the page structure clear for browsers, assistive technology, and developers.”

2. **How does responsive design work in this project?**  
   “The layout uses flexible Grid and Flexbox rules, then media queries change the layout at tablet and mobile widths. For example, the weather and planner columns stack on a phone.”

3. **What is an API, and what does our weather API return?**  
   “An API lets one program request data from another. Open-Meteo returns JSON current-weather values for Astana, including temperature, weather code, and wind speed.”

4. **Why is the weather request asynchronous?**  
   “The browser must wait for a network response. `fetch` returns a Promise, and `async` / `await` lets the page stay usable while it waits. We show loading, success, and error states.”

5. **What is a class and an object in our application?**  
   “A class groups a feature’s data and behavior; an object is one instance. `WeatherWidget` defines the weather behavior, and `new WeatherWidget()` creates the page’s widget controller.”

### Dosymzhan — menu, DOM, and localStorage

1. **How are menu items represented?**  
   “Each dish is an object with properties such as ID, name, description, price, category, and image. The menu data is an array of those objects.”

2. **How does the search and filter interface update the page?**  
   “Input and change events read the search text and selected category. The app filters the array, creates cards for matches, and replaces the old card nodes in the DOM.”

3. **What is event delegation, and where do we use it?**  
   “A parent listens for events from child elements. The menu results container handles clicks on favorite and add buttons, even after the cards have been rendered again.”

4. **How does localStorage keep the sample order?**  
   “The order is converted to a JSON string and saved under a storage key. When the menu loads, it reads and parses that value, checks each item, and then renders the saved order.”

5. **What is the difference between filtering and sorting?**  
   “Filtering removes items that do not match a condition. Sorting changes the order of the remaining items. Our menu can filter by text and category, then sort by name or price.”

### Dastan — validation, CRUD, and jQuery

1. **Why do we validate a form on the client side?**  
   “Client-side validation gives quick feedback before a user continues. Our reservation form checks required details and date rules. A real booking service would also need server-side validation.”

2. **What does CRUD stand for, and how does the planner demonstrate it?**  
   “CRUD means Create, Read, Update, and Delete. The planner saves a new gathering, displays saved plans, edits an existing plan, and removes a plan.”

3. **What does `preventDefault` do in a form submit event?**  
   “It stops the browser’s normal page submission. JavaScript can validate the form and show an accessible status message instead. This demo does not send the booking to a server.”

4. **What is jQuery used for in this website?**  
   “jQuery handles gallery and menu-help behavior. It selects elements, listens for delegated events, traverses from a clicked figure to its image, and animates the lightbox and help panel.”

5. **What is a limitation of localStorage?**  
   “It only saves data in this browser on this device and is not secure server storage. The planner is for a local demonstration and does not synchronize or send plans to the restaurant.”

## Quick reminders

- **Flexbox:** one-dimensional alignment; **Grid:** rows and columns.
- **HTML:** structure; **CSS:** presentation; **JavaScript:** behavior.
- **DOM:** the page as objects JavaScript can inspect and change.
- **Event:** a user or browser action; **listener:** the response attached to it.
- **JSON:** text format for representing structured data.
- **Promise:** a future result; **async/await:** readable syntax for waiting on it.
- **localStorage:** persistent browser key/value storage; it stores strings.
- **OOP:** organize state and behavior into classes and objects.
- **Cite concrete project examples** and be clear that local demo plans and reservations are not transmitted.

