// API Configuration
const API_URL = '/api';

// DOM Elements
const expenseForm = document.getElementById('expenseForm');
const expensesList = document.getElementById('expensesList');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const descriptionInput = document.getElementById('description');

// State
let expenses = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadExpenses();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    expenseForm.addEventListener('submit', handleAddExpense);
}

// Load expenses from the server
async function loadExpenses() {
    try {
        showLoading();
        const response = await fetch(`${API_URL}/expenses`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }
        
        expenses = await response.json();
        renderExpenses();
    } catch (error) {
        console.error('Error loading expenses:', error);
        showError('Failed to load expenses. Please try again.');
    }
}

// Handle adding a new expense
async function handleAddExpense(event) {
    event.preventDefault();
    
    const expenseData = {
        amount: parseFloat(amountInput.value),
        category: categoryInput.value.trim(),
        description: descriptionInput.value.trim()
    };
    
    // Validate input
    if (!expenseData.amount || !expenseData.category || !expenseData.description) {
        showError('Please fill in all fields');
        return;
    }
    
    if (expenseData.amount <= 0) {
        showError('Amount must be greater than 0');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/expenses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expenseData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to add expense');
        }
        
        const newExpense = await response.json();
        expenses.unshift(newExpense); // Add to beginning of array
        renderExpenses();
        resetForm();
        showSuccess('Expense added successfully!');
    } catch (error) {
        console.error('Error adding expense:', error);
        showError('Failed to add expense. Please try again.');
    }
}

// Handle deleting an expense
async function handleDeleteExpense(expenseId) {
    if (!confirm('Are you sure you want to delete this expense?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/expenses/${expenseId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete expense');
        }
        
        expenses = expenses.filter(expense => expense._id !== expenseId);
        renderExpenses();
        showSuccess('Expense deleted successfully!');
    } catch (error) {
        console.error('Error deleting expense:', error);
        showError('Failed to delete expense. Please try again.');
    }
}

// Render expenses to the DOM
function renderExpenses() {
    if (expenses.length === 0) {
        expensesList.innerHTML = `
            <div class="empty-state">
                <h3>No expenses yet</h3>
                <p>Start by adding your first expense above.</p>
            </div>
        `;
        return;
    }
    
    expensesList.innerHTML = expenses.map(expense => `
        <div class="expense-item">
            <div class="expense-info">
                <span class="expense-amount">$${expense.amount.toFixed(2)}</span>
                <span class="expense-category">${escapeHtml(expense.category)}</span>
                <span class="expense-description">${escapeHtml(expense.description)}</span>
                <span class="expense-date">${formatDate(expense.date || expense.createdAt)}</span>
            </div>
            <button class="delete-btn" onclick="handleDeleteExpense('${expense._id}')">
                Delete
            </button>
        </div>
    `).join('');
}

// Utility functions
function resetForm() {
    amountInput.value = '';
    categoryInput.value = '';
    descriptionInput.value = '';
    amountInput.focus();
}

function showLoading() {
    expensesList.innerHTML = '<div class="loading">Loading expenses...</div>';
}

function showError(message) {
    // Create a temporary error message
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

function showSuccess(message) {
    // Create a temporary success message
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Calculate and display total expenses
function updateTotalExpenses() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalElement = document.getElementById('totalExpenses');
    if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
}
