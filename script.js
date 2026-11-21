/* =========================================================
   SpendWise - Week 6: Interactive dashboard
   - Conditionals make budget decisions
   - Arrays store the categories and expense records
   - Loops process the records
   - DOM manipulation updates the page
   - Event listeners handle clicks and form submissions
   ========================================================= */

/* ---------- 1. Data (arrays of objects) ---------- */

const currency = "$";

// Budget for each category
const categories = [
  { name: "Food",          budget: 500 },
  { name: "Transport",     budget: 200 },
  { name: "Rent",          budget: 900 },
  { name: "Entertainment", budget: 150 },
  { name: "Savings",       budget: 400 },
  { name: "Utilities",     budget: 220 }
];

// Expense records (starts with sample data, grows as the user adds more)
let expenses = [
  { id: 1,  name: "Groceries",             amount: 250, category: "Food",          date: "2026-11-02" },
  { id: 2,  name: "Lunch out",             amount: 170, category: "Food",          date: "2026-11-09" },
  { id: 3,  name: "Bus fares",             amount: 85,  category: "Transport",     date: "2026-11-03" },
  { id: 4,  name: "Taxi rides",            amount: 50,  category: "Transport",     date: "2026-11-12" },
  { id: 5,  name: "November rent",         amount: 900, category: "Rent",          date: "2026-11-01" },
  { id: 6,  name: "Concert ticket",        amount: 120, category: "Entertainment", date: "2026-11-08" },
  { id: 7,  name: "Streaming subscription", amount: 65, category: "Entertainment", date: "2026-11-10" },
  { id: 8,  name: "Savings deposit",       amount: 300, category: "Savings",       date: "2026-11-05" },
  { id: 9,  name: "Electricity",           amount: 92,  category: "Utilities",     date: "2026-11-06" },
  { id: 10, name: "Internet",              amount: 50,  category: "Utilities",     date: "2026-11-07" }
];

let nextId = 11;   // id for the next expense that is added

/* ---------- 2. Page elements ---------- */

const totalBudgetEl      = document.getElementById("total-budget");
const totalSpentEl       = document.getElementById("total-spent");
const remainingBalanceEl = document.getElementById("remaining-balance");
const cardsContainer     = document.getElementById("category-cards");
const expenseListEl      = document.getElementById("expense-list");
const emptyStateEl       = document.getElementById("empty-state");
const messageEl          = document.getElementById("message");
const expenseForm        = document.getElementById("expense-form");
const nameInput          = document.getElementById("expense-name");
const amountInput        = document.getElementById("expense-amount");
const categorySelect     = document.getElementById("expense-category");
const dateInput          = document.getElementById("expense-date");
const headerAddBtn       = document.getElementById("header-add-btn");

/* ---------- 3. Helper functions ---------- */

// 1234.5 -> "$1,234.50"
function formatMoney(amount) {
  return currency + amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Creates an element with an optional class and text (textContent is safe for user input)
function createEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) {
    el.className = className;
  }
  if (text !== undefined) {
    el.textContent = text;
  }
  return el;
}

// Today's date as YYYY-MM-DD, used as the default for the date field
function getToday() {
  return new Date().toISOString().slice(0, 10);
}

/* ---------- 4. Calculations (loops over the arrays) ---------- */

// Adds up the expenses that belong to one category
function getCategoryTotal(categoryName) {
  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].category === categoryName) {
      total += expenses[i].amount;
    }
  }
  return total;
}

// Adds up every expense
function getTotalSpent() {
  let total = 0;
  for (const expense of expenses) {
    total += expense.amount;
  }
  return total;
}

// Adds up the budget of every category
function getTotalBudget() {
  let total = 0;
  for (const category of categories) {
    total += category.budget;
  }
  return total;
}

// Finds one category object by name
function findCategory(name) {
  for (const category of categories) {
    if (category.name === name) {
      return category;
    }
  }
  return null;
}

/* ---------- 5. Decisions (conditionals) ---------- */

// Returns a label and a level for a category, based on how much of its budget is used
function getStatus(spent, budget) {
  const percent = budget === 0 ? 0 : (spent / budget) * 100;

  if (spent > budget) {
    return { label: "Over budget", level: "over" };
  } else if (percent === 100) {
    return { label: "Fully used", level: "full" };
  } else if (percent >= 80) {
    return { label: "Watch", level: "watch" };
  } else {
    return { label: "On track", level: "ok" };
  }
}

/* ---------- 6. Rendering (DOM updates) ---------- */

// Updates the three numbers at the top
function renderSummary() {
  const totalBudget = getTotalBudget();
  const totalSpent = getTotalSpent();
  const remaining = totalBudget - totalSpent;

  totalBudgetEl.textContent = formatMoney(totalBudget);
  totalSpentEl.textContent = formatMoney(totalSpent);
  remainingBalanceEl.textContent = formatMoney(remaining);

  // Show the remaining balance in the accent color when it is negative
  if (remaining < 0) {
    remainingBalanceEl.classList.add("negative");
  } else {
    remainingBalanceEl.classList.remove("negative");
  }
}

// Builds one card per category
function renderCards() {
  cardsContainer.innerHTML = "";

  for (const category of categories) {
    const spent = getCategoryTotal(category.name);
    const status = getStatus(spent, category.budget);
    const percent = category.budget === 0 ? 0 : Math.round((spent / category.budget) * 100);

    const card = createEl("article", "card");
    card.setAttribute("tabindex", "0");
    if (status.level === "over") {
      card.classList.add("over");
    }

    const top = createEl("div", "card-top");
    top.appendChild(createEl("h3", "", category.name));
    top.appendChild(createEl("span", "badge", status.label));

    const amount = createEl("p", "amount", formatMoney(spent));

    const bar = createEl("div", "bar");
    const fill = createEl("span");
    fill.style.setProperty("--pct", Math.min(percent, 100) + "%");
    bar.appendChild(fill);

    const bottom = createEl("div", "card-bottom");
    bottom.appendChild(createEl("span", "", "of " + formatMoney(category.budget) + " budget"));
    bottom.appendChild(createEl("span", "", percent + "%"));

    card.appendChild(top);
    card.appendChild(amount);
    card.appendChild(bar);
    card.appendChild(bottom);
    cardsContainer.appendChild(card);
  }
}

// Builds the list of expenses (newest first)
function renderExpenseList() {
  expenseListEl.innerHTML = "";

  // Show the empty message only when there are no expenses
  emptyStateEl.hidden = expenses.length > 0;

  for (let i = expenses.length - 1; i >= 0; i--) {
    const expense = expenses[i];

    const item = createEl("li", "expense-item");

    const info = createEl("div", "expense-info");
    info.appendChild(createEl("span", "expense-name", expense.name));
    info.appendChild(createEl("span", "expense-meta", expense.category + " | " + expense.date));

    const right = createEl("div", "expense-right");
    right.appendChild(createEl("span", "expense-amount", formatMoney(expense.amount)));

    const deleteBtn = createEl("button", "btn-delete", "Delete");
    deleteBtn.type = "button";
    deleteBtn.dataset.id = expense.id;
    deleteBtn.setAttribute("aria-label", "Delete " + expense.name);
    right.appendChild(deleteBtn);

    item.appendChild(info);
    item.appendChild(right);
    expenseListEl.appendChild(item);
  }
}

// Redraws everything on the page from the data
function renderAll() {
  renderSummary();
  renderCards();
  renderExpenseList();
}

// Shows feedback to the user. type: "success", "warning" or "error"
function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = "message " + type;
}

/* ---------- 7. Event handlers ---------- */

// Runs when the form is submitted
function handleAddExpense(event) {
  event.preventDefault();                 // stop the page from reloading

  const name = nameInput.value.trim();
  const amountText = amountInput.value;
  const amount = Number(amountText);
  const categoryName = categorySelect.value;
  const date = dateInput.value || getToday();

  // Validate the input
  if (name === "") {
    showMessage("Please enter a name for the expense.", "error");
    nameInput.focus();
    return;
  }
  if (amountText === "" || isNaN(amount) || amount <= 0) {
    showMessage("Please enter an amount greater than 0.", "error");
    amountInput.focus();
    return;
  }

  // Store the new record in the array
  expenses.push({
    id: nextId,
    name: name,
    amount: amount,
    category: categoryName,
    date: date
  });
  nextId++;

  // Update the page
  renderAll();

  // Give feedback based on the category's budget
  const category = findCategory(categoryName);
  const spent = getCategoryTotal(categoryName);
  const status = getStatus(spent, category.budget);

  if (status.level === "over") {
    const overBy = spent - category.budget;
    showMessage(categoryName + " is now over budget by " + formatMoney(overBy) + ".", "warning");
  } else if (status.level === "full" || status.level === "watch") {
    const left = category.budget - spent;
    showMessage("Added. Careful: only " + formatMoney(left) + " left in " + categoryName + ".", "warning");
  } else {
    showMessage("Expense added to " + categoryName + ".", "success");
  }

  // Clear the form for the next entry
  expenseForm.reset();
  dateInput.value = getToday();
  nameInput.focus();
}

// Runs when anything inside the expense list is clicked (event delegation)
function handleListClick(event) {
  const button = event.target.closest("button[data-id]");
  if (button === null) {
    return;                               // the click was not on a Delete button
  }

  const id = Number(button.dataset.id);

  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].id === id) {
      const removedName = expenses[i].name;
      expenses.splice(i, 1);              // remove the record from the array
      renderAll();
      showMessage("Deleted " + removedName + ".", "success");
      return;
    }
  }
}

// The header button takes the user to the form
function handleHeaderAdd() {
  nameInput.scrollIntoView({ behavior: "smooth", block: "center" });
  nameInput.focus();
}

/* ---------- 8. Connect events and start the app ---------- */

expenseForm.addEventListener("submit", handleAddExpense);
expenseListEl.addEventListener("click", handleListClick);
headerAddBtn.addEventListener("click", handleHeaderAdd);

dateInput.value = getToday();
renderAll();