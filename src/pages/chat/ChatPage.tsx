import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sendChatMessage,
  startMessagesListening,
  stopMessagesListening,
} from '../../redux/chat-reducer';
import { AppStateType } from '../../redux/redux-store';

type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
export const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

export const Chat: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);
  return (
    <div>
      <ChatMessages /> <ChatSendMessage />
    </div>
  );
};
export const ChatMessages: React.FC<{}> = () => {
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(false);
  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    let element = e.currentTarget;

    if (
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight,
      ) < 300
    ) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  return (
    <div
      style={{ height: '400px', overflowY: 'scroll' }}
      onScroll={scrollHandler}>
      {messages.map((m, index) => (
        <ChatMessage key={index} message={m} />
      ))}
      <div ref={messagesAnchorRef}></div>
    </div>
  );
};
export const ChatSendMessage: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = React.useState('');
  const status = useSelector((state: AppStateType) => state.chat.status);

  const sendMessageHandler = () => {
    if (!message) {
      return;
    } else {
      dispatch(sendChatMessage(message));
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        <textarea
          onChange={(e) => {
            setMessage(e.currentTarget.value);
          }}
          value={message}></textarea>
      </div>
      <button disabled={status !== 'ready'} onClick={sendMessageHandler}>
        send message
      </button>
    </div>
  );
};

type ChatMessagePropsType = {
  message: ChatMessageType;
};
export const ChatMessage: React.FC<ChatMessagePropsType> = React.memo(
  ({ message }) => {
    return (
      <div>
        <img
          style={{ borderRadius: '50%', width: '50px' }}
          src={message.photo || 'https://via.placeholder.com/50'}
          alt=""
        />
        <b>{message.userName}</b>
        <br />
        <div
          style={{
            border: '2px solid black',
            width: '400px',
            background: 'white',
          }}>
          {message.message}
        </div>
        <hr />
      </div>
    );
  },
);
