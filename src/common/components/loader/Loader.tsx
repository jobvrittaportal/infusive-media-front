import MyDiv from './Loader.style'

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
