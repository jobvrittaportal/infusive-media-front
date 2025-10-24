import styled from 'styled-components';

const MyDiv = styled.div`
.greeting{
font-family:REM;

}
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
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.2s ease-in-out;
}

// .stat-card:hover {
//   transform: translateY(-4px);
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
// }

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
