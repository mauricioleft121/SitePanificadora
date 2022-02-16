import styled from 'styled-components';
import { shade } from 'polished';

export const Body = styled.div`
  margin-left: 100px;
`;
export const Titulo = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 900px;
  line-height: 56px;

  margin-top: 50px;
  margin-left: 40px;
  margin-bottom: 80px;
`;

export const Prods = styled.div`
  margin-left: 80px;
  margin-top: 20px;
  max-width: 1000px;

  a {
    background: #f3f3f3;
    border-radius: 5px;
    border: 1px solid #e0e0e0;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;
    transition: border 0.2s;

    &:hover > svg {
      color: ${shade(0.2, '#cbcbd6')};
    }

    &:hover > img {
      border-color: ${shade(0.2, '#a8a8b3')};
    }

    &:hover {
      border-color: ${shade(0.2, '#f3f3f3')};
    }

    & + button {
      margin-top: 16px;
    }
  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 20%;
    border: 0.5px solid #a8a8b3;
  }

  div {
    margin: 0 16px;
    flex: 1;
    display: flex;
    justify-content: center;

    strong {
      font-size: 20px;
      color: #3d3d4d;
    }

    p {
      font-size: 18px;
      color: #a8a8b3;
      margin-top: 4px;
    }
  }
  svg {
    margin-left: auto;
    color: #cbcbd6;
    transition: color 0.2s;
  }
`;
