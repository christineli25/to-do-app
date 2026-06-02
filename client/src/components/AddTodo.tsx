import React from 'react'
import { useState } from 'react'

interface AddtodoProps {
  onAdd: (title: string) => void
}
export default function AddTodo({onAdd} : AddtodoProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    onAdd(value)
    setValue('')
  }

  return <form
    onSubmit={handleSubmit}
    className="add-todo">
    <input
      type="text"
      value={value}
      onChange={e => setValue(e.target.value)} />
    <button
      type="submit">Add</button>
  </form>
}
