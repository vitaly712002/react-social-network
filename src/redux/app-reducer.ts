import { InferActionsTypes } from './redux-store';
import { getAuthUserData } from './auth-reducer';

let initialState = {
  initialized: false,
};
type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsTypes,
): InitialStateType => {
  switch (action.type) {
    case 'INITIALIZED_SUCCESS': {
      return {
        ...state,
        initialized: true,
      };
    }
    default: {
      return state;
    }
  }
};
const actions = {
  initializedSuccess: () => {
    return { type: 'INITIALIZED_SUCCESS' } as const;
  },
};

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => {
    dispatch(actions.initializedSuccess());
  });
};

export default appReducer;
