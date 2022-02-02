import React from 'react'
import s from './table.module.css'

export const Pagination = ({ pageSize, totalItems, currentPage, paginate }) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalItems / pageSize); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className={s.pagination}>
      {pageNumbers.map((number) => (
        <div
          key={number}
          className={number === currentPage ? s.activePageNum : s.pageNum}
          onClick={() => {
            paginate(number)
          }}
        >
          {number}
        </div>
      ))}
    </div>
  )
}
