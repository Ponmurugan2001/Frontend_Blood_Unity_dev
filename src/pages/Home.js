import React from 'react'
import { useSelector } from 'react-redux'
import "./Home.css"
import donation1 from '.././assets/Donation_Poster_1.png'
import donation2 from '.././assets/Donation_Poster_2.jpg'
function Home() {
  const user = useSelector(state => state.user.user)
  console.log(user)
  return (
<div className='donation'>
    <h2>Upcoming Blood Donation Camps: Join the Lifesaving Series!</h2>
    <div className='donation_box'>
      
      <img src={donation1} alt="donation poster"/>
      <img src={donation2} alt="donation poster"/>
   
    </div>
    </div>
  )
}

export default Home