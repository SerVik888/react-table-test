import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'
import { TableState } from './context/tableContext/TableState'

ReactDOM.render(
  <TableState>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TableState>,
  document.getElementById('root')
)
