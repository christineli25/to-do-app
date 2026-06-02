import React from 'react'
import { useState , useEffect } from 'react'
import TodoList from './components/TodoList'
import Addtodo from './components/AddTodo'

export interface Todo {
  id: number
  title: string
  completed: boolean
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    fetch('/todos')
    .then(res => res.json())
    .then(data => setTodos(data))
  }, [])

  const handleDelete = (id: number) => {
    fetch(`/todos/${id}`, { method: 'DELETE' })
    .then(() => setTodos(todos.filter(todo => todo.id !== id)))
  }

  const handleToggle = (id: number, completed: boolean) => {
    fetch(`/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    })
    .then(res => res.json())
    .then(updated  => setTodos(todos.map(todo => {
      if(todo.id === id) {
        return updated
      } else {
        return todo
      }
    })))
  }

  const handleAdd = (title: string) => {
    fetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completed: false })
    })
    .then(res => res.json())
    .then(newTodo => setTodos([...todos, newTodo]))
  }

  return (
    <div className="app">
      <h1>To-Do</h1>
      <Addtodo onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete}/>
    </div>
  )
}
