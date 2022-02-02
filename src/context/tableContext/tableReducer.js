import { FILTER, GET_DATA, SORT_DOWN, SORT_TOP } from '../types'

const handlers = {
  [GET_DATA]: (state, action) => ({
    ...state,
    data: action.data,
  }),

  [SORT_TOP]: (state, action) => ({
    ...state,
    data: [...state.data.sort((a, b) => (a[action.item] < b[action.item] ? 1 : -1))],
    sortItem: action.item,
  }),
  [SORT_DOWN]: (state, action) => ({
    ...state,
    data: [...state.data.sort((a, b) => (a[action.item] > b[action.item] ? 1 : -1))],
    sortItem: null,
  }),

  [FILTER]: (state, action) => ({
    ...state,
    data: state.data.filter((i) => {
      if (action.columnName === 'all' && action.condition === '=') {
        return (
          String(i.title).toLowerCase() === action.inputValue.toLowerCase() ||
          String(i.quantity).toLowerCase() === action.inputValue.toLowerCase() ||
          String(i.distance).toLowerCase() === action.inputValue.toLowerCase()
        )
      } else if (action.columnName === 'all' && action.condition === 'includes') {
        return (
          i.title.toLowerCase().includes(action.inputValue.toLowerCase()) ||
          String(i.quantity).toLowerCase().includes(action.inputValue.toLowerCase()) ||
          String(i.distance).toLowerCase().includes(action.inputValue.toLowerCase())
        )
      } else if (action.columnName === 'title' && action.condition === '=') {
        return String(i.title).toLowerCase() === action.inputValue.toLowerCase()
      } else if (action.columnName === 'title' && action.condition === 'includes') {
        return i.title.toLowerCase().includes(action.inputValue.toLowerCase())
      } else if ((action.columnName === 'quantity' || 'distance') && action.condition === '=') {
        return i[action.columnName] === Number(action.inputValue)
      } else if (
        (action.columnName === 'quantity' || 'distance') &&
        action.condition === 'includes'
      ) {
        return String(i[action.columnName]).includes(action.inputValue)
      } else if ((action.columnName === 'quantity' || 'distance') && action.condition === '>') {
        return i[action.columnName] > Number(action.inputValue)
      } else if ((action.columnName === 'distance' || 'quantity') && action.condition === '<') {
        return i[action.columnName] < Number(action.inputValue)
      } else return null
    }),
    currentPage: 1,
  }),
  DEFAULT: (state) => state,
}

export const tableReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
