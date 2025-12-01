import styled from 'styled-components';

const MyDiv = styled.div`
  .page_wrapper {
     padding-top: 8px;
     
  }

  .page_heading {
    margin-bottom: 16px;
  }

  .flex_header {
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .filter_section {
    display: flex;
    gap: 10px;
  }
  .icon_btn {
   min-width: 40px;
    cursor: pointer;  
  }
  /* Calendar */
  .react-calendar {
    font-family: 'Poppins', sans-serif;
    width: 220px;
    max-width: 100%;
    font-size: 12px;
    border: none;
    border-radius: 8px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
  }

  .react-calendar__tile {
    padding: 6px 0;
  }

  .react-calendar__navigation button {
    min-width: 28px;
    font-size: 12px;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #ff6b6b;
  }

  /* Table */
  .table_header {
    background-color: #f9fafb !important;
  }

  .row_striped {
    background-color: #f1f5f9;
  }

    .btn {
    background: #1565d8;
    color: white;
    &:hover {
      background: #1565d8;
      color: white;
    }
  }

 .empId {
    text-decoration: underline;
    color: rgba(0, 122, 255, 1);
    cursor: pointer;
  }
  
`;

export default MyDiv;
