import { modalForm, chatForm } from './modules/DOMInterface.js';
import { sessionTerminationEventHandler, connectToConferenceEventHandler } from './modules/PexRTC.js';
import { chatMsgEventHandler } from './modules/chat.js';

const initialiseApp = () => {
    modalForm.addEventListener('submit', connectToConferenceEventHandler);
    window.addEventListener('pagehide', sessionTerminationEventHandler);
    chatForm.addEventListener('submit', chatMsgEventHandler);
};

initialiseApp();
