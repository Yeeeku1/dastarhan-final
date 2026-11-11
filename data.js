const dishes = [
  {
    id: "baursak-basket",
    name: "Baursak Basket",
    description: "Warm dough bites with whipped honey butter.",
    price: 1800,
    category: "starter",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
    alt: "Fresh baked bread",
  },
  {
    id: "kuurdak",
    name: "Kuurdak",
    description: "Pan-seared lamb, potato, onion, and garden herbs.",
    price: 5900,
    category: "main",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
    alt: "Grilled meat served with herbs",
  },
  {
    id: "beshbarmak",
    name: "Beshbarmak",
    description: "Slow-cooked beef, handmade noodles, and onion broth.",
    price: 6900,
    category: "main",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
    alt: "A hearty meat dish",
  },
  {
    id: "plov-for-two",
    name: "Plov for Two",
    description: "Fragrant rice, tender beef, carrot, and warm spices.",
    price: 8400,
    category: "sharing",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
    alt: "A bowl of seasoned rice",
  },
  {
    id: "village-table",
    name: "Village Table",
    description: "Seasonal greens, tomato, cucumber, herbs, and flatbread.",
    price: 4200,
    category: "sharing",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    alt: "Fresh seasonal salad",
  },
  {
    id: "honey-cake",
    name: "Honey Cake",
    description: "Soft layered cake with local honey and cultured cream.",
    price: 2400,
    category: "dessert",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
    alt: "Layered cake",
  },
  {
    id: "baursak-tea",
    name: "Baursak & Tea",
    description: "Golden dough pillows with fragrant black tea.",
    price: 2800,
    category: "drink",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80",
    alt: "A cup of tea",
  },
];

const featuredDishIds = ["beshbarmak", "village-table", "baursak-tea"];

const astanaWeatherApi = new URL("https://api.open-meteo.com/v1/forecast");
astanaWeatherApi.search = new URLSearchParams({
  latitude: "51.1694",
  longitude: "71.4491",
  current:
    "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m",
  timezone: "Asia/Almaty",
  wind_speed_unit: "kmh",
}).toString();

