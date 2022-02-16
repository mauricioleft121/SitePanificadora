import styled from 'styled-components';
import { shade } from 'polished';

export const Prods = styled.div`
  margin-top: 34px;
  margin-bottom: 50px;
  align-items: center;
  display: flex;
  justify-content: center;

  ul {
    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 475px);
      column-gap: 50px;
    }
    @media (max-width: 1000px) {
      grid-template-columns: repeat(1, 550px);
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 550px);
    }
    @media (max-width: 576px) {
      grid-template-columns: repeat(1, 400px);
    }
    @media (max-width: 375px) {
      grid-template-columns: repeat(1, 320px);
    }
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(2, 550px);
    column-gap: 75px;
    box-sizing: border-box;
  }
`;

export const ListProds = styled.li`
  margin-top: 16px;
  flex: 1;

  button {
    background: #fff;
    width: 100%;
    padding: 24px;
    text-decoration: none;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    display: flex;
    transition: border 0.2s;
    cursor: default !important;

    &:hover {
      border-color: ${shade(0.2, '#e0e0e0')};
    }
  }

  img {
    @media (max-width: 576px) {
      width: 100px;
      height: 100px;
      border-radius: 10%;
    }
    width: 229px;
    height: 190px;
    border-radius: 10%;
    justify-self: center;
    align-self: center;
  }

  div {
    margin: 0px 20px;
    flex: 1;

    strong {
      font-size: 20px;
      color: #3d3d4d;
    }

    p {
      font-size: 18px;
      color: #a8a8b3;
      margin-top: 20px;
    }
  }
`;
