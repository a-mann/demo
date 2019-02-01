import {
  SIGN_IN,
  LOG_OUT
} from 'aliasConstants';

const initialState = {
  user: {
    login: '',
    pass: ''
  },
  isAuth: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN: {
      return {
        ...state,
        isAuth: action.payload
      }
    }

    case LOG_OUT: {
      return {
        ...state,
        isAuth: action.payload
      }
    }

    default:
      return state;
  }
}
