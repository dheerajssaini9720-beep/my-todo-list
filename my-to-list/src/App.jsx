import React from 'react'
import { useState } from 'react'

const App = () => {

  const [tasks, setTasks] = useState([])

  const [inputValue, setInputValue] = useState("")

  const [editId, setEditId] = useState(null)

  const [editText, setEditText] = useState("")

  const [filter, setFilter] = useState("all")


  const addTask = () => {

    if (inputValue.trim() === "") {
      return
    }

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: Date.now()
    }

    setTasks([...tasks, newTask])
    setInputValue("")

  }

  const deleteTask = (id) => {

    setTasks(tasks.filter((task) => task.id !== id))

  }

  const startEdit = (task) => {

    setEditId(task.id)
    setEditText(task.text)

  }

  const saveEdit = (id) => {

    if (editText.trim() === "") {
      return
    }

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: editText }
          : task
      )
    )

    setEditId(null)
    setEditText("")

  }
const toggleTask = (id) => {

  setTasks(
    tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )
  )

}
  const getDayLabel = (createdAt) => {

    const created = new Date(createdAt)
    const now = new Date()

    created.setHours(0, 0, 0, 0)
    now.setHours(0, 0, 0, 0)

    const diff = Math.round((now - created) / (1000 * 60 * 60 * 24))

    if (diff === 0) {
      return "Today"
    }

    if (diff === 1) {
      return "Yesterday"
    }

    return `${diff} days ago`

  }
const filteredTasks = tasks.filter((task) => {

  if (filter === "pending") {
    return task.completed === false
  }

  if (filter === "completed") {
    return task.completed === true
  }

  return true

})

  return (
    <div className='app-bg'>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
      <div className="blob blob-4"></div>


      <div className="card">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="logo-box">
              <svg
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />

              </svg>
            </div>

            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                To-Do <span className="title-accent">List</span>
              </h1>

              <p className="text-amber-300">
                Plan • Organize • Get Things Done🚀
              </p>
            </div>

          </div>

          <div className="theme-toggle">
            <div className="theme-knob">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
                stroke="white"
                strokeWidth="2">

                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>

            </div>
          </div>

        </div>


        <div className="add-bar">

          <input
            type="text"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button
            className='text-2xl font-bold text-white'
            onClick={addTask}
          >
            Add Task
          </button>

        </div>

        <div className="filter-row ">
          <div className="filter-buttons">

            <button  className={filter === "all" ? "filter-btn active" : "filter-btn"}
  onClick={() => setFilter("all")}> All</button>

            <button   className={filter === "pending" ? "filter-btn active" : "filter-btn"}
  onClick={() => setFilter("pending")}>Pending</button>

            <button  className={filter === "completed" ? "filter-btn active" : "filter-btn"}
  onClick={() => setFilter("completed")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg> Completed </button>

            <span className='total-task'> Total: {tasks.length} task</span>

          </div>

        </div>

        <ul className='task-list'>

          {tasks.map((task) => (

            <li className='task-item' key={task.id}>

              <input type="checkbox" className='task-check' />

              {editId === task.id ? (

                <input
                  type="text"
                  className='task-text'
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />

              ) : (

                <span className='task-text'>{task.text}</span>

              )}

              <span className='task-badge'>{getDayLabel(task.createdAt)}</span>

              <div className="task-actions">

                <button
                  className="edit-btn"
                  onClick={() => editId === task.id ? saveEdit(task.id) : startEdit(task)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-square-pen preview-icon">
                    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                  </svg>
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24"
                    viewBox="0 0 24 24"
                    fill="none" stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trash preview-icon">
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                    <path d="M3 6h18" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>

              </div>

            </li>

          ))}

        </ul>
      </div>

    </div>

  )
}

export default App