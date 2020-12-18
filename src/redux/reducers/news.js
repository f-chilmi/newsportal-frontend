const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  data: {},
  detail: {},
  newsCategory: {},
  dataEdit: {},
  addData: {},
  configHome: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NEWS_PENDING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'GET_NEWS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }
    case 'GET_NEWS_FULFILLED': {
      const newData = state.data.concat(action.payload.data.result.rows)
      return {
        ...state,
        isLoading: false,
        isLogin: true,
        data: action.payload.data.result.rows,
        configHome: action.payload.config.url,
        info: action.payload.data.pagination1,
        alertMsg: 'success get news',
      }
    }
    case 'SEARCH_NEWS_PENDING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'SEARCH_NEWS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }
    case 'SEARCH_NEWS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isLogin: true,
        search: action.payload.data.result,
      }
    }
    case 'DETAIL_PENDING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'DETAIL_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }
    case 'DETAIL_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isLogin: true,
        detail: action.payload.data.result
      }
    }
    case 'NEWS_CATEGORY_PENDING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'NEWS_CATEGORY_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }
    case 'NEWS_CATEGORY_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isLogin: true,
        data: action.payload.data.result.rows,
      }
    }
    case 'EDIT_NEWS_PENDING': {
      return {
        ...state,
        isLoading: true,
        alertMsg: 'edit pending',
      }
    }
    case 'EDIT_NEWS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }
    case 'EDIT_NEWS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isLogin: true,
        dataEdit: action.payload.data.result,
        alertMsg: 'edit success',
      }
    }
    case 'ADD_NEWS_PENDING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'ADD_NEWS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }
    case 'ADD_NEWS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        alertMsg: 'add news success',
        addData: action.payload.data.result
      }
    }
    default: {
      return state
    }
  }
}