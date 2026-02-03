// =======================
// Recipe Data (Part 1–4 Foundation)
// =======================
const recipes = [
    {
        id: 1,
        title: "Classic Spaghetti Carbonara",
        time: 25,
        difficulty: "easy",
        description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
        category: "pasta"
    },
    {
        id: 2,
        title: "Chicken Tikka Masala",
        time: 45,
        difficulty: "medium",
        description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
        category: "curry"
    },
    {
        id: 3,
        title: "Homemade Croissants",
        time: 180,
        difficulty: "hard",
        description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
        category: "baking"
    },
    {
        id: 4,
        title: "Greek Salad",
        time: 15,
        difficulty: "easy",
        description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
        category: "salad"
    },
    {
        id: 5,
        title: "Beef Wellington",
        time: 120,
        difficulty: "hard",
        description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.",
        category: "meat"
    },
    {
        id: 6,
        title: "Vegetable Stir Fry",
        time: 20,
        difficulty: "easy",
        description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
        category: "vegetarian"
    },
    {
        id: 7,
        title: "Pad Thai",
        time: 30,
        difficulty: "medium",
        description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
        category: "noodles"
    },
    {
        id: 8,
        title: "Margherita Pizza",
        time: 60,
        difficulty: "medium",
        description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
        category: "pizza"
    }
];

// =======================
// State
// =======================
let currentFilter = "all";
let currentSort = "none";

// =======================
// DOM Selection
// =======================
const recipeContainer = document.querySelector("#recipe-container");
const filterButtons = document.querySelectorAll("[data-filter]");
const sortButtons = document.querySelectorAll("[data-sort]");

// =======================
// Create Recipe Card
// =======================
const createRecipeCard = (recipe) => `
    <div class="recipe-card" data-id="${recipe.id}">
        <h3>${recipe.title}</h3>
        <div class="recipe-meta">
            <span>⏱️ ${recipe.time} min</span>
            <span class="difficulty ${recipe.difficulty}">
                ${recipe.difficulty}
            </span>
        </div>
        <p>${recipe.description}</p>
    </div>
`;

// =======================
// Render Recipes
// =======================
const renderRecipes = (recipesToRender) => {
    recipeContainer.innerHTML = recipesToRender
        .map(createRecipeCard)
        .join("");
};

// =======================
// Filter Functions (PURE)
// =======================
const applyFilter = (recipes, filter) => {
    switch (filter) {
        case "easy":
        case "medium":
        case "hard":
            return recipes.filter(r => r.difficulty === filter);
        case "quick":
            return recipes.filter(r => r.time < 30);
        default:
            return recipes;
    }
};

// =======================
// Sort Functions (PURE)
// =======================
const applySort = (recipes, sort) => {
    switch (sort) {
        case "name":
            return [...recipes].sort((a, b) =>
                a.title.localeCompare(b.title)
            );
        case "time":
            return [...recipes].sort((a, b) => a.time - b.time);
        default:
            return recipes;
    }
};

// =======================
// Update Display
// =======================
const updateDisplay = () => {
    let result = recipes;
    result = applyFilter(result, currentFilter);
    result = applySort(result, currentSort);
    renderRecipes(result);

    console.log(
        `Displaying ${result.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`
    );
};

// =======================
// Active Button Styling
// =======================
const updateActiveButtons = () => {
    filterButtons.forEach(btn =>
        btn.classList.toggle("active", btn.dataset.filter === currentFilter)
    );

    sortButtons.forEach(btn =>
        btn.classList.toggle("active", btn.dataset.sort === currentSort)
    );
};

// =======================
// Event Listeners
// =======================
const setupEventListeners = () => {
    filterButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            currentFilter = e.target.dataset.filter;
            updateActiveButtons();
            updateDisplay();
        });
    });

    sortButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            currentSort = e.target.dataset.sort;
            updateActiveButtons();
            updateDisplay();
        });
    });
};

// =======================
// Initialization
// =======================
setupEventListeners();
updateDisplay();
