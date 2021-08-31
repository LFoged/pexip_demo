import { sendChatMsg } from './PexRTC.js';
import {
    createAlert,
    displayChatMsg,
    getAttribute,
    setAttribute,
} from './DOMInterface.js';

const sendMessage = (chatMsg = '', sender = '') => {
    sendChatMsg(chatMsg);
    displayChatMsg(chatMsg, sender);
    setAttribute({ element: 'chatInput', attr: 'value', value: '' });
};

export const chatMsgEventHandler = (event) => {
    event.preventDefault();

    const chatMsg = getAttribute({ element: 'chatInput', attr: 'value' }).trim();
    if (!chatMsg.length) {
        return createAlert('Cannot send an empty chat message', 'error');
    }

    return sendMessage(chatMsg, 'You');
};
