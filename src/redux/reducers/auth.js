const initialState = {
  isLoading: false,
  isLogin: false,
  isError: false,
  errorMsg: '',
  token: '',
  alertMsg: '',
  email: '',
  result: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_USER_PENDING': {
      return {
        ...state,
        isLoading: true,
        alertMsg: 'login loading',
      }
    }
    case 'AUTH_USER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.data.token.message
      }
    }
    case 'AUTH_USER_FULFILLED': {
      // localStorage.setItem('token', action.payload.data.token)
      return {
        ...state,
        isLoading: false,
        isLogin: true,
        token: action.payload.data.token
      }
    }
    case 'SET_TOKEN': {
      return {
        ...state,
        token: action.payload.token,
        isLoading: false,
        isLogin: true
      }
    }
    case 'SIGNUP_PENDING': {
      return {
        ...state,
        isLoading: true,
        alertMsg: 'signup pending',
      }
    }
    case 'SIGNUP_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'Failed register new account'
      }
    }
    case 'SIGNUP_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isLogin: false,
        alertMsg: action.payload.data.message
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        isLogin: false,
        alertMsg: 'Logout successfully'
      }
    }
    case 'SAVE_EMAIL': {
      return {
        email: action.payload
      }
    }
    case 'FORGOT_PASSWORD_PENDING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'FORGOT_PASSWORD_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'Failed reset password'
      }
    }
    case 'FORGOT_PASSWORD_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        result: action.payload.data,
        alertMsg: 'Password changed',
      }
    }
    default: {
      return state
    }
  }
}