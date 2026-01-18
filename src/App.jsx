import { useState } from 'react'
import  Header  from './components/Header'
import './App.css'

function App() {
  const [task , setTask]= useState("");
  const [tasks , setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask =()=>{
    if(task.trim()==="")
      return ;
    setTasks([...tasks,{text: task, completed: false, id: Date.now()}]);
    setTask("");
  }

  const deleteTask =(id)=>{
    setTasks(tasks.filter((_, index)=>index!==id))
  }

  console.log(tasks);

  const toggleComplete =(index)=>{
    const updatedTasks =tasks.map((t, i)=>
      i===index ? {...t, completed:!t.completed}:t
    );
    setTasks(updatedTasks);
  }


  const startEdit =(index, text)=>{
      setEditIndex(index);
      setEditText(text);
  }

  const saveEdit =(index)=>{
     const updatedTasks = tasks.map((t, i)=>
       i===index ? {...t, text:editText}:t
     )
     setTasks(updatedTasks);
     setEditIndex(null);
     setEditText("");
  }

  const cancelEdit =()=>{
    setEditIndex(null);
   setEditText("");
  }

  const filteredTasks = Array.isArray(tasks)
  ? tasks.filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true; // all
    })
  : [];

  return (
    
      <div>
        <Header title ={ "My Task Day App"}/>

<div style={{ marginTop: "20px" }}>
  <button onClick={() => setFilter("all")}>All</button>
  <button onClick={() => setFilter("active")} style={{ marginLeft: "5px" }}>
    Active
  </button>
  <button onClick={() => setFilter("completed")} style={{ marginLeft: "5px" }}>
    Completed
  </button>
</div>

        <input type="text" placeholder='Enter task' value ={task}  onChange ={(e)=>setTask(e.target.value)}/>

        <button onClick={addTask}>submit</button>

        <ul>
          {Array.isArray(filteredTasks) && filteredTasks.map((t, index)=>(
              <li key ={index}> 

              <input type ="checkbox" checked={t.completed} onChange ={()=>toggleComplete(index)}/>

              {editIndex === index ?(
              <>
              <input 
              type ="text" 
              value ={editText} 
              onChange ={(e)=>setEditText(e.target.value)}  
              style={{ marginLeft: "8px" }}/>

              <button onClick={()=>saveEdit(index)}>Save</button>
              <button onClick ={cancelEdit}>Cancel</button>
              </>

              ):(
              <>
              {t.text}
              <button onClick={()=>startEdit(index, t.text)}>Edit</button>
              <button onClick={()=>deleteTask(index)}>Delete</button>
              </>
              )}
          </li>
              
              
          ))}

        </ul>

        </div>
    
  )
}

export default App
