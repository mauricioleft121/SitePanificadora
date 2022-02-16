import styled, { css } from 'styled-components';
import { shade, lighten } from 'polished';

interface DivModals {
  isEmpty: boolean;
}

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  position: absolute;
`;

export const CarouselDiv = styled.div`
  justify-content: center;
  height: 400px;
  width: 100%;
  background: #823d14;

  img {
    width: 100%;
    height: 400px;
  }
`;

export const Prods = styled.div`
  margin-top: 34px;
  margin-bottom: 20px;
  align-items: center;
  display: flex;
  justify-content: center;

  ul {
    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 475px);
      column-gap: 40px;
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

  span {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 200px;

    p {
      font-size: 18px;
      color: #3d3d4d;
      margin-left: auto;
      font-weight: 600;
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
        margin-left: 0px;
      }
    }
  }
`;

export const DivModal = styled.div<DivModals>`
  background: #fff;
  flex: 0 0 20%;
  width: 100%;
  max-height: 300px;
  height: 100%;
  padding: 5px;
  text-decoration: none;
  border: 1px solid #e0e0e0;
  border-radius: 4px;

  display: flex;

  @media (max-width: 576px) {
    flex: 0 0 5%;
  }
  @media (max-width: 375px) {
    flex: 0 0 5%;
    width: 90%;
  }
  @media (max-width: 320px) {
    flex: 0 0 5%;
    width: 100%;
  }

  img {
    width: 230px;
    height: 200px;
    border-radius: 10%;
    align-self: center;

    @media (max-width: 576px) {
      width: 0;
      height: 0;
      border-radius: 0;
    }
  }

  div {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;

    strong {
      font-size: 20px;
      color: #3d3d4d;
      text-align: center;

      @media (max-width: 576px) {
        font-size: 24px;
      }
    }

    p {
      font-size: 18px;
      color: #a8a8b3;
      margin-top: 40px;
      text-align: center;

      ${(props) =>
        props.isEmpty &&
        css`
          margin-top: 70px;
        `}
    }
  }
`;

export const Conter = styled.span`
  margin-top: 50px;
  display: flex;
  flex: 0 0 20%;

  @media (max-width: 375px) {
    margin-top: 70px;
  }

  div {
    display: flex;
    border: 1px solid #e0e0e0;
    width: 120px;
    align-items: center;
    flex-direction: row;

    height: 40px;

    @media (max-width: 375px) {
      width: 100px;
    }

    button {
      width: 50px;
      background-color: transparent;
      border: 0px;

      strong {
        color: #823d14;
      }
    }
    p {
      margin: 0 20px;
      color: #000;
      font-weight: bold;
    }
  }
`;

export const Comprar = styled.form`
  button {
    margin-top: 20px;
    width: 220px;
    height: 40px;
    border: 1px solid #e0e0e0;
    background-color: #823d14;
    border-radius: 2px;

    transition: border 0.2s;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover {
      background-color: ${lighten(0.1, '#823d14')};
      border-color: ${shade(0.2, '#e0e0e0')};
    }

    @media (max-width: 375px) {
      width: 190px;
    }
    @media (max-width: 320px) {
      width: 150px;
    }

    strong {
      color: #fff;
      margin-left: 10px;

      font-size: 20px;

      @media (max-width: 375px) {
        font-size: 16px;
      }
      @media (max-width: 320px) {
        font-size: 14px;
      }

      & + strong {
        margin-right: 10px;
      }
    }
  }
`;

export const Kilo = styled.span`
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 20px;
    font-weight: bold;
  }
  div {
    margin: 0;
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    input {
      margin-top: 1px;
      max-width: 150px;
      height: 39px;
      border: 1px solid #3d3d4d;
      border-radius: 2px;
      font-weight: bold;
      padding: 2px;
      background-color: #e0e0e0;

      &::placeholder {
        text-align: center;
      }

      &:focus::placeholder {
        color: transparent;
      }
    }
    form {
      margin-left: 5px;
      button {
        width: 220px;
        height: 40px;
        border: 1px solid #e0e0e0;
        background-color: #823d14;
        border-radius: 2px;

        transition: border 0.2s;
        transition: background-color 0.2s;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &:hover {
          background-color: ${lighten(0.1, '#823d14')};
          border-color: ${shade(0.2, '#e0e0e0')};
        }

        @media (max-width: 375px) {
          width: 190px;
        }
        @media (max-width: 320px) {
          width: 150px;
        }

        strong {
          color: #fff;
          margin-left: 10px;

          font-size: 20px;

          @media (max-width: 375px) {
            font-size: 16px;
          }
          @media (max-width: 320px) {
            font-size: 14px;
          }

          & + strong {
            margin-right: 10px;
          }
        }
      }
    }
  }
`;

export const DivButtonContinue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  background-color: #823d14;
  height: 100px;
  padding-top: 20px;
  margin-top: auto;
  button {
    height: 50px;
    border: 1px solid #fff;
    border-radius: 5px;
    padding: 0 10px;

    background-color: #ff7500;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${shade(0.1, '#ff7500')};
    }
    strong {
      color: #fff;
    }
  }
  a {
    text-decoration: none;
  }
`;
