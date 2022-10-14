import { useEffect } from 'react'
import { useReducer } from 'react'
import { TodoAdd } from './TodoAdd'
import { TodoList } from './TodoList'
import { todoReducer } from './todoReducer'

const initialState = [
  {
    id: new Date().getTime(),
    description: 'check the rock',
    done: false
  },
  {
    id: new Date().getTime() * 3,
    description: 'check the app',
    done: false
  }
]

const init = () => {
  return JSON.parse(localStorage.getItem('todos') || []);
}

export const TodoApp = () => {

  const [ todos, dispatch ] = useReducer( todoReducer, initialState, init )

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))

  }, [todos])
  

  const handleNewTodo = (todo) => {
    const action = {
      type: 'Add todo',
      payload: todo
    }

    dispatch(action);
  }

  const handleDeleteTodo = (id) => {
    dispatch({
      type: 'Todo remove',
      payload: id
    })
  }

  const handleToggleTodo = (id) => {
    dispatch({
      type: 'Toggle todo',
      payload: id
    })
  }

  return (
    <>
      <h1>TodoApp = 10 || <small>Pendientes = 2</small></h1>
      <hr />

      <div className="row">
        <div className="col-7">
          <TodoList 
            todos={ todos }
            onDeleteTodo={handleDeleteTodo}
            onToggleTodo={handleToggleTodo}
          />
        </div>

        <div className="col-5">
          <h4>Add TODO</h4>
          <hr />

          {/* Todo Form onNewTodo( todo )
          { id: 1, desc:..., done: false } */}
          <TodoAdd onNewTodo={handleNewTodo}/>
        </div>

      </div>
    
    
    </>
  )
}
