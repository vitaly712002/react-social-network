const subscribers = {
  'messages-received': [] as Array<MessagesReceivedSubscriberType>,
  'status-changed': [] as Array<StatusChangedSubscriberType>,
};
let ws: WebSocket | null = null;
type EventsNamesType = 'messages-received' | 'status-changed';
const closeHandler = () => {
  setTimeout(createChannel, 3000);
};
const messageHandler = (e: MessageEvent): void => {
  const newMessages = JSON.parse(e.data);
  subscribers['messages-received'].forEach((s) => s(newMessages));
};
const openHandler = (): void => {
  notifeSubscribetsAboutStatus('ready');
};
const errorHandler = (): void => {
  notifeSubscribetsAboutStatus('error');
};
const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler);
  ws?.removeEventListener('message', messageHandler);
  ws?.removeEventListener('open', openHandler);
  ws?.removeEventListener('error', errorHandler);
};
const notifeSubscribetsAboutStatus = (status: StatusType) => {
  subscribers['status-changed'].forEach((s) => s(status));
};
function createChannel() {
  cleanUp();
  ws?.close();

  ws = new WebSocket(
    'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx',
  );
  notifeSubscribetsAboutStatus('pending');
  ws?.addEventListener('close', closeHandler);
  ws?.addEventListener('message', messageHandler);
  ws?.addEventListener('open', openHandler);
  ws?.addEventListener('error', errorHandler);
}
export const chatAPI = {
  startChannel() {
    createChannel();
  },
  closeChannel() {
    notifeSubscribetsAboutStatus('pending');
    subscribers['messages-received'] = [];
    subscribers['status-changed'] = [];
    cleanUp();
    ws?.close();
  },
  subscribe(
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType,
  ) {
    //@ts-ignore
    subscribers[eventName].push(callback);
  },
  unsubscribe(
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType,
  ) {
    //@ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(
      (s: any) => s !== callback,
    );
  },
  sendMessage(message: string) {
    ws?.send(message);
  },
};
export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
export type StatusType = 'pending' | 'ready' | 'error';
type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;
