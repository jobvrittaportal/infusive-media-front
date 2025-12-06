import React from 'react'
import MyDiv from './loader.style'

export default function Loader() {
  return (
    <MyDiv>
      <div className="preloader">
        {/* <div className="lds-ellipsis"><div /><div /><div /></div> */}
        <div className="circle-container">
          <div className="circle circle1" />
          <div className="circle circle2" />
        </div>
      </div>
    </MyDiv>
  )
}
