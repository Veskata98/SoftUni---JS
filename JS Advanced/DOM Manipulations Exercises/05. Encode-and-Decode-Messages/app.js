function encodeAndDecodeMessages() {
    let sendButton = document.querySelector('#main div:first-of-type button');
    let decodeButton = document.querySelector('#main div:last-of-type button');

    decodeButton.addEventListener('click', () => {
        let receivedMessagesEl = document.querySelector('#main div:last-of-type textarea');
        let message = receivedMessagesEl.value.split('');
        for (let i = 0; i < message.length; i++) {
            message[i] = String.fromCharCode(message[i].charCodeAt() - 1);
        }
        receivedMessagesEl.value = message.join('');
    });
    sendButton.addEventListener('click', () => {
        let messageEl = document.querySelector('#main div:first-of-type textarea');
        let message = messageEl.value.split('');
        let receivedMessagesEl = document.querySelector('#main div:last-of-type textarea');
        for (let i = 0; i < message.length; i++) {
            message[i] = String.fromCharCode(message[i].charCodeAt() + 1);
        }
        receivedMessagesEl.value = message.join('');
        messageEl.value = '';
    });
}
