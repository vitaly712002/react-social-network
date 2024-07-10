import { Dispatch } from 'redux';
import { chatAPI, ChatMessageType, StatusType } from '../api/chat-api';
import { BaseThunkType, InferActionsTypes } from './redux-store';

let initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType,
};

const chatReducer = (
  state: InitialStateType = initialState,
  action: ActionsTypes,
): InitialStateType => {
  switch (action.type) {
    case 'chat/MESSAGES_RECEIVED': {
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      };
    }
    case 'chat/STATUS_CHANGED': {
      return {
        ...state,
        status: action.payload.status,
      };
    }
    default: {
      return state;
    }
  }
};
export const actions = {
  messagesReceived: (messages: ChatMessageType[]) =>
    ({
      type: 'chat/MESSAGES_RECEIVED',
      payload: { messages },
    } as const),
  statusChanged: (status: StatusType) =>
    ({
      type: 'chat/STATUS_CHANGED',
      payload: { status },
    } as const),
};

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessageHandler;
};
let _statusChangedHandler: ((status: StatusType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status));
    };
  }
  return _statusChangedHandler;
};
export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.startChannel();
  chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
  chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
};
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch));
  chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
  chatAPI.closeChannel();
};
export const sendChatMessage = (message: string): ThunkType => async (
  dispatch,
) => {
  chatAPI.sendMessage(message);
};
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;
type InitialStateType = typeof initialState;
export default chatReducer;
