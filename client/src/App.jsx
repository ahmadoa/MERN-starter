import { useState, useEffect } from 'react'
import Axios from "axios"

function App() {
  const [users, setUsers] = useState([]);
  const [age, setAge] = useState(0)
  const [name, setName] = useState("")
  const [username, setUsername] = useState(0)


  useEffect(()=>{
    Axios.get("http://localhost:3001/getUsers").then((res)=>{
      setUsers(res.data);
    })
  },[]);

  const createUser = () => {
    Axios.post("http://localhost:3001/createUser", {
      name,
      age,
      username
    }).then((res)=>{
      setUsers(...prevUsers, {name,
        age,
        username});
    })
  }

return (<div>
  <div>
    {users.map((user) => {
      return (<div key={user.name}>
        <h1>Name: {user.name}</h1>
        <h2>Username: {user.username}</h2>
        <h3>Age: {user.age}</h3>
        <hr></hr>
      </div>)
    })}
  </div>
  <div>
    <input type="text" placeholder="Name....." onChange={(e) => {
      setName(e.target.value)
    }}/>
    <input type="number" placeholder="Age..." onChange={(e) => {
      setAge(e.target.value)
    }}/>
    <input type="text" placeholder='Username....' onChange={(e) => {
      setUsername(e.target.value)
    }}/>
    <button onClick={createUser()}>Create User</button>
  </div>
</div>)
}

export default App
