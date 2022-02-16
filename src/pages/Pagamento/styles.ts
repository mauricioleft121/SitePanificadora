import styled, { css } from 'styled-components';
import { lighten, shade } from 'polished';

interface ButtonProps {
  hasClicked: boolean;
  ButtonName: boolean;
}
interface DivProps {
  Selected: boolean;
}

interface ButtonTrocoProps {
  TrocoIs: number;
}

interface ButtonProps2 {
  Selected: boolean;
}

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DivTitle = styled.div`
  display: flex;
  margin-top: 30px;
`;

export const Title = styled.h1`
  font-size: 32px;
  color: #3d3d4d;
  @media (max-width: 425px) {
    font-size: 30px;
  }
  @media (max-width: 375px) {
    font-size: 24px;
    text-align: center;
  }
`;

export const DivButtons = styled.div<DivProps>`
  display: flex;
  flex-direction: column;

  margin-top: 30px;

  div {
    background: #f7f7f7;
    border: 0px solid #fff;
    border-radius: 0px 0px 5px 5px;
    display: flex;
    flex-direction: column;
    align-items: center;

    ${(props) =>
      props.Selected &&
      css`
        border: 1px solid #3d3d4d;
        border-top: 0;
      `}

    h1 {
      margin-top: 10px;
      font-size: 18px;
      font-weight: bold;
    }

    span {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 180px;
      margin-bottom: 10px;
    }
    input {
      margin-bottom: 10px;
      width: 50%;
      border: 1px solid #3d3d4d;
      border-radius: 2px;
      padding-left: 5px;

      &::placeholder {
        text-align: center;
      }
    }
  }
`;

export const ButtonTroco = styled.button<ButtonTrocoProps>`
  width: 80px;
  background-color: #e0e0e0;
  border: 1px solid #cbcbc9;
  border-radius: 5px;
  font-weight: bold;

  ${(props) =>
    props.TrocoIs === 1 &&
    css`
      border: 1px solid #3d3d4d;
    `}
`;

export const ButtonTroco2 = styled.button<ButtonTrocoProps>`
  width: 80px;
  background-color: #e0e0e0;
  border: 1px solid #cbcbc9;
  border-radius: 5px;
  font-weight: bold;

  ${(props) =>
    props.TrocoIs === 2 &&
    css`
      border: 1px solid #3d3d4d;
    `}
`;

export const Buttons = styled.button<ButtonProps>`
  width: 400px;
  height: 50px;
  border: 0px solid #fff;
  border-radius: 5px;
  background: #e66b00;
  transition: all 0.2s;
  font-weight: 600;
  font-size: 18px;
  color: #fff;

  @media (max-width: 375px) {
    width: 300px;
  }

  &:hover {
    background: ${lighten(0.1, '#e66b00')};
  }

  ${(props) =>
    props.ButtonName &&
    css`
      border: 1px solid #3d3d4d;
      border-radius: 5px 5px 0px 0px;
      border-bottom: 0;
    `}

  ${(props) =>
    props.hasClicked &&
    css`
      border: 1px solid #3d3d4d;
    `}

  & + button + div {
    border-radius: 5px 5px 0px 0px;
  }

  & + button {
    margin-top: 10px;
  }
  & + div + button {
    margin-top: 10px;
  }
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 0px solid #fff;
    background: transparent;
    border-radius: 0px;

    img {
      height: 40px;
      width: 40px;
      margin-right: 5px;
    }
    h1 {
      margin-right: 50px;
      margin-left: 10px;
      margin-top: 5px;
      font-weight: 600;
      font-size: 18px;
    }
  }
`;

export const DivMensagem = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 500px;

  @media (max-width: 425px) {
    width: 390px;
  }
  @media (max-width: 375px) {
    width: 300px;
  }

  strong {
    font-size: 22px;
    border: 1px solid #a8a8b3;
    padding: 10px;
    border-radius: 5px 0 0 5px;
    background: #cbcbd6;

    @media (max-width: 425px) {
      font-size: 20px;
      padding: 10px;
    }

    @media (max-width: 375px) {
      font-size: 16px;
      padding: 5px;
    }

    & + strong {
      border-radius: 0 5px 5px 0;
      border: 1px solid #a8a8b3;
      border-left: 0;
      background: #e0e0e0;
    }
  }
  a {
    text-decoration: none;
    button {
      width: 200px;
      height: 50px;
      border: 1px solid #fff;
      border-radius: 5px;
      background: #25d366;
      color: #fff;
      transition: all 0.2s;
      font-weight: 600;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;

      @media (max-width: 425px) {
        width: 175px;
        font-size: 15px;
      }
      @media (max-width: 375px) {
        height: 35px;
        width: 140px;
        font-size: 13px;
      }

      &:hover {
        background: ${shade(0.1, '#25d366')};
      }

      svg {
        margin-right: 5px;
      }
    }
  }
`;

export const GoBack = styled.button`
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;

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

export const TextCobranca = styled.p`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #3d3d4d;

  @media (max-width: 425px) {
    font-size: 18px;
  }
  @media (max-width: 375px) {
    font-size: 16px;
  }
  @media (max-width: 325px) {
    font-size: 14px;
  }
`;

export const DivData = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 500px;

  @media (max-width: 425px) {
    width: 390px;
  }
  @media (max-width: 375px) {
    width: 320px;
  }

  span {
    div {
      div {
      }
      input {
        background-color: #e0e0e0;
        border: 1px solid #a8a8b3;
        border-radius: 5px;
        height: 40px;
        text-align: center;
        cursor: pointer;
        font-weight: 600;
        @media (max-width: 425px) {
          width: 90%;
          margin-left: 12px;
        }
        @media (max-width: 375px) {
          width: 90%;
          margin-left: 8px;
        }
      }
    }
  }

  p {
    font-size: 18px;
    font-weight: 600;
    color: #3d3d4d;
    margin-bottom: 0px;

    @media (max-width: 425px) {
      font-size: 18px;
    }
    @media (max-width: 375px) {
      font-size: 16px;
    }
  }
`;

export const DivEntrega = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 500px;

  @media (max-width: 425px) {
    width: 390px;
  }
  @media (max-width: 375px) {
    width: 320px;
  }

  p {
    font-size: 18px;
    font-weight: 600;
    color: #3d3d4d;
    margin-bottom: 0px;

    @media (max-width: 425px) {
      font-size: 18px;
    }
    @media (max-width: 375px) {
      font-size: 16px;
    }
  }
`;

export const ButtonTrue = styled.button<ButtonProps2>`
  border: 2px solid #a8a8b3;
  padding: 5px 10px;
  border-radius: 5px 0px 0px 5px;
  font-weight: 600;
  width: 86px;
  margin-left: 180px;
  transition: background-color 0.2s ease-in;

  @media (max-width: 425px) {
    margin-left: 72px;
  }
  @media (max-width: 375px) {
    margin-left: 25px;
  }

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

export const ButtonFalse = styled.button<ButtonProps2>`
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

export const TextCobranca2 = styled.p`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #3d3d4d;

  @media (max-width: 425px) {
    font-size: 18px;
  }
  @media (max-width: 375px) {
    font-size: 16px;
  }
  @media (max-width: 325px) {
    font-size: 14px;
  }
`;
