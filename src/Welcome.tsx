import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import NameContext from './NameContext'

export default () => {
    const history = useHistory()
    const ctx = useContext(NameContext)

    const [username, setUsername] = useState('')
    const changeName = (e: any) => setUsername(e.target.value)

    const goToGame = () => {
        ctx.player_name = username
        history.push(`/game`, { name: username })
    }

    return <div className="App">
        <label>Hello friend, tell me your name...</label>
        <input placeholder={'Your name here'} value={username} onChange={changeName} />
        <button onClick={goToGame}>Let's go</button>
    </div>
}