import React, { useMemo, useReducer } from 'react'

import { tableReducer } from './tableReducer'
import { API } from '../../api'
import { GET_DATA, PAGINATE, SORT_TOP, SORT_DOWN, FILTER, GET_CURRENT_ITEMS } from '../types'
import { TableContext } from './TableContext'
import { data } from '../../data'
import { paginateReducer } from './paginateReducer'

export const TableState = ({ children }) => {
  const initialState = {
    data: [],
    currentPage: 1,
    pageSize: 7,
    sortItem: null,
    currentItems: [],
  }
  const [tableState, tableDispatch] = useReducer(tableReducer, initialState)
  const [paginateState, paginateDispatch] = useReducer(paginateReducer, initialState)

  // Так как не смог разместить сервер и БД удалённо, пришлось для
  // деплоя брать данные из статичного файла.

  const setData = () => {
    // const data = await API.fetchData()
    tableDispatch({ type: GET_DATA, data })
  }

  const tableFilter = (columnName, condition, inputValue) =>
    tableDispatch({ type: FILTER, columnName, condition, inputValue })

  const sortTop = (item) => tableDispatch({ type: SORT_TOP, item })
  const sortDown = (item) => tableDispatch({ type: SORT_DOWN, item })

  const setCurrentItems = (data, pageSize, currentPage) => {
    const lastItemIndex = currentPage * pageSize
    const firstItemIndex = lastItemIndex - pageSize
    paginateDispatch({ type: GET_CURRENT_ITEMS, data, firstItemIndex, lastItemIndex })
  }

  const paginate = (page) => paginateDispatch({ type: PAGINATE, page })

  return (
    <TableContext.Provider
      value={{
        data: tableState.data,
        sortItem: tableState.sortItem,
        pageSize: tableState.pageSize,
        currentPage: paginateState.currentPage,
        currentItems: paginateState.currentItems,
        setCurrentItems,
        setData,
        sortTop,
        sortDown,
        paginate,
        tableFilter,
      }}
    >
      {children}
    </TableContext.Provider>
  )
}
