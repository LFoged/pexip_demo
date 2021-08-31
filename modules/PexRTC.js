import {
    getInitUserInputs,
    createAlert,
    setAttribute,
    setVideoSrc,
    displayChatMsg,
} from './DOMInterface.js';

const confNode = 'pexipdemo.com';

const pexRTC = new PexRTC();

const terminateConnection = () => {
    pexRTC.disconnect();
    setAttribute({ element: 'video', attr: 'src', value: '' });
};

const sessionTerminationEventHandler = (event) => {
    if (!event.persisted) {
        terminateConnection();
    }
};

const disconnectHandler = (msg = '', type = 'notification') => {
    createAlert(msg, type);
    window.removeEventListener('pagehide', sessionTerminationEventHandler);
    terminateConnection();
};

pexRTC.onConnect = setVideoSrc;
pexRTC.onDisconnect = disconnectHandler;
pexRTC.onChatMessage = ({ payload, origin }) => displayChatMsg(payload, origin);
pexRTC.onError = (errorMsg) => disconnectHandler(errorMsg, 'error');

export { sessionTerminationEventHandler };

export const connectToConferenceEventHandler = (event) => {
    event.preventDefault();
    const {
        confName,
        username,
        pin,
        bandwidth,
    } = getInitUserInputs();
    pexRTC.onSetup = () => pexRTC.connect(pin);
    pexRTC.makeCall(confNode, confName, username, parseInt(bandwidth, 10));
};

export const sendChatMsg = (chatMsg = '') => pexRTC.sendChatMessage(chatMsg);
