const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  data: {},
  myArticle: {}
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
      }
    }
    case 'MY_ARTICLE_PENDING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'MY_ARTICLE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }
    case 'MY_ARTICLE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isLogin: true,
        myArticle: action.payload.data.result
      }
    }
    case 'CHANGE_PASSWORD_PENDING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'CHANGE_PASSWORD_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }
    case 'CHANGE_PASSWORD_FULFILLED': {
      return {
        ...state,
        isLoading: false,
      }
    }
    default: {
      return state
    }
  }
}