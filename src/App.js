import React, { useContext, useEffect } from 'react'
import './App.css'

import { TableFilter } from './components/TableFilter'
import { TableBody } from './components/TableBody'
import { TableHead } from './components/TableHead'
import { Pagination } from './components/Pagination'
import { TableContext } from './context/tableContext/TableContext'

export const App = () => {
  const {
    data,
    sortItem,
    currentPage,
    currentItems,
    setCurrentItems,
    pageSize,
    setData,
    paginate,
    sortTop,
    sortDown,
    tableFilter,
  } = useContext(TableContext)

  useEffect(() => {
    setData()
  }, [])

  if (!data) {
    return <h1>Подождите идёт загрузка</h1>
  }

  return (
    <div className='App'>
      <TableFilter dataLength={data.length} tableFilter={tableFilter} />
      <table>
        <TableHead sortItem={sortItem} sortTop={sortTop} sortDown={sortDown} />
        <TableBody currentItems={currentItems} />
      </table>
      <Pagination
        data={data}
        setCurrentItems={setCurrentItems}
        totalItems={data.length}
        pageSize={pageSize}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  )
}
