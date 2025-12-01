import styled from "styled-components";

const MyDiv = styled.div`
.card_box {
  background: white;
  padding: 5px 10px;
  border-radius: 12px;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
  .font-poppins {
    font-family: "Poppins", sans-serif;
  }
  .text_md {
    font-size: 16px;
  }
  .text_sm {
    font-size: 14px;
  }
  .text_regular {
    font-weight: 400;
  }
  .font_medium {
    font-weight: 500;
  }
  .text_semibold {
    font-weight: 600;
  }
  .font_dark {
    color: #1a202c;
  }
  .card_box {
    width: 100%;
  }
`;

export default MyDiv;
