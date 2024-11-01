import { useState } from "react"
import { Todos } from '../components/Todos'
import { FilterValue, Todo, TodoId, TodoTitle } from  '../src/types'
import { TODO_FILTERS } from "./consts"
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

const mockTodos = [
  {
    id: '1',
    title: 'Ver el twitch 1',
    completed: true,
  },
  {
    id: '2',
    title: 'React con typescript',
    completed: false,
  },
  {
    id: '3',
    title: 'Scar ticket de la miduFest',
    completed: false,
  }
]

const App = (): JSX.Element => {

  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected ] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({id}: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id != id)
    setTodos(newTodos)
  }

  const handleCompleted = (
    {id, completed}: Pick<Todo, 'id' | 'completed'>
    ): void => {
      const newTodos = todos.map(todo => {
        if(todo.id == id) {
          return {
          ...todo,
          completed
          }
        }

        return todo
      })
      
   setTodos(newTodos) 
  
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filterdTodos = todos.filter(todo => {
    if (filterSelected == TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected == TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleAddTodo = ({title}: TodoTitle): void => {
    const newTodo = {
      title,
      id:crypto.randomUUID(),
      completed: false
    }

    const newTodos = [... todos, newTodo]
    setTodos(newTodos)
  }

  return (
    <div className="todoapp">
      <Header onAddTodo= {handleAddTodo} />
      <Todos
      onRemoveTodo = {handleRemove}
      onToggleCompleteTodo ={handleCompleted}
      todos={filterdTodos}
      />
      <Footer
        activeCount={activeCount}
        filterSelected = {filterSelected}
        completedCount = {completedCount}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange = {handleFilterChange}
      />
    </div>
  )
}

export default App
