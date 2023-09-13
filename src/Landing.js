import React from 'react'
import { Navbar,Brand } from './Components'
import {Blog,Feature,Footer,Whatblood,Header} from './containers'
import './Landing.css'
const Landing = () => {
  return (
    <div className='App'>
      <div className='gradient_bg'>
        <Navbar/>
        <Header/>
      </div>
      <Brand/>
      <Whatblood/>
      <Blog/>
      <Feature/>
      <Footer/>
    </div>
  )
}

export default Landing
