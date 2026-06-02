import React from 'react'
import { Todo } from '../App'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: number, completed: boolean) => void
  onDelete: (id: number) => void
}

export default function TodoList({ todos , onToggle, onDelete}: TodoListProps) {
  return <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
    ))}
  </ul>
}
