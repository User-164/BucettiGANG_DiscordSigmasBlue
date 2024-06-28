document.addEventListener('DOMContentLoaded', () => {
    const memeCoinsDisplay = document.getElementById('memeCoins');
    let memeCoins = parseInt(localStorage.getItem('memeCoins')) || 0;
    memeCoinsDisplay.textContent = memeCoins;

    const updateMemeCoins = (amount) => {
        memeCoins += amount;
        localStorage.setItem('memeCoins', memeCoins);
        memeCoinsDisplay.textContent = memeCoins;
    };

    const completeQuestButtons = document.querySelectorAll('.complete-quest-button');
    completeQuestButtons.forEach(button => {
        button.addEventListener('click', () => {
            const reward = parseInt(button.parentElement.getAttribute('data-reward'));
            updateMemeCoins(reward);
            button.disabled = true;
            button.textContent = 'Completed';
        });
    });

    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemPrice = parseInt(button.parentElement.getAttribute('data-price'));
            if (memeCoins >= itemPrice) {
                updateMemeCoins(-itemPrice);
                alert('Purchase successful!');
            } else {
                alert('Not enough Meme Coins!');
            }
        });
    });

    const chatForm = document.getElementById('chat-form');
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userMessage = userInput.value.trim();
        if (userMessage === '') return;
        
        appendMessage('sent', userMessage);
        userInput.value = '';

        // Simulate AI response (replace with actual AI logic for answering questions)
        setTimeout(() => {
            const aiResponse = generateAIResponse(userMessage);
            appendMessage('received', aiResponse);
        }, 500);
    });

    function appendMessage(type, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type === 'sent' ? 'sent' : 'received');
        messageDiv.innerHTML = `<p>${message}</p>`;
        chatWindow.appendChild(messageDiv);
