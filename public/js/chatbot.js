document.addEventListener('DOMContentLoaded', () => {
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSendBtn = document.getElementById('chatbot-send-btn');
    const chatMessages = document.getElementById('chat-messages');
    const chatbotCollapse = document.getElementById('chatbotCollapse');
    const chatbotBody = document.querySelector('.chatbot-body');
    const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
    const chatbotCloseBtn = document.getElementById('chatbot-close-btn');

    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        const p = document.createElement('p');
        p.textContent = text;
        messageDiv.appendChild(p);
        chatMessages.appendChild(messageDiv);

        if (chatbotBody) { 
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        }
    }

    async function sendMessage() {
        const userMessage = chatbotInput.value.trim();
        if (userMessage === '') return;

        addMessage('user', userMessage);
        chatbotInput.value = ''; 

        try {
            const response = await fetch('/chatbot/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || 'Unknown error'}`);
            }

            const data = await response.json();
            addMessage('bot', data.response);
        } catch (error) {
            console.error('Error sending message to chatbot:', error);
            addMessage('bot', 'Oops! Something went wrong. Please try again later.');
        }
    }

    chatbotSendBtn.addEventListener('click', sendMessage);

    chatbotInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    if (chatbotToggleBtn) {
        chatbotToggleBtn.addEventListener('click', (event) => {
            event.stopPropagation();

            chatbotCollapse.classList.toggle('show');

            if (chatbotCollapse.classList.contains('show')) {
                if (chatbotBody) {
                    chatbotBody.scrollTop = chatbotBody.scrollHeight; 
                }
                chatbotInput.focus();
            }
        });
    }

    if (chatbotCloseBtn) {
        chatbotCloseBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            chatbotCollapse.classList.remove('show');
        });
    }

});
