import styled, { css } from 'styled-components';
import { shade, lighten } from 'polished';

interface ButtonProps {
  Selected: boolean;
}

export const Body = styled.div`
  margin-left: 100px;
  margin-bottom: 50px;
`;
export const Titulo = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 600px;
  line-height: 56px;

  margin-top: 5px;
  margin-left: 40px;
  margin-bottom: 50px;
`;

export const Prods = styled.div`
  margin-left: 20px;
  max-width: 1100px;
  border-bottom: 2px solid #e0e0e0;
  border-top: 2px solid #e0e0e0;

  & + div {
    border-top: 0px solid #e0e0e0;
  }

  span {
    background: #f3f3f3;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;
    transition: border 0.2s;

    &:hover > img {
      border-color: ${shade(0.2, '#a8a8b3')};
    }

    &:hover {
      border-color: ${shade(0.2, '#f3f3f3')};
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
      flex-direction: column;
      align-items: center;

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

    span {
      display: flex;
      flex-direction: row;
      justify-content: center;
      flex: 1;
      max-width: 180px;
      padding: 0px;
    }
  }
`;

export const ButtonTrue = styled.button<ButtonProps>`
  border: 2px solid #a8a8b3;
  padding: 5px 10px;
  border-radius: 5px 0px 0px 5px;
  font-weight: 600;
  width: 86px;
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: ${shade(0.1, '#e0e0e0')};
  }

  ${(props) =>
    props.Selected &&
    css`
      background-color: #e80000;
      color: #fff;

      &:hover {
        background-color: #e80000;
      }
    `}

  & + button {
    border-left: 0px solid #a8a8b3;
    border-radius: 0px 5px 5px 0px;
  }
`;

export const ButtonFalse = styled.button<ButtonProps>`
  border: 2px solid #a8a8b3;
  padding: 5px 10px;
  border-radius: 5px 0px 0px 5px;
  font-weight: 600;
  width: 86px;
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: ${shade(0.1, '#e0e0e0')};
  }

  ${(props) =>
    !props.Selected &&
    css`
      background-color: #e80000;
      color: #fff;

      &:hover {
        background-color: #e80000;
      }
    `}

  & + button {
    border-left: 0px solid #a8a8b3;
    border-radius: 0px 5px 5px 0px;
  }
`;

export const GoBack = styled.button`
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  align-self: flex-start;

  position: relative;

  margin-top: 30px;
  margin-left: 30px;

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

export const ButtonMenu = styled.button`
  margin-left: 20px;
  margin-top: 0px;
  background-color: transparent;
`;

export const DivModal = styled.div`
  background: #fff;
  padding: 5px;
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: center;

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

  p + p {
    margin-top: 0px;
  }

  img {
    width: 290px;
    height: 290px;
    background-color: #333;
  }
`;

export const DivInputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80px;

  p {
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: 600;
  }

  input {
    width: 200px;
    border: 1px solid #e5e5ea;
    border-radius: 6px;
    position: relative;
    transition: border-color 0.2s;
    height: 36px;
    padding-left: 10px;

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }

    &:focus {
      border-color: ${shade(0.2, '#e5e5ea')};
    }

    &::placeholder {
      color: #8e8e93;
    }
  }
`;

export const ImagemDiv = styled.div`
  position: relative;
  width: 300px;
  height: 380px;
  border-radius: 5px;
  background: #333;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

export const Picker = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  align-items: center;
  margin-left: 0px;

  p {
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: 600;
  }
  form {
    width: 350px;
    display: flex;
    align-items: center;
    justify-content: center;

    select {
      width: 200px;
      border: 1px solid #e5e5ea;
      border-radius: 6px;
      position: relative;
      transition: border-color 0.2s;
      height: 36px;
      padding-left: 10px;
      margin-bottom: 30px;

      ::-webkit-inner-spin-button,
      ::-webkit-outer-spin-button {
        -webkit-appearance: none;
      }

      &:focus {
        border-color: ${shade(0.2, '#e5e5ea')};
      }

      &::placeholder {
        color: #8e8e93;
      }
    }
  }
`;

export const ButtonSubmit = styled.button`
  margin-top: 50px;
  height: 50px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid #fff;
  border-radius: 5px;
  background-color: #5ad156;
  color: #fff;
  font-weight: 600;
`;

export const DivModalAll = styled.div`
  width: 800px;
  height: 600px;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

export const ButtonArchive = styled.label`
  height: 50px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid #fff;
  border-radius: 5px;
  background-color: #5ad156;
  color: #fff;
  font-weight: 600;
  margin-top: 20px;

  input {
    display: none;
  }
`;

export const ModalDiv = styled.div`
  width: 500px;
  height: 500px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const ImageDiv = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background: #333;
`;

export const Buttonmodal = styled.button`
  flex: 1;
  width: 100%;
  background: #e0e0e0;

  font-size: 24px;
  font-weight: 600;

  transition: all 0.2s;

  &:hover {
    background: ${lighten(0.1, '#e0e0e0')};
  }
`;

export const CloseButton = styled.button`
  align-self: flex-end;
  margin-right: 50px;
  background-color: transparent;
`;
