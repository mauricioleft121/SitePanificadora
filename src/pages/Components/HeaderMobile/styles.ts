import styled from 'styled-components';

export const HeaderStyle = styled.div`
  header {
    background-color: #823d14;

    div {
      justify-content: space-between;
      img {
        display: flex;
        justify-self: center;
        margin: 5px;
        height: 80px;
        width: 80px;
      }
    }
  }
`;

export const DrawerStyle = styled.div`
  width: 200px;
  div {
    border-bottom: 1px solid #e0e0e0;
  }
  ul {
    padding: 0;
    a {
      text-decoration: none;
      color: #000;
    }
    div {
      border-bottom: 1px solid #e0e0e0;

      div {
        border: 0px solid #e0e0e0;
        span {
          font-weight: bold;
        }
      }
    }
  }
`;

export const Title = styled.h6`
  font-weight: bold;
  font: 22px Lato, sans-serif;
`;
