import styled from 'styled-components';
import { shade } from 'polished';

interface ButtonProps {
  Color: string;
}

export const Body = styled.div`
  margin-left: 100px;
`;
export const Titulo = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;

  margin-top: 50px;
  margin-left: 40px;
`;

export const Prods = styled.div`
  margin-left: 80px;
  margin-top: 20px;
  max-width: 1000px;

  button {
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

export const TituloProds = styled.h4`
  margin-left: 80px;
  margin-top: 60px;

  font: 32px Lato, sans-serif;
  color: #3a3a3a;
`;

export const SelectedProds = styled.div`
  margin-top: 34px;
  margin-bottom: 50px;
  max-width: 500px;
  align-items: center;

  ul {
    list-style-type: none;
    display: grid;
    grid-template-columns: 500px 500px;
    column-gap: 120px;
  }
`;

export const ListSelectedProds = styled.li`
  margin-top: 16px;

  span {
    background: #fff;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    border: 1px solid #e0e0e0;
    border-radius: 4px;

    display: flex;
    align-items: center;

    transition: border 0.2s;

    &:hover {
      border-color: ${shade(0.2, '#e0e0e0')};
    }
  }

  img {
    width: 229px;
    height: 190px;
    border-radius: 10%;
  }

  div {
    margin: 0 20px;
    flex: 1;

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
`;

export const Botoes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin: 20px;
`;

export const Botao = styled.button<ButtonProps>`
  margin-right: 50px;
  width: 125px;
  height: 50px;
  border: 1px solid #fff;
  border-radius: 5px;

  background: ${(props) => props.Color};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => shade(0.1, props.Color)};
  }
  strong {
    color: #fff;
  }
`;
