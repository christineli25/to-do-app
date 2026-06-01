import React, { useState, useEffect } from 'react'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

export default function App() {
  const [todos, setTodos] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(() => setError('Failed to load todos'))
  }, [])

  function handleAdd(title) {
    fetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
      .then(res => res.json())
      .then(newTodo => setTodos(prev => [...prev, newTodo]))
      .catch(() => setError('Failed to add todo'))
  }

  function handleToggle(id, completed) {
    fetch(`/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    })
      .then(res => res.json())
      .then(updated => setTodos(prev => prev.map(t => t.id === id ? updated : t)))
      .catch(() => setError('Failed to update todo'))
  }

  function handleDelete(id) {
    fetch(`/todos/${id}`, { method: 'DELETE' })
      .then(() => setTodos(prev => prev.filter(t => t.id !== id)))
      .catch(() => setError('Failed to delete todo'))
  }

  return (
    <div className="app">
      <h1>To-Do</h1>
      {error && <p className="error">{error}</p>}
      <AddTodo onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  )
}
