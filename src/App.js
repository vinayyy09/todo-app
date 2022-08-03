import React, {useState, useEffect} from "react";
import {AiOutlinePlus} from 'react-icons/ai'
import Todo from "./Todo";
import {db} from './firebase'
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore'
import { async } from "@firebase/util";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#000428] to-[#1cb5e0]`,
  container: `p-5 bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl`,
  heading: `text-4xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl `,
  button: `border p-4 ml-2 bg-blue-500 text-slate-100`,
  count: `text-center p-2`,
  aboutt: `flex flex-nowrap font-medium py-3 text-lg`,
  d: `m-1`
}

function App() {

  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  //create todo

  const createTodo = async (e) => {
    e.preventDefault(e)
    if(input === '') {
      alert('Please enter a valid task')
      return
    }
    await addDoc(collection(db, 'todos'),{
      text: input,
      completed: false,
    })
    setInput('')
  }

  //read todo from firebase

  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = []
      querySnapshot.forEach((doc) => {
        todosArr.push({...doc.data(), id: doc.id})
      })
      setTodos(todosArr)
    })
    return () => unsubscribe()
  },[])

  //update todo in firebase

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id),{
      completed: !todo.completed
    }
    )
  }

  //delete todo

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }

  const date = new Date()
  const days = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  const months = ["January", "February", "March", "April", "May", "June", "July", "August" , "September", "October", "November", "December"]

  return ( 
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>To Do App</h3>

        <div className={style.aboutt}>
          <p className={style.d}>{days[date.getDay()]}</p>
          <p className={style.d}>{date.getDate()},</p>
          <p className={style.d}>{months[date.getMonth() ]}</p>
          <p className={style.d}>{date.getFullYear()}</p>
        </div>

        <form onSubmit={createTodo} className={style.form}>
          <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type="text" placeholder="Add task" />
          <button className={style.button}><AiOutlinePlus size={30} /></button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
          ))}
        </ul>
        {todos.length< 1 ? null : <p className={style.count}>{`You have ${todos.length} tasks pending.`}</p>}
        
      </div>
    </div>
    )
}
export default App;