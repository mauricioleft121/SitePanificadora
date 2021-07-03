import styled from 'styled-components';
import { shade } from 'polished';

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DivTitle = styled.div`
  display: flex;
  margin-top: 80px;
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

export const DivButtons = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 30px;

  button {
    width: 400px;
    height: 50px;
    border: 1px solid #fff;
    border-radius: 5px;
    background: #cbcbd6;
    transition: all 0.2s;
    font-weight: 600;
    font-size: 18px;

    @media (max-width: 375px) {
      width: 300px;
    }

    &:hover {
      background: ${shade(0.2, '#cbcbd6')};
    }
    &:focus {
      border: 1px solid #3d3d4d;
    }

    & + button {
      margin-top: 10px;
    }
  }
`;

export const DivMensagem = styled.div`
  margin-top: 50px;
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
