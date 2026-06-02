import React from 'react'
import { Todo } from '../App'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number, completed: boolean) => void
  onDelete: (id: number) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return <li className="todo-item">
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => onToggle(todo.id, todo.completed)} />
    <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
    <button onClick={() => onDelete(todo.id)}>Delete</button>
  </li>
}
