# Dastarhan Final Project — Theory Defence Guide

This guide prepares the group for an individual oral defence where the teacher asks theory questions and does not ask students to write code. A useful answer pattern is: **define the idea → connect it to this website → explain why it is useful**. Keep each answer clear and use your own words.

## Project summary to say first

**English:** “Our project is a continuation of our Dastarhan Kazakh restaurant website. It has six connected pages. For the final version, we added an asynchronous weather API, JavaScript classes, a celebration planner with create, read, update, and delete actions, persistent browser storage, and menu sorting. It is a static front-end site, so reservations are validated in the browser but are not sent to a server.”

**中文理解：** 我们延续了同一主题和小组的 Dastarhan 网站，共有六个页面。Final 新增了异步天气 API、JavaScript 类、庆祝计划的增删改查、本地持久化和菜单排序。它是静态前端项目，预约只做浏览器验证，不会发送到服务器。

## High-priority questions classmates reported

These topics are especially likely based on the group’s recent defence report. Learn the short English answers, then be ready to give the Dastarhan example in your own words.

### 1. What is JSON?

**English answer:** “JSON means JavaScript Object Notation. It is a text format for exchanging structured data. It can represent objects, arrays, strings, numbers, booleans, and null. An API commonly sends its response as JSON.”

**中文理解：** JSON 是一种用文本表示结构化数据的格式，常用于 API 传输。它看起来像 JavaScript 对象，但它本身是文本，不是 JavaScript 对象。

**Project example:** Open-Meteo responds with JSON. Our code parses it, reads fields under `current`, then creates page elements to show the weather.

### 2. What is `JSON.parse()`?

**English answer:** “`JSON.parse()` converts valid JSON text into a JavaScript value, usually an object or an array. We use it when restoring data that was saved in localStorage. Invalid JSON causes a parsing error, so our storage class catches the error and uses a safe default.”

**中文理解：** `JSON.parse()` 把 JSON 字符串还原成 JavaScript 数据。读取 localStorage 时要考虑数据可能损坏，因此项目会捕获解析错误并回退到默认值。

### 3. What is `JSON.stringify()`?

**English answer:** “`JSON.stringify()` converts a JavaScript value into JSON text. localStorage stores strings, so the planner, favorites, cart, and theme data are stringified before saving.”

**中文理解：** `JSON.stringify()` 把 JavaScript 数据转换成 JSON 字符串。因为 localStorage 只能存字符串，所以保存对象或数组前要序列化。

**Remember the direction:** JavaScript value → `JSON.stringify()` → JSON text → `JSON.parse()` → JavaScript value.

**Likely follow-up:** “What happens if we forget to stringify?” The answer is that an object cannot be stored as structured data directly; converting it to a string without JSON serialization can lose its useful structure. We serialize and parse so the original data shape can be restored.

### 4. What is AJAX?

**English answer:** “AJAX means Asynchronous JavaScript and XML. It is a technique for exchanging data with a server without reloading the whole page. The name is historical: applications can exchange JSON instead of XML. In our project, the weather widget uses the modern `fetch` API to request data asynchronously.”

**中文理解：** AJAX 是页面不整体刷新、由 JavaScript 异步向服务器请求数据的一种技术思路。名字里有 XML，但现在更常传 JSON。本项目用现代 `fetch` 实现异步天气请求。

**Likely follow-up:** “Is AJAX a programming language or an API?” It is neither; it is a technique/pattern. `XMLHttpRequest` and `fetch` are browser APIs that can be used for AJAX requests.

### 5. What is an API?

**English answer:** “An API is a defined interface that lets software request data or actions from another service. An endpoint is a particular URL for a resource. Our home page requests current Astana weather from the Open-Meteo endpoint, receives JSON, checks the response, and renders the result.”

**中文理解：** API 是软件之间约定的接口；endpoint 是具体请求地址。我们主页通过 Open-Meteo 天气 endpoint 取阿斯塔纳的当前天气，再将 JSON 数据显示出来。

**Likely follow-up:** “What is the difference between an API and AJAX?” An API is the interface or service being called; AJAX is the browser-side technique of calling it asynchronously without a full page reload.

### 6. What is HTTP PATCH?

**English answer:** “PATCH is an HTTP method for partially updating an existing resource. It sends only the fields that should change. PUT usually means replacing the resource representation, while PATCH means changing part of it. Our current project does not send PATCH requests: the celebration planner edits data in localStorage, and the weather request is a read-only GET request.”

**中文理解：** PATCH 是 HTTP 方法，用来局部更新服务器上的资源；通常只提交修改字段。PUT 通常表示整体替换。我们的庆祝计划在浏览器 localStorage 中改，不会发 PATCH；天气 API 是只读 GET。

**Important defence point:** Do not claim the project uses PATCH. Explain what PATCH means, then clearly distinguish it from our localStorage update. If the planner had a backend, an update request could send only changed fields with PATCH.

### 7. What is localStorage?

**English answer:** “localStorage is browser storage for string key/value pairs. It remains after a page refresh and normally remains after the browser closes. Our project stores favorites, sample-order items, the theme choice, and celebration plans as JSON text. It is local to one browser and device, so it is not a shared database.”

**中文理解：** localStorage 是浏览器的键值存储，只能直接保存字符串，刷新页面后数据仍在。我们保存收藏、样例订单、主题和庆祝计划；它只属于这台设备的这个浏览器，不是服务器数据库。

**Compare:** `sessionStorage` is normally cleared when that tab session ends. Cookies can be sent with HTTP requests and are often used for server/session needs. localStorage is convenient for client preferences and small local state, but should not hold passwords or secrets.

### 8. Explain the weather request from start to finish.

**English answer:** “The page starts an asynchronous fetch request. While it waits, the widget shows a loading message. When a response arrives, the code checks `response.ok`, parses the JSON, and validates that the expected current-weather values exist. It creates DOM nodes and places the values in `textContent`. If the request or parsing fails, it shows an error and a retry button.”

**中文理解：** 页面发起异步 fetch，等待时显示 loading；收到响应后检查 HTTP 状态，再解析 JSON 并检查数据。页面通过创建 DOM 节点并使用 `textContent` 安全显示。如果网络或数据出错，则显示错误和重试按钮。

### Fast comparison card

| Term | Meaning | Dastarhan example |
|---|---|---|
| JSON | Text format for structured data | Weather API response and saved browser data |
| `JSON.stringify` | JavaScript value → JSON text | Save cart/plans in localStorage |
| `JSON.parse` | JSON text → JavaScript value | Restore cart/plans from localStorage |
| API | Interface/service software can request | Open-Meteo weather endpoint |
| AJAX | Asynchronous request without full-page reload | Weather loads on Home while the page remains usable |
| GET | Read a resource | Current weather request |
| PATCH | Partially update a server resource | Not currently used; planner update is localStorage-only |
| localStorage | Persistent browser string key/value storage | Favorites, theme, cart, and event plans |

### Common mistakes to avoid

- Do not say JSON is the same thing as a JavaScript object. JSON is text; parsing converts it to a JavaScript value.
- Do not reverse `parse` and `stringify`.
- Do not say AJAX only works with XML. The name is historical; JSON is common.
- Do not say API and AJAX mean the same thing. The API is what is called; AJAX describes the asynchronous browser request technique.
- Do not say this project uses PATCH or a backend database. It uses GET for weather and localStorage for planner CRUD.
- Do not claim reservation submissions are actually booked. The form validates and displays a demo message; it does not transmit a booking.
- If you do not know a detail, state what you know, give the project example, and do not invent a feature.

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

## Full oral question bank

Practice answering these aloud. The English answers are designed to be short enough to say naturally; the Chinese lines clarify the idea. A teacher may phrase the same concept differently.

### HTML and forms

1. **What is the difference between HTML, CSS, and JavaScript?**  
   “HTML structures the content, CSS controls its appearance and layout, and JavaScript adds behavior. In our site, HTML defines the menu and planner, CSS makes them responsive, and JavaScript filters dishes and saves plans.”  
   中文：HTML 是结构，CSS 是样式布局，JavaScript 是交互行为。

2. **Why use semantic elements instead of using `div` for everything?**  
   “Semantic elements communicate the purpose of a section. `nav`, `main`, and `footer` make our page easier to understand for browsers, screen readers, and developers. A `div` is still useful as a generic container when no semantic element fits.”  
   中文：语义标签说明内容用途；div 是通用容器。

3. **What is the difference between an ID and a class?**  
   “An ID identifies one unique element on a page. A class can be shared by many elements. We use IDs to find specific controls like the weather status and classes to style repeated cards.”  
   中文：ID 通常唯一，class 可重复使用。

4. **Why should a form label be connected to its input?**  
   “A connected label explains what the control asks for and lets a visitor click the label to focus the input. It also gives assistive technology a clear accessible name.”  
   中文：label 提升可访问性，也更容易点击和聚焦输入框。

5. **Why is the menu price list an HTML table?**  
   “A table is appropriate when information has row and column relationships. Each menu row connects one dish with its description and price. We use header cells so those relationships are clear.”  
   中文：菜单每行是一个菜品，每列对应名称、描述、价格，适合用表格。

6. **What is the difference between native and custom form validation?**  
   “Native validation comes from HTML attributes like `required`, `type=email`, `min`, and `max`. Our JavaScript adds custom checks and field-level messages. A production server must validate again because browser checks can be bypassed.”  
   中文：HTML 原生验证快速方便，JS 能做更具体的规则；真实服务端仍必须再验证。

### CSS, layout, Bootstrap, and responsive design

7. **Explain the CSS box model.**  
   “The box model consists of content, padding, border, and margin. Our global `border-box` rule includes padding and border inside the declared width, which makes layouts easier to size.”  
   中文：盒模型由内容、内边距、边框、外边距组成。

8. **When would you choose Flexbox instead of Grid?**  
   “Flexbox is best for arranging items in one direction, such as a navigation row. Grid is useful for two-dimensional rows and columns, such as our dish-card layout.”  
   中文：Flexbox 擅长单方向排列；Grid 擅长行列布局。

9. **What do media queries do?**  
   “Media queries apply CSS rules only when a condition, such as viewport width, is true. Our tablet and mobile breakpoints stack columns and adjust cards so content fits narrow screens.”  
   中文：媒体查询按屏幕条件切换样式，让布局适应手机和电脑。

10. **How does Bootstrap help this project?**  
    “Bootstrap provides a responsive grid and utility classes, so we can build common layouts quickly. Our About page uses `row`, `col-md-4`, and spacing utilities; our own stylesheet supplies the restaurant’s visual theme.”  
    中文：Bootstrap 提供网格和现成工具类，本项目再用自己的 CSS 定制品牌风格。

11. **Explain the positioning values used on the site.**  
    “Sticky positioning keeps the navigation near the top while scrolling. Fixed positioning keeps the back-to-top button in the viewport. Relative positioning creates a local reference box, and absolute positioning places an overlay label inside it.”  
    中文：sticky 随滚动吸顶，fixed 固定在视口，relative 建立定位参照，absolute 依据参照摆放。

12. **What is CSS specificity?**  
    “Specificity helps decide which matching CSS rule wins when declarations conflict. An ID selector is generally more specific than a class selector, and a class selector is generally more specific than an element selector. We keep selectors simple to avoid override conflicts.”  
    中文：选择器优先级决定冲突时哪条样式生效；通常 ID > class > 元素。

### JavaScript, DOM, and events

13. **What is the DOM?**  
    “The DOM is the browser’s object model of the HTML document. JavaScript can select, create, update, and remove elements through it. Our menu class builds dish cards and inserts them into the menu results container.”  
    中文：DOM 是浏览器把 HTML 文档表示成的对象结构，JS 可读取和修改它。

14. **What is the difference between `const` and `let`?**  
    “Both are block-scoped declarations. `const` prevents reassignment of the binding, while `let` allows reassignment. A `const` array can still have its contents changed, so `const` does not make an object deeply immutable.”  
    中文：两者都是块级作用域；const 不能重新赋值变量绑定，但数组内部仍可修改。

15. **What is the difference between an array and an object?**  
    “An object groups named properties for one record, like a dish’s name and price. An array stores an ordered list of values; our dishes array contains multiple dish objects.”  
    中文：对象保存一条记录的多个字段；数组保存有顺序的多个值。

16. **What is the difference between a function and a method?**  
    “A function is a reusable block of behavior. A method is a function associated with an object or class. For example, `render()` is a method of the menu controller.”  
    中文：方法是属于对象或类的函数。

17. **What is an event listener?**  
    “An event listener waits for an event and runs a response. Our menu listens for input, selection changes, and button clicks; the reservation form listens for submit.”  
    中文：事件监听器等待用户或浏览器事件，然后执行相应逻辑。

18. **What is event bubbling and why use event delegation?**  
    “Many DOM events bubble from the target element to its ancestors. Event delegation uses one listener on a parent to handle matching child elements. Our menu cards are rebuilt after filtering, so delegation keeps their buttons working without adding a new listener to every card each time.”  
    中文：事件会从目标向父元素传播；父层统一监听可处理动态生成的按钮。

19. **Why call `preventDefault()` when submitting the reservation form?**  
    “It stops the browser’s normal form navigation or submission. JavaScript can then validate the fields and show the result on the same page. This demo does not send booking details to a server.”  
    中文：阻止浏览器默认提交后，由 JS 验证并显示反馈。

20. **Why use `textContent` for API and form values?**  
    “`textContent` inserts a value as text. It does not interpret the value as HTML markup, which reduces injection risk compared with inserting untrusted strings as HTML.”  
    中文：textContent 将内容当文本插入，避免把外部输入解析为 HTML。

### jQuery

21. **What is jQuery?**  
    “jQuery is a JavaScript library that simplifies DOM selection, traversal, event handling, and effects. We use it for the gallery lightbox and animated menu-help panel.”  
    中文：jQuery 是 JS 库，简化选择元素、遍历、事件和动画。

22. **How do jQuery selectors and traversal work in our project?**  
    “A selector finds elements by a class, ID, or other pattern. Traversal moves from one selected element to related elements. In the gallery, we find the image and caption inside the clicked figure.”  
    中文：selector 用条件选元素，traversal 从一个元素找相关的父子或后代元素。

23. **Why use delegated jQuery events?**  
    “A delegated event listener is attached to a stable ancestor and checks which descendant triggered the event. This can handle elements added later and reduces repeated listeners.”  
    中文：把事件绑定在稳定父元素上，也能处理之后动态加入的子元素。

24. **Could these jQuery features be written in native JavaScript?**  
    “Yes. Modern JavaScript can select elements, listen for events, and create transitions. We keep jQuery here because it is part of the course requirement and demonstrates the library’s selectors, traversal, delegated events, and effects.”  
    中文：可以用原生 JS 实现；项目保留 jQuery 展示课程要求。

### APIs, AJAX, HTTP, and asynchronous JavaScript

25. **What is the difference between a Promise and `async` / `await`?**  
    “A Promise represents a result that may become available later. `async` / `await` is syntax for writing Promise-based code in a readable sequence. Our weather method awaits the fetch response and JSON parsing.”  
    中文：Promise 代表未来才返回的结果；async/await 是更易读的 Promise 写法。

26. **Does `fetch()` reject for every HTTP error?**  
    “No. A network failure can reject the Promise, but an HTTP error such as 404 often still resolves to a Response. That is why our app checks `response.ok` and throws an error for an unsuccessful status.”  
    中文：404 等 HTTP 错误通常不会让 fetch Promise 自动 reject，所以要检查 response.ok。

27. **What is the difference between synchronous and asynchronous work?**  
    “Synchronous work runs in sequence and the next step waits. Asynchronous work can wait for a network response without freezing the whole page. The weather request is asynchronous, so visitors can still use the page while it loads.”  
    中文：同步步骤依次等待；异步网络请求等待时页面仍可响应。

28. **Compare GET, POST, PUT, PATCH, and DELETE.**  
    “GET reads a resource. POST commonly creates or submits data. PUT usually replaces a resource. PATCH partially updates it. DELETE removes it. Our current weather call uses GET; the planner is local browser storage, so it does not make these server-side CRUD requests.”  
    中文：GET 读取，POST 提交/创建，PUT 整体替换，PATCH 局部更新，DELETE 删除。我们的 planner CRUD 是本地的。

29. **What are loading, success, empty, and error states?**  
    “They are different user-interface states for an asynchronous operation. They tell the visitor whether data is loading, available, absent, or failed. Our weather widget displays loading first, then weather values, an empty message, or an error and retry option.”  
    中文：分别表示请求中、成功有数据、成功但无数据、请求失败，能让用户知道发生什么。

30. **What is CORS?**  
    “CORS is a browser security policy for cross-origin requests. The server must allow the website’s origin; otherwise browser JavaScript cannot read the response. Our public weather request works because the API permits it.”  
    中文：跨域资源共享机制；服务器需要允许该来源访问，浏览器才让页面读取响应。

31. **Why should API secrets not be put in front-end JavaScript?**  
    “Front-end files are downloaded to the visitor’s browser and can be inspected. A secret key there is not secret. Private credentials should stay on a server, but our Open-Meteo request does not need a key.”  
    中文：前端代码会被用户看到，不能保护密钥；本项目天气接口无需密钥。

### OOP, CRUD, and browser storage

32. **What are a class, an object, and a constructor?**  
    “A class is a blueprint for related properties and behavior. An object is an instance created from it. A constructor initializes an instance. `CelebrationPlan` defines plan data and `new CelebrationPlan(...)` creates a plan object.”  
    中文：类是模板，对象是实例，constructor 初始化对象属性。

33. **What is encapsulation? Give a project example.**  
    “Encapsulation groups related state and behavior behind one component. `RestaurantMenu` keeps the menu data, filtering, rendering, cart updates, and storage work together instead of spreading them across unrelated code.”  
    中文：封装把相关状态和行为组织在一起；RestaurantMenu 管理菜单和购物篮相关功能。

34. **What is CRUD?**  
    “CRUD means Create, Read, Update, and Delete. The event planner creates plans, reads them into cards, updates a selected plan, and deletes a plan. It then recalculates the summary values.”  
    中文：创建、读取、更新、删除；在庆祝计划管理器中都有体现。

35. **How does localStorage differ from sessionStorage?**  
    “Both store string key/value pairs for the same website origin. localStorage normally remains after the browser closes. sessionStorage is limited to the current tab session and is cleared when that session ends.”  
    中文：两者都是字符串键值存储；localStorage 持久，sessionStorage 通常只到标签页会话结束。

36. **Why is localStorage not a database for a real restaurant?**  
    “It is local to one browser, can be cleared, does not synchronize between users, and is not a secure central record. A real booking system needs a backend database and server-side validation.”  
    中文：本地存储不能多人共享、不能可靠同步，也不适合真实业务记录；真实预约要后端数据库。

37. **How does the site handle invalid localStorage data?**  
    “Reading or parsing can fail, and the saved value may have the wrong shape. `JsonStore` catches parsing errors and returns a default. The menu and planner also validate records before using them.”  
    中文：JSON 可能损坏、格式不匹配；项目捕获错误并验证数据，避免页面崩溃。

38. **What is the difference between client-side and server-side validation?**  
    “Client-side validation gives immediate feedback and improves usability. It can be bypassed, so it cannot be trusted for security. A production server must repeat the validation before accepting or saving information.”  
    中文：前端验证提高体验，但可被绕过；服务器必须再次验证。

### Accessibility and project reasoning

39. **How does the project support keyboard users?**  
    “The gallery can be opened with Enter or Space and closed with Escape. Buttons and form controls are keyboard-focusable, and visible focus styles help show where the user is.”  
    中文：图库支持键盘打开关闭，表单控件可聚焦并提供焦点提示。

40. **What do `aria-live`, `aria-pressed`, and `aria-expanded` communicate?**  
    “`aria-live` announces changing status text. `aria-pressed` communicates a toggle button’s state, such as favorites. `aria-expanded` tells assistive technology whether the menu or help panel is open.”  
    中文：它们分别辅助播报动态状态、切换按钮状态、展开/折叠状态。

41. **How would you test this project without writing new code?**  
    “I would open every page and test the navigation, mobile menu, theme persistence, menu filtering and sorting, favorite/cart save and restore, planner create/edit/delete and refresh, invalid form messages, gallery keyboard controls, and weather error/retry behavior.”  
    中文：逐页检查导航、响应式菜单、持久化、筛选排序、CRUD、验证、键盘图库、天气错误重试。

42. **What is one limitation and how would you improve the project?**  
    “Bookings are not sent to a server, and local plans do not sync across devices. I would add a backend API with server-side validation and a database, then use authenticated requests for real reservations.”  
    中文：预约不提交、计划不跨设备同步；可加入服务端 API、验证和数据库。

## One-minute project introduction

Practise until you can say this without memorizing every word:

> “Our project is Dastarhan, a Kazakh restaurant website, and it continues the same group project from the earlier terms. It has six responsive pages built with semantic HTML, CSS Grid and Flexbox, and Bootstrap utilities. The menu supports search, categories, sorting, favorites, and a sample order. We use JavaScript classes to organize the features and localStorage to restore local preferences, cart items, and celebration plans. The planner supports CRUD and shows a small summary. The home page asynchronously requests Astana weather from Open-Meteo and displays loading, success, empty, or error states. The reservation form validates the entries but does not send them to a server, so it is a front-end demonstration.”

**演讲顺序：** 项目主题 → 页面/技术 → 2–3 个功能 → API/OOP/localStorage → 诚实说明预约表单限制。控制在 45–60 秒，语速放慢。

## Defence demonstration sequence

If asked to demonstrate the working project, use this order so every feature has a reason:

1. Show the six pages and explain the shared navigation and responsive layout.
2. On Home, point out the live weather status and explain its asynchronous loading/error behavior.
3. On Menu, search and filter a dish, sort by price, favorite a dish, add an item, and explain that cart data is saved locally.
4. On Reservations, submit an invalid reservation to show validation. Then show the celebration planner create, edit, delete, and dashboard behavior.
5. On Gallery, open an image and explain keyboard controls and jQuery effects.
6. Finish by explaining one limitation and one realistic next improvement.

Do not enter personal details during a demonstration. Use example-only data in the celebration planner; it is stored in that browser.

## A strong-answer checklist

- Start with a direct definition; avoid a long preface.
- Give one exact example from the project.
- Explain why the technique is useful.
- State whether the project actually uses the feature. For example, explain PATCH but say honestly that the planner updates localStorage instead.
- If asked about security or production readiness, explain that client validation and localStorage are not substitutes for a backend.
- If stuck, say: “I know the general idea. In our project, the related example is … The part we did not implement is …” Then stop rather than guessing.

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

