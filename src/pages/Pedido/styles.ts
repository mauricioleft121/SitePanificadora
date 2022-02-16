import styled from 'styled-components';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e5e5e5;
  height: 100%;
  position: absolute;
  width: 100%;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  background-color: #ff7500;
  padding: 50px;
  border-radius: 10px;
  border: 4px solid #823d14;

  @media (max-width: 768px) {
    margin-top: 30px;
    width: 500px;
  }
  @media (max-width: 425px) {
    width: 350px;
    height: 420px;
    margin-top: 30px;
  }
  @media (max-width: 375px) {
    width: 350px;
    height: 420px;
    margin-top: 30px;
  }
  @media (max-width: 320px) {
    width: 320px;
    height: 400px;
    margin-top: 30px;
  }
`;
export const Titulo = styled.h1`
  font-size: 32px;
  color: #823d14;
  max-width: 450px;
  font-weight: bold;
  text-align: center;

  margin-bottom: 40px;

  @media (min-width: 320px) {
    width: 300px;
  }
  @media (min-width: 375px) {
    width: 330px;
  }
  @media (min-width: 768px) {
    max-width: 450px;
  }
`;

export const Formulario = styled.form`
  display: flex;
  flex-direction: column;

  @media (min-width: 320px) {
    width: 300px;
  }
  @media (min-width: 375px) {
    width: 330px;
  }
  @media (min-width: 768px) {
    width: 400px;
  }

  span {
    display: flex;
    justify-content: space-between;
    input {
      height: 40px;
      border: 0;
      border-radius: 5px;
      background-color: #f3f3f3;
      flex-wrap: wrap;
      flex-grow: 1;
      margin-bottom: 10px;
      padding: 5px;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.2s;
      font-weight: 600;

      @media (min-width: 320px) {
        max-width: 200px;
      }
      @media (min-width: 375px) {
        max-width: 220px;
      }
      @media (min-width: 768px) {
        max-width: 270px;
      }

      &::placeholder {
        color: #b8b8c2;
        font-weight: bold;
      }

      &:focus {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
      }

      & + input {
        @media (min-width: 320px) {
          max-width: 70px;
        }
        @media (min-width: 375px) {
          max-width: 85px;
        }
        @media (min-width: 768px) {
          max-width: 100px;
        }
      }
    }
  }
  input {
    height: 40px;
    border: 0;
    border-radius: 5px;
    background-color: #f3f3f3;
    width: 100%;
    margin-bottom: 10px;
    padding: 5px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s;
    font-weight: 600;

    &::placeholder {
      color: #b8b8c2;
      font-weight: bold;
    }

    &:focus {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
  }
`;

export const Button = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  width: 100%;
  height: 100px;
  border-radius: 10px;
  align-items: center;
  margin-top: auto;
`;

export const Disable = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 0 0 100%;
  @media (min-width: 576px) {
    flex: 0 0 100%;
  }
  @media (min-width: 768px) {
    flex: 0 0 50%;
  }
  @media (min-width: 1024px) {
    flex: 0 0 37.5%;
  }
  div {
    flex: 0 0 50%;
    max-width: 50%;
    p {
    }
  }
  div {
    flex: 0 0 50%;
    max-width: 50%;
    button {
      width: 100%;
      height: 60%;
      border-radius: 5px;
      border: 1px solid #e0e0e0;
      padding: 10px;
      text-decoration: none;
      color: #7e7e7e;
      font-size: 20px;
      font-weight: 600;
    }
  }
`;

export const Enable = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 0 0 90%;
  @media (min-width: 576px) {
    flex: 0 0 80%;
  }
  @media (min-width: 768px) {
    flex: 0 0 50%;
  }
  @media (min-width: 1024px) {
    flex: 0 0 37.5%;
  }
  div {
    flex: 0 0 50%;
    p {
      font-size: 20px;
      font-weight: 500;
    }
  }
  div {
    flex: 0 0 50%;
    button {
      width: 100%;
      border-radius: 5px;
      border: 1px solid #e0e0e0;
      padding: 8px 5px;
      color: #fff;
      font-size: 20px;
      font-weight: 600;
      background-color: #ff7500;
    }
  }
`;

export const GoBack = styled.button`
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  align-self: flex-start;

  position: absolute;

  margin-top: 15px;
  margin-left: 15px;

  @media (max-width: 425px) {
    margin-top: 10px;
    margin-left: 5px;
  }
  @media (max-width: 375px) {
    margin-top: 5px;
    margin-left: 5px;
  }

  svg {
    color: #3d3d4d;
  }
`;
