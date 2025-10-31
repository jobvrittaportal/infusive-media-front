import styled from 'styled-components';

const MyDiv = styled.div`
.card_box {
  background: white;
  padding: 15px 10px;
  border-radius: 16px;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.stats-grid {
  width: 100%;
}

.stat-card {
  background-color: white;
  border-radius: 1rem;
filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15));
  padding: 15px 15px 15px 15px;
}

.card_label {
  color: #23272E;
}

.card_value {
font-size: 30px;
  color: #0052CC;
}
    .icon_btn {
   min-width: 40px;
    cursor: pointer;  
  }

.stat-title {
  font-family:Metropolis;
  color: #000000;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 4px;
  color: #1a202c;
}

.stat-change {
  font-family:Metropolis;
  color: #16a34a; 
}
.grid_container{
  grid-template-columns: repeat(12, 1fr);
}
.grid_gap_sm{
  grid-gap: 1rem;
}
`;

export default MyDiv;
