const form = document.getElementById('chat-form');
const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const ingredientsList = document.getElementById('ingredients-list');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userText = userInput.value.trim();
  if (!userText) return;

  addMessage('You', userText);
  userInput.value = '';

  const res = await fetch('https://fc-backend-7g6e.onrender.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: userText }),
  });

  const data = await res.json();
  addMessage('FauxChef', data.response);
  extractIngredients(data.response);
});

function addMessage(sender, text) {
  const message = document.createElement('div');
  message.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatLog.appendChild(message);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function extractIngredients(text) {
  const ingredientRegex = /\b(\d+)?\s?(cups?|tablespoons?|tsp|teaspoons?|grams?|ml|oz)?\s?([a-zA-Z ]+?)\b(?=[,\.])/gi;
  const found = new Set();
  let match;
  ingredientsList.innerHTML = '';

  while ((match = ingredientRegex.exec(text)) !== null) {
    const ingredient = match[3].trim();
    if (ingredient && !found.has(ingredient.toLowerCase())) {
      found.add(ingredient.toLowerCase());
      const li = document.createElement('li');
      li.textContent = `🍴 ${ingredient}`;
      ingredientsList.appendChild(li);
    }
  }
}
