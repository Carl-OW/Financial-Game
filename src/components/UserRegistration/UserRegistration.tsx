import React, { FormEvent } from "react";
import './UserRegistration.css'

function getFromLocalStorage(key: string): Storage {
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : {}
}

function addToLocalStorage(key: string, data: Storage){
  const localStorageObject = getFromLocalStorage(key)

  localStorage.setItem(key, JSON.stringify({...localStorageObject, ...data}))
}

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()

  const formData: EventTarget = event.target

  addToLocalStorage("quiz", {[formData.elements.email.value]:{name: formData.elements.name.value, email: formData.elements.email.value, score: 9000}})
}

const UserRegistration: React.FC = () => {

  return (<div className='formContainer'>
    <form id='signupForm' onSubmit={handleSubmit}>
      <label 
      <input type='text' id='name' name='name'>
      </input>
      <input type='email' id='email' name='email'>
      </input>
      <button>HELO</button>
    </form>
  </div>)
}

export default UserRegistration

type GameData = {
  name: string
  email: string
  score: number
}

type Storage = {
  [key: string]: GameData
}