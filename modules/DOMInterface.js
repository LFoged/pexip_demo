const doc = document;

const delayRemoveElement = (elementSelector = '', delay = 3000) => {
    setTimeout(() => doc.querySelector(elementSelector).remove(), delay);
};

const appendElement = (element, targetElement) => targetElement.appendChild(element);

const createElement = ({ tag = 'p', classes = [], text = '' }) => {
    const element = doc.createElement(tag);
    element.classList.add(...classes);
    if (text) {
        element.textContent = text;
    }

    return element;
};

const DOM = {
    modal: doc.querySelector('.modal'),
    confName: doc.querySelector('#conf_name'),
    username: doc.querySelector('#username'),
    pin: doc.querySelector('#conf_pin'),
    bandwidth: doc.querySelector('#bandwidth'),
    header: doc.querySelector('header'),
    video: doc.querySelector('.video_display'),
    footer: doc.querySelector('footer'),
    chatDisplay: doc.querySelector('.chat_display'),
    chatInput: doc.querySelector('#chat_input'),
};

export const modalForm = doc.querySelector('.modal_form');
export const chatForm = doc.querySelector('.chat_form');

export const getInitUserInputs = () => {
    const userInputs = {
        confName: DOM.confName.value,
        username: DOM.username.value,
        pin: DOM.pin.value,
        bandwidth: DOM.bandwidth.value,
    };
    DOM.modal.remove();

    return userInputs;
};

export const createAlert = (msg = '', type = 'notify') => {
    if (!DOM.header.hasChildNodes()) {
        const alert = createElement({ classes: ['alert_msg', type], text: msg });
        appendElement(alert, DOM.header);
        delayRemoveElement('.alert_msg');
    }
};

export const getAttribute = ({ element = '', attr = '' }) => DOM[element][attr];

export const setAttribute = ({ element = '', attr = '', value = '' }) => {
    DOM[element][attr] = value;
};

export const setVideoSrc = (videoURL) => {
    if ('srcObject' in DOM.video && videoURL instanceof MediaStream) {
        DOM.video.srcObject = videoURL;
    } else {
        DOM.video.src = videoURL;
    }
    DOM.footer.hidden = false;
};

export const postChatMsg = (msg = '', sender = '') => {
    const time = new Date().toLocaleTimeString();
    const chatMsg = createElement({ classes: ['chat_msg'], text: `[${time} - @${sender}]:\n${msg}` });
    appendElement(chatMsg, DOM.chatDisplay);
};
