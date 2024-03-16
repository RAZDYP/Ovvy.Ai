import logo from './logo.svg';
import './App.css';
import Navbaar from './components/Navbaar';
import CreateToken from './components/CreateToken';
import HaveToken from './components/HaveToken';
import TokenTab from './components/TokenTab';
import { useState } from 'react';
import * as React from 'react'

import { ChakraProvider } from '@chakra-ui/react'


// bootstrap import
import "bootstrap/dist/css/bootstrap.css";
function App() {

  const [createToken, setCreateToken] = useState(true)
  const [haveToken, setHaveToken] = useState(false)
  const [token, setToken] = useState('')

  const handleCreateTokenTab = () => {
    setCreateToken(true)
    setHaveToken(false)
  }

  const handleHaveTokenTab = () => {
    setCreateToken(false)
    setHaveToken(true)
  }

  console.log("this is token: ", token)

  return (
    <ChakraProvider>
      <div className="App">
        <Navbaar />
        <div class="container col-md-9">
          <div class="card w-100 shadow">
            <TokenTab
              handleCreateTokenTab={handleCreateTokenTab}
              handleHaveTokenTab={handleHaveTokenTab}
            />
            <div class="card">
              <div class="formbold-main-wrapper">
                <div class="">
                  {createToken && <CreateToken token={token} setToken={setToken} />}
                  {haveToken && <HaveToken token={token} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
