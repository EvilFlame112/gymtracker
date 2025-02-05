document.addEventListener('DOMContentLoaded', () => {
    loadEntries();
});

async function loadEntries() {
    try {
        const response = await fetch('/api/entries');
        const entries = await response.json();
        renderEntries(entries);
        updateTotalCalories(entries);
    } catch (error) {
        console.error('Error loading entries:', error);
    }
}

async function addEntry() {
    const foodName = document.getElementById('food-name').value;
    const calories = document.getElementById('calories').value;
    const quantity = document.getElementById('quantity').value;

    const entry = {
        foodName,
        calories: parseInt(calories) * parseInt(quantity),
        quantity: parseInt(quantity),
        date: new Date().toISOString()
    };

    try {
        await fetch('/api/entries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry),
        });
        loadEntries();
        clearForm();
    } catch (error) {
        console.error('Error adding entry:', error);
    }
}

function renderEntries(entries) {
    const entriesList = document.getElementById('entries-list');
    entriesList.innerHTML = entries.map(entry => `
        <li class="collection-item">
            <span>${entry.foodName} (x${entry.quantity})</span>
            <span>${entry.calories} kcal</span>
        </li>
    `).join('');
}

function updateTotalCalories(entries) {
    const total = entries.reduce((sum, entry) => sum + entry.calories, 0);
    document.getElementById('total-calories').textContent = total;
}

function clearForm() {
    document.getElementById('food-name').value = '';
    document.getElementById('calories').value = '';
    document.getElementById('quantity').value = '1';
}