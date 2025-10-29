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
// .lds-ellipsis {
//     display: inline-block;
//     position: relative;
//     width: 80px;
//     height: 80px;
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     z-index:1000;
//   }
//   .lds-ellipsis div {
//     position: absolute;
//     width: 13px;
//     height: 13px;
//     border-radius: 50%;
//     background: #fff;
//     animation-timing-function: cubic-bezier(0, 1, 1, 0);
//   }
//   .lds-ellipsis div:nth-child(1) {
//     left: 8px;
//     animation: lds-ellipsis1 0.6s infinite;
//   }
//   .lds-ellipsis div:nth-child(2) {
//     left: 8px;
//     animation: lds-ellipsis2 0.6s infinite;
//   }
//   .lds-ellipsis div:nth-child(3) {
//     left: 32px;
//     animation: lds-ellipsis2 0.6s infinite;
//   }
//   .lds-ellipsis div:nth-child(4) {
//     left: 56px;
//     animation: lds-ellipsis3 0.6s infinite;
//   }
//   @keyframes lds-ellipsis1 {
//     0% {
//       transform: scale(0);
//     }
//     100% {
//       transform: scale(1);
//     }
//   }
//   @keyframes lds-ellipsis3 {
//     0% {
//       transform: scale(1);
//     }
//     100% {
//       transform: scale(0);
//     }
//   }
//   @keyframes lds-ellipsis2 {
//     0% {
//       transform: translate(0, 0);
//     }
//     100% {
//       transform: translate(24px, 0);
//     }
//   }
  
`
export default MyDiv
