const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const ingredientList = document.getElementById('ingredient-list');

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  chatBox.innerHTML += `<div><strong>You:</strong> ${message}</div>`;
  userInput.value = "";

  const response = await fetch("https://fauxchef-backend.onrender.com/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await response.json();

  chatBox.innerHTML += `<div><strong>FauxChef:</strong> ${data.reply}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;

  ingredientList.innerHTML = "";
  data.ingredients.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ingredientList.appendChild(li);
  });
}
