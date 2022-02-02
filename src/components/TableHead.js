import React from 'react'
import s from './table.module.css'

export const TableHead = ({ sortTop, sortDown, sortItem }) => {
  return (
    <thead className={s.tableHead}>
      <tr>
        <th>
          <span>Дата</span>
        </th>
        <th
          onClick={() => {
            !sortItem ? sortTop('title') : sortDown('title')
          }}
          className={s.columnName}
        >
          <span>Название</span>
        </th>
        <th
          onClick={() => {
            !sortItem ? sortTop('quantity') : sortDown('quantity')
          }}
          className={s.columnName}
        >
          <span>Количество</span>
        </th>
        <th
          onClick={() => {
            !sortItem ? sortTop('distance') : sortDown('distance')
          }}
          className={s.columnName}
        >
          <span>Расстояние</span>
        </th>
      </tr>
    </thead>
  )
}
