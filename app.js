// Selección de elementos del DOM
const visitorNameInput = document.getElementById('visitorName');
const startGameButton = document.getElementById('startGame');
const gameSection = document.getElementById('gameSection');
const greeting = document.getElementById('greeting');
const friendNameInput = document.getElementById('friendName');
const addCardButton = document.getElementById('addCard');
const addFriendButton = document.getElementById('addFriend');
const friendList = document.getElementById('friendList');
const cardImageInput = document.getElementById('cardImage');
const startDrawButton = document.getElementById('startDraw');
const resultDisplay = document.getElementById('result');
const roulette = document.getElementById('roulette');

// Arreglo para almacenar los amigos y sus cartas
let friends = [];
let usedCards = new Set(); // Para almacenar las cartas ya utilizadas
let currentCardImage = null; // Para almacenar la imagen de la carta seleccionada
let currentCardNumber = null; // Para almacenar el número de la carta seleccionada

// Función para iniciar el juego
startGameButton.addEventListener('click', () => {
    const visitorName = visitorNameInput.value.trim();
    if (visitorName === '') {
        alert('Por favor, ingresa tu nombre.');
        return;
    }
    greeting.textContent = `${visitorName}, ¡Que comience el juego! Vamos a agregar amigos.`;
    gameSection.style.display = 'block'; // Mostrar la sección del juego
});

// Función para agregar la carta
addCardButton.addEventListener('click', () => {
    const cardImage = cardImageInput.files[0];

    // Validar entrada
    if (!cardImage) {
        alert('Por favor, selecciona una imagen de carta.');
        return;
    }

    const cardNumber = cardImage.name.split('.')[0]; // Asumimos que el nombre del archivo es el número de la carta

    // Validar que la carta no haya sido utilizada
    if (usedCards.has(cardNumber)) {
        alert('Lo siento, esa carta es de otro amigo. Selecciona la tuya.');
        return;
    }

    // Leer la imagen de la carta
    const reader = new FileReader();
    reader.onload = function(event) {
        currentCardImage = event.target.result; // Guardar la imagen de la carta seleccionada
        currentCardNumber = cardNumber; // Guardar el número de la carta
        addFriendButton.style.display = 'block'; // Mostrar el botón de adicionar amigo
    };
    reader.readAsDataURL(cardImage);
});

// Función para agregar un amigo
addFriendButton.addEventListener('click', () => {
    const friendName = friendNameInput.value.trim();

    // Validar entrada
    if (friendName === '') {
        alert('Por favor, ingresa un nombre válido.');
        return;
    }

    if (!currentCardImage) {
        alert('Por favor, selecciona una imagen de carta primero.');
        return;
    }

    // Agregar amigo y carta al arreglo
    friends.push({ name: friendName, card: currentCardImage, cardNumber: currentCardNumber });
    usedCards.add(currentCardNumber); // Marcar la carta como utilizada

    // Limpiar campos de entrada
    friendNameInput.value = '';
    cardImageInput.value = '';
    addFriendButton.style.display = 'none'; // Ocultar el botón de adicionar amigo

    // Actualizar la lista de amigos
    updateFriendList();
    startDrawButton.style.display = 'block'; // Mostrar el botón de sorteo
});

// Función para actualizar la lista de amigos en la interfaz
function updateFriendList() {
    friendList.innerHTML = '';
    friends.forEach(friend => {
        const li = document.createElement('li');
        li.innerHTML = `${friend.name} - <img src="${friend.card}" alt="Carta" class="thumbnail">`;
        friendList.appendChild(li);
    });
}

// Función para iniciar el sorteo
startDrawButton.addEventListener('click', () => {
    if (friends.length === 0) {
        alert('No hay amigos para sortear. Agrega amigos primero.');
        return;
    }

    // Simulación de la ruleta
    const randomIndex = Math.floor(Math.random() * friends.length);
    const winner = friends[randomIndex];

    
        // Mostrar el resultado
        resultDisplay.innerHTML = `
        <p>¡Felicitaciones! Soy muy afortunado(a/e), mi amigo secreto ganador es: <strong>${winner.name}</strong></p>
        <img src="${winner.card}" alt="Carta ganadora" class="thumbnail">
        <img src="img/trofeo.jpg" alt="Trofeo" class="thumbnail" style="max-width: 100px; max-height: 100px;">
    `;
});