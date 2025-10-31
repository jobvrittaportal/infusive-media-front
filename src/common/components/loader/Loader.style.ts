import styled from 'styled-components'

const MyDiv = styled.div`
.preloader {
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background: rgba(0,0,0,0.6);
}
.circle-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 50px;
  height: 50px;
}

.circle {
  position: absolute;
  top: 0;
  left: 0;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #fff;
}

.circle1 {
  animation: circle1 1.5s ease-in-out infinite;
  background-color: #0052CC;
  // background-color: #2E90FA;
}

.circle2 {
  animation: circle2 1.5s ease-in-out infinite;
  background-color: #ffffff;
}

@keyframes circle1 {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(30px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes circle2 {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-30px);
  }
  100% {
    transform: translateX(0);
  }
}

  
`
export default MyDiv
