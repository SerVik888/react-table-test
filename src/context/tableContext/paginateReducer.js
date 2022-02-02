import { GET_CURRENT_ITEMS, PAGINATE } from '../types'

const handlers = {
  [PAGINATE]: (state, action) => ({
    ...state,
    currentPage: action.page,
  }),
  [GET_CURRENT_ITEMS]: (state, action) => ({
    ...state,
    currentItems: action.data.slice(action.firstItemIndex, action.lastItemIndex),
  }),
  DEFAULT: (state) => state,
}

export const paginateReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
