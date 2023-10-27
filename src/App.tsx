import { useState } from 'react';
import './App.css';


export default function App() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState<string[]>([])
  const [editTask, setEditTask] = useState({
    enabled: false,
    task: ''
  })

  function handleTaskInput() {
    if (!input) {
      alert('You must fill in the task field');
      return;
    } if (editTask.enabled) {
      handleSaveEdit();
      return;
    }
    setTasks(tasks => [...tasks, input]);
  }

  function handleSaveEdit() {
    const findIndexTask = tasks.findIndex(item => item === editTask.task);
    const allTasks = [...tasks];
    allTasks[findIndexTask] = input;
    setTasks(allTasks);
    editTask.enabled = false;
    setInput('');
  }

  function handleDel(task: string) {
      const removeTasks = tasks.filter(item => item !== task);
      setTasks([...removeTasks]);
  }

  function handleEdit(task: string) {
    setInput(task);
    setEditTask({
      enabled: true,
      task: task
    })
  }

  return (
    <>
      <h1>Tasks</h1>
      <input type="text"
        placeholder='Adicionar uma tarefa' 
        className='add-task-input'
        value={input}
        onChange={e => setInput(e.target.value)}
        />
        <button className='add-task' onClick={handleTaskInput}>
          {editTask.enabled ? 'Atualizar tarefa' : 'Adicionar Tarefa'}
          </button>
      <hr />
      {tasks.map((task, index) => (
        <section key={index}>
          <span>{task}</span>
          <button onClick={() => handleEdit(task)}>Edit</button>
          <button className='del-task' onClick={() => handleDel(task)}>Del</button>
        </section>
      ))}
    </>
  )
}

