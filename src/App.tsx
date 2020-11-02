import React from 'react';
import './App.css';
import Welcome from './Welcome';
import { Route } from 'react-router-dom'
import Game from './Game';
import { useContext } from 'react';
import NameContext from './NameContext';

export default () => {

  return <>
    <NameContext.Provider value={{ player_name: '' }}>
      <Route exact path={'/'}>
        <Welcome />
      </Route>
      <Route path={'/game'}>
        <Game />
      </Route>
    </NameContext.Provider>
  </>
}
