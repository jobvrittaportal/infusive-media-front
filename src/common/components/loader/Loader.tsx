import React from 'react'
import MyDiv from './Loader.style'
import { Spinner } from '@chakra-ui/react'

export default function Loader() {
  return (
    <MyDiv>
      <div className="preloader">
        <div className="circle-container">
          <div className="circle circle1" />
          <div className="circle circle2" />
        </div>
      </div>
    </MyDiv>
  )
}
