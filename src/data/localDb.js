// localDb.js — replaces all localhost:8080 (json-server) calls with in-memory data
import dbData from "./db.json";

// ─── PRODUCTS ────────────────────────────────────────────────────────────────

const allProducts = dbData.products;

export function getProducts({ page = 1, limit = 10, brand, category, gender, order, search, price, inStock, dateGte } = {}) {
  let results = [...allProducts];

  if (brand && brand !== "all") results = results.filter(p => p.brandName === brand);
  if (category && category !== "all") results = results.filter(p => p.category === category);
  if (gender && gender !== "all") results = results.filter(p => p.gender === gender);
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brandName.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }
  if (price) results = results.filter(p => p.price.current.value <= Number(price));
  if (inStock) results = results.filter(p => p.isInStock === true);
  if (dateGte) results = results.filter(p => new Date(p.productionDate) >= new Date(dateGte));

  // sorting
  if (order === "asc") results.sort((a, b) => a.name.localeCompare(b.name));
  else if (order === "desc") results.sort((a, b) => b.name.localeCompare(a.name));
  else if (order === "price low") results.sort((a, b) => a.price.current.value - b.price.current.value);
  else if (order === "price high") results.sort((a, b) => b.price.current.value - a.price.current.value);

  const total = results.length;
  const start = (page - 1) * limit;
  const paginated = results.slice(start, start + limit);
  return { data: paginated, total };
}

export function getProductById(id) {
  return allProducts.find(p => String(p.id) === String(id)) || null;
}

export function getLandingProducts(limit = 8) {
  return allProducts.slice(0, limit);
}

// ─── USERS (localStorage-backed) ─────────────────────────────────────────────

function getUsers() {
  try { return JSON.parse(localStorage.getItem("__users__")) || []; }
  catch { return []; }
}
function saveUsers(users) {
  localStorage.setItem("__users__", JSON.stringify(users));
}

export function findUser(email, password) {
  return getUsers().find(u => u.email === email && u.password === password) || null;
}

export function registerUser(userObj) {
  const users = getUsers();
  users.push(userObj);
  saveUsers(users);
}

export function getUserById(id) {
  return getUsers().find(u => u.id === id) || null;
}

export function updateUser(id, updates) {
  const users = getUsers();
  const idx = users.findIndex(u => u.id === id);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...updates };
    saveUsers(users);
    return users[idx];
  }
  return null;
}

// ─── ORDERS (localStorage-backed) ────────────────────────────────────────────

function getOrders() {
  try { return JSON.parse(localStorage.getItem("__orders__")) || []; }
  catch { return []; }
}
export function saveOrder(orderObj) {
  const orders = getOrders();
  orders.push(orderObj);
  localStorage.setItem("__orders__", JSON.stringify(orders));
}
export function getOrdersByUserId(userId) {
  return getOrders().filter(o => o.userId === userId);
}
