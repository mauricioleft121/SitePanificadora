import styled from 'styled-components';

export const Page = styled.div`
  margin-top: 50px;
  margin-left: 150px;
  @media (max-width: 768px) {
    margin-top: 50px;
    margin-left: 125px;
  }
  @media (max-width: 576px) {
    margin-top: 50px;
    margin-left: 25px;
  }
  @media (max-width: 375px) {
    margin-top: 50px;
    margin-left: 10px;
  }

  h1 {
    font-size: 26px;
    font-weight: bold;
    color: #823d14;

    & + h2 + h1 {
      margin-top: 50px;
    }
  }
  h2 {
    font-size: 18px;
    margin-left: 5px;
    font-weight: 600;
  }
`;
