// DOM Elements
const chatbotButton = document.getElementById('chatbotButton');
const chatContainer = document.getElementById('chatContainer');
const closeChat = document.getElementById('closeChat');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');
const typingIndicator = document.getElementById('typingIndicator');
const themeToggle = document.getElementById('themeToggle');

// Theme switcher
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.setAttribute('data-theme', themeName);
}

// Check for saved theme preference or default to 'light'
(function () {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
})();

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'light') {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});

// Toggle chat visibility
chatbotButton.addEventListener('click', () => {
    chatContainer.style.display = 'flex';
    chatInput.focus();
});

closeChat.addEventListener('click', () => {
    chatContainer.style.display = 'none';
});

// Send message function
function sendMessage() {
    const message = chatInput.value.trim();
    if (message.length === 0) return;

    // Add user message to chat
    addMessage(message, 'user');
    chatInput.value = '';

    // Show typing indicator
    typingIndicator.style.display = 'flex';

    // Make API call to OpenAI
    setTimeout(() => {
        fetchBotResponse(message);
    }, 500);
}

// Add message to chat
function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.textContent = message;

    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
}

async function fetchBotResponse(message) {
    try {
        const response = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();
        typingIndicator.style.display = 'none';

        if (data.reply) {
            addMessage(data.reply, 'bot');
        } else {
            addMessage("Sorry, I didn't get a response.", 'bot');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        typingIndicator.style.display = 'none';
        addMessage("I'm having trouble connecting right now. Please try again later.", 'bot');
    }
}


// Event listeners
sendButton.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Custom animation for the chatbot button
setInterval(() => {
    const circles = document.querySelectorAll('.chatbot-icon .circle');
    circles.forEach(circle => {
        circle.style.animationPlayState = 'running';
    });

    setTimeout(() => {
        circles.forEach(circle => {
            circle.style.animationPlayState = 'paused';
        });
    }, 1500);
}, 4000);
