import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import NameContext from './NameContext'

interface HeaderProps {
    currentTime: number
}
export default (props: HeaderProps) => {
    const history = useHistory()

    const ctx = useContext(NameContext)

    const getName = () => ctx.player_name || 'no name yet'

    useEffect(() => {
        !ctx.player_name && history.push('/')
    }, [ctx.player_name])

    return <>
        <div className={'p-2'}>
            <label className={'bold float-l'}>{`Good luck, ${getName()}`}</label>
            <label className={'bold float-r purple'}>{`Your score: ${props.currentTime} seconds`}</label>
        </div>
        <div className={'p-2'}>
            <label className={'bold float-l fs-12 gray'}>Pick up the right cards</label>
            <label className={'bold float-r fs-12 gray'}>The faster the better</label>
        </div>
    </>
}