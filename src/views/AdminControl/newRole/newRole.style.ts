import styled from 'styled-components'

const MyDiv = styled.div`
.page_heading{
    margin-bottom: 24px;
}
.btn {
    background:rgb(112, 109, 109);
    color:white;
    &:hover{
    background:rgb(112, 109, 109);
    color:white;
  }
}

.addName{
    width:368px;
}
.textarea{
    width:368px;
    height:214px;
}
.featureBox {
    transition: 0.3s;
  }

  .featureBox:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }

  .accordian{
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1));
  }
`
export default MyDiv
