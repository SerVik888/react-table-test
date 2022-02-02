import React from 'react'
import s from './table.module.css'

export const TableBody = ({ currentItems }) => {
  return (
    <tbody className={s.tableRow}>
      {currentItems.map((item) => (
        <tr key={item.id}>
          <td>{item.datacreat}</td>
          <td>{item.title}</td>
          <td>{item.quantity}</td>
          <td>{item.distance}</td>
        </tr>
      ))}
    </tbody>
  )
}
