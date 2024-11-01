import { type FilterValue } from '../src/types'
import { Filters } from './Filters'
import React from 'react'

interface Props {
    activeCount: number
    completedCount: number
    filterSelected: FilterValue
    onClearCompleted: () => void
    handleFilterChange: (filter: FilterValue) => void
}

export const  Footer: React.FC<Props> = ({
    activeCount = 0,
    completedCount = 0,
    onClearCompleted,
    handleFilterChange,
    filterSelected
}) => {
    return (
        <footer className = "footer">
            <span className ="todo-count">
                <strong>{activeCount}</strong> tareas pendientes
            </span>

            <Filters
                filterSelected ={filterSelected}
                handleFilterChange = {handleFilterChange}
            />

{
        completedCount > 0 && (
          <button
            className="clear-completed"
            onClick={onClearCompleted}>
              Borrar completados
          </button>
        )
      }
            
        </footer>
    )
}