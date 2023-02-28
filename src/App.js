import { React, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFormSubmit = async (event) => {
    event.preventDefault()
    await axios.post(`${process.env.REACT_APP_LINK_API}login`, {
      email: email,
      password: password
    }).then((res) => {
      console.log(res.data)
      auth()
    }).catch((err) => {
      console.log(err)
    })
  }

  const auth = useCallback(() => {
    axios.get(`${process.env.REACT_APP_LINK_API}auth`)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    auth()
  }, [auth])

  return (
    <>
      <p>login</p>
      <form onSubmit={onFormSubmit}>
        <input value={email} type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input value={password} type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={onFormSubmit}>submit</button>
      </form>
    </>
  );
}

export default App;
