import React, { useState } from 'react'
import s from './table.module.css'

export const TableFilter = ({ dataLength, tableFilter }) => {
  // создаём два состояния ,
  // первое(setState) контролировать данные из селекторов и поля ввода
  // второе(setInputError) контролировать ошику

  const [state, setState] = useState({
    columnName: 'all',
    condition: '=',
    inputValue: '',
  })
  const [inputError, setInputError] = useState('')
  // обрабатываем состояние селекторов и поля ввода
  // валидируем поле ввода если введёное значениене не корректно показываем ошибку
  // иначе обнуляем ошибку и добавляем данные в локальный state

  const handleChange = ({ target: { name, value } }) => {
    const re = /[^a-zA-Z0-9]/g
    if (name === 'inputValue' && re.test(value)) {
      return setInputError('Только цифры и лат. буквы')
    } else if (name === 'inputValue' && value.length >= 11) {
      return setInputError('Макс. кол-во символов 10')
    } else {
      setInputError('')
    }
    setState((prev) => ({ ...prev, [name]: value }))
  }

  // Обрабатываем нажатие кнопкп
  // После нажания забираем данные из локального состояния и отравляем их в reducer для фильтрации
  // Если значение поля ввода нет , показываем ошибку

  const handleSubmit = (columnName, condition, inputValue) => {
    if (!inputValue) {
      return setInputError('Введите символ')
    }
    tableFilter(columnName, condition, inputValue)
    state.inputValue = ''
  }

  return (
    <form className={s.filter}>
      {dataLength === 0 && <h2 className={s.dataNotFound}> Ни чего не найдено!</h2>}

      <div className={s.filterFields}>
        <p className={s.selectorName}>Колонка :</p>
        <select
          className={s.selector}
          name='columnName'
          value={state.columnName}
          onChange={handleChange}
        >
          <option value={'allааа'}>Все</option>
          <option value={'title'}>Название</option>
          <option value={'quantity'}>Колличество</option>
          <option value={'distance'}>Расстояние</option>
        </select>
      </div>
      <div className={s.filterFields}>
        <p className={s.selectorName}>Условие :</p>
        <select
          className={s.selector}
          name='condition'
          value={state.condition}
          onChange={handleChange}
        >
          {/* Если выбрана колонка 'Все' или 'Название' скрываем условия 'больше', 'меньше' т.к там могут быть
      строковые значения */}

          <option value={'='}>Равно</option>
          <option value={'includes'}>Содержит</option>
          {(state.columnName === 'distance' || state.columnName === 'quantity') && (
            <option value={'>'}>Больше</option>
          )}
          {(state.columnName === 'distance' || state.columnName === 'quantity') && (
            <option value={'<'}>Меньше</option>
          )}
        </select>
      </div>
      <div className={s.inputWrapper}>
        <input
          className={s.input}
          placeholder='поиск'
          value={state.inputValue}
          name='inputValue'
          onChange={handleChange}
        />

        {inputError && <div className={s.errorInput}>{inputError}</div>}
      </div>
      <div>
        <button
          onClick={() => {
            handleSubmit(state.columnName, state.condition, state.inputValue)
          }}
          className={s.btn}
          type='button'
        >
          Фильтровать
        </button>
      </div>
    </form>
  )
}
