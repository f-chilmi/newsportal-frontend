const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  data: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'PROFILE_PENDING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'PROFILE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }
    case 'PROFILE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isLogin: true,
        data: action.payload.data.result
      }
    }
    case 'CHANGE_PROFILE_PENDING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'CHANGE_PROFILE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }
    case 'CHANGE_PROFILE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isLogin: true,
        data: action.payload.data.result
      }
    }
    default: {
      return state
    }
  }
}