// Variables y constantes
const addCardButton = document.getElementById('add-card-button');
const cardImageInput = document.getElementById('card-image-input');
const addFriendButton = document.getElementById('add-friend-button');
const friendNameInput = document.getElementById('friend-name-input');
const friendList = document.getElementById('friend-list');
const startDrawButton = document.getElementById('start-draw-button');
const roulette = document.getElementById('roulette');
const stopButton = document.getElementById('stop-button');
const restartButton = document.getElementById('restart-button');
const exitButton = document.getElementById('exit-button');
const visitanteNameInput = document.getElementById('visitante-name-input');

const friends = [];
const usedCards = new Set();
let currentCardImage = null;
let currentCardNumber = null;
let visitanteName = '';

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

    // Validación del nombre del amigo
    if (!/^[a-zA-Z]+$/.test(friendName)) {
        alert('Datos Erroneos, ingresa el nombre de tu amigo, solo se aceptan letras');
        return;
    }

    if (!currentCardImage) {
        alert('Por favor, selecciona una imagen de carta primero.');
        return;
    }

    // Agregar amigo y carta al arreglo
    friends.push({ number: friends.length + 1, name: friendName, card: currentCardImage, cardNumber: currentCardNumber });
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
    friends.forEach((friend) => {
        const li = document.createElement('li');
        li.innerHTML = `${friend.number}. ${friend.name} - <img src="${friend.card}" alt="Carta" class="thumbnail">`;
        friendList.appendChild(li);
    });
}

// Función para iniciar el sorteo
startDrawButton.addEventListener('click', () => {
    roulette.innerHTML = '';
    friends.forEach((friend) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h2>${friend.number}. ${friend.name}</h2>
            <img src="${friend.card}" alt="Carta" class="thumbnail">
        `;
        roulette.appendChild(div);
    });

    // Mostrar el botón de parar
    stopButton.style.display = 'block';
});

// Función para parar el sorteo
stopButton.addEventListener('click', () => {
    const winnerIndex = Math.floor(Math.random() * friends.length);
    const winner = friends[winnerIndex];
    const winnerHTML = `
        <h2>¡Felicitaciones!</h2>
        <p>El ganador es: ${winner.number}. ${winner.name}</p>
        <img src="${winner.card}" alt="Carta" class="thumbnail">
    `;
    roulette.innerHTML = winnerHTML;
});

// Función para reiniciar el juego
restartButton.addEventListener('click', () => {
    friends.length = 0;});
   // Función para salir del juego
exitButton.addEventListener('click', () => {
    visitanteName = visitanteNameInput.value.trim();
    if (visitanteName === '') {
        alert('Por favor, ingresa tu nombre para salir del juego.');
        return;
    }
    const mensajeSalida = `
        <h2>¡Hasta luego!</h2>
        <p>Muchas gracias por participar del juego del amigo secreto, ${visitanteName}.</p>
    `;
    roulette.innerHTML = mensajeSalida;
    // Ocultar botones
    addCardButton.style.display = 'none';
    addFriendButton.style.display = 'none';
    startDrawButton.style.display = 'none';
    stopButton.style.display = 'none';
    restartButton.style.display = 'none';
    exitButton.style.display = 'none';
});