import React, { ReactElement } from 'react';
import FriendList from './components/FriendList';
import RHImage from './assets/rh.jpg';
const App = (): ReactElement => {
  const uri = 'https://www.haptik.ai';
  return (
    <div className="App">
      <header>
        <a href={uri}>
          <img className="logo" src={RHImage} alt="Jio Haptik" /></a>
      </header>
      <div className="fl">
        <FriendList />
      </div>
    </div>
  );
}

export default App;
