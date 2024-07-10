import { InferActionsTypes } from './redux-store';

type DialogType = {
  name: string;
  id: number;
};
type MessageType = {
  message: string;
  id: number;
};
type ActionsTypes = InferActionsTypes<typeof actions>;
export type initialStateType = typeof initialState;
let initialState = {
  dialogs: [
    { name: 'Vitaly', id: 1 },
    { name: 'Sasha', id: 2 },
    { name: 'Boris', id: 3 },
    { name: 'Victor', id: 4 },
  ] as Array<DialogType>,
  messages: [
    { message: 'hi', id: 1 },
    { message: 'hi, how are you?', id: 2 },
    { message: 'hi, how are you?', id: 3 },
    { message: " as you see,i'm fine", id: 4 },
    { message: "it's good!", id: 5 },
    { message: 'and you?', id: 6 },
    { message: 'i also feel good', id: 7 },
  ] as Array<MessageType>,
};

const dialogsReducer = (
  state = initialState,
  action: ActionsTypes,
): initialStateType => {
  switch (action.type) {
    case 'SEND_MESSAGE': {
      let text = action.newMessageText;
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            message: text,
            id: 1,
          },
        ],
      };
    }
    default:
      return state;
  }
};

export const actions = {
  sendMessage: (newMessageText: string) => {
    return {
      type: 'SEND_MESSAGE',
      newMessageText,
    } as const;
  },
};

export default dialogsReducer;
