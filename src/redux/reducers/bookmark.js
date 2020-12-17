const initialState = {
  isLoading: false,
  isError: false,
  alertMsg: '',
  data: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BOOKMARK_PENDING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'ADD_BOOKMARK_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }
    case 'ADD_BOOKMARK_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        alertMsg: 'success add bookmark',
      }
    }
    case 'GET_BOOKMARK_PENDING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'GET_BOOKMARK_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }
    case 'GET_BOOKMARK_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        alertMsg: 'success get bookmark',
        data: action.payload.data.result
      }
    }
    case 'DELETE_BOOKMARK_PENDING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'DELETE_BOOKMARK_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }
    case 'DELETE_BOOKMARK_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        alertMsg: 'success delete bookmark',
      }
    }
    default: {
      return state
    }
  }
}