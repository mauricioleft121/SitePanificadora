import styled from 'styled-components';
import { shade, lighten } from 'polished';

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
`;

export const Prods = styled.div`
  margin-top: 20px;
  max-width: 900px;
  width: 90%;
  align-self: center;

  @media (max-width: 576px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 95%;
  }

  button {
    cursor: default !important;
    background: #f3f3f3;
    border-radius: 5px;
    border: 1px solid #e0e0e0;
    width: 100%;
    padding: 24px;
    text-decoration: none;

    @media (max-width: 425px) {
      padding: 10px;
    }

    display: flex;
    transition: border 0.2s;

    &:hover > img {
      border-color: ${shade(0.2, '#a8a8b3')};
    }

    &:hover {
      border-color: ${shade(0.2, '#f3f3f3')};
    }

    & + button {
      margin-top: 16px;
    }
    button {
      cursor: pointer !important;
      border-radius: 0;
      border: 0;
      width: 0px;
      margin-right: 10px;
      padding: 0;
      text-decoration: none;
      margin-top: 0;
      align-self: center;

      @media (max-width: 320px) {
        margin-right: 0;
      }
      @media (max-width: 768px) {
        padding-left: 20px;
      }
      svg {
        color: #3d3d4d;

        transition: all 0.2s;

        &:hover {
          color: ${shade(0.2, '#3d3d4d')};
        }
      }
    }
  }

  img {
    @media (max-width: 425px) {
      width: 0px;
      height: 0px;
      border-radius: 20%;
      border: 0px solid #a8a8b3;
    }
    width: 80px;
    height: 80px;
    border-radius: 20%;
    border: 0.5px solid #a8a8b3;
  }

  div {
    margin: 0 16px;
    flex: 1;
    padding-top: 10px;
    @media (max-width: 425px) {
      margin: 10px 0px 0;
      padding-top: 10px;
    }
    @media (max-width: 320px) {
      margin: 5px 0px 0;
    }
    strong {
      @media (max-width: 576px) {
        font-size: 16px;
      }
      @media (max-width: 425px) {
        font-size: 16px;
      }
      @media (max-width: 320px) {
        font-size: 16px;
      }
      font-size: 20px;
      color: #3d3d4d;
    }

    p {
      @media (max-width: 576px) {
        font-size: 0px;
        margin-top: 0px;
      }
      font-size: 18px;
      color: #a8a8b3;
      margin-top: 4px;
    }
  }
`;

export const Total = styled.span`
  align-self: center;
  flex: 0.3;
  margin-bottom: 15px;

  @media (max-width: 576px) {
    margin-top: 0px;
    flex: 1;
  }
  @media (max-width: 425px) {
    flex: 1;
  }
  @media (max-width: 375px) {
    flex: 1;
  }
  strong {
    color: #3d3d4d;
    padding-top: 0;
    @media (max-width: 375px) {
      font-size: 16px;
    }
  }
  p {
    color: #a8a8b3;
    margin-bottom: 5px;
  }
`;

export const Quant = styled.span`
  align-self: center;
  margin-right: 20px;

  @media (max-width: 576px) {
    margin-right: 50px;
  }
  @media (max-width: 425px) {
    margin-right: 0px;
  }
  @media (max-width: 375px) {
    margin-right: 0px;
  }
  @media (max-width: 320px) {
    margin-right: 0px;
  }
  div {
    display: flex;
    border: 1px solid #e0e0e0;
    align-items: center;
    width: 160px;
    max-height: 40px;
    padding-top: 0;
    align-self: center;

    @media (max-width: 576px) {
      width: 140px;
    }
    @media (max-width: 425px) {
      width: 130px;
      padding-top: 0;
      margin: 1rem 0px 0;
    }
    @media (max-width: 375px) {
      width: 110px;
    }
    @media (max-width: 320px) {
      width: 100px;
    }

    button {
      cursor: pointer !important;
      background-color: transparent;
      border: 0px;
      padding: 8px 22px;

      &:hover > strong {
        color: ${lighten(0.2, '#823d14')};
      }

      @media (max-width: 425px) {
        padding: 20px;
      }

      @media (max-width: 375px) {
        padding: 15px;
      }

      strong {
        color: #823d14;
        padding-top: 0;
        transform: color 0.2s;

        &:hover {
          color: ${lighten(0.2, '#823d14')};
        }
      }
    }
    p {
      margin: 0 20px;
      color: #000;
      font-weight: bold;
      font-size: 18px;

      @media (max-width: 576px) {
        margin: 0 10px;
      }
    }
  }

  p {
    color: #a8a8b3;
    font-size: 15px;
  }
`;

export const Botao = styled.button`
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
`;

export const Subtotal = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  margin-right: 80px;
  margin-top: 30px;

  @media (max-width: 1024px) {
    margin-right: 30px;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    align-self: center;
    border: 1px solid #a8a8b3;
    border-radius: 5px;
    padding: 5px 20px;
    background-color: #e0e0e0;
  }
`;

export const NoProds = styled.div`
  flex: 1;
  display: flex;
  margin-top: 50px;
  background: #f3f3f3;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  justify-content: center;
  align-self: center;

  strong {
    padding: 24px;
    text-decoration: none;
    font-size: 50px;
    color: #ff7500;

    justify-self: center;

    @media (max-width: 576px) {
      font-size: 28px;
    }
    @media (max-width: 375px) {
      font-size: 24px;
    }
    @media (max-width: 320px) {
      font-size: 20px;
    }
  }
`;

export const QuantKilo = styled.span`
  align-self: center;
  margin-right: 20px;

  @media (max-width: 576px) {
    margin-right: 50px;
  }
  @media (max-width: 425px) {
    margin-right: 0px;
  }
  @media (max-width: 375px) {
    margin-right: 0px;
  }
  @media (max-width: 320px) {
    margin-right: 0px;
  }

  div {
    display: flex;
    align-items: center;
    width: 160px;
    height: 40px;
    padding-top: 0;
    align-self: center;

    @media (max-width: 576px) {
      width: 140px;
    }
    @media (max-width: 425px) {
      width: 130px;
      padding-top: 0;
      margin: 1rem 0px 0;
    }
    @media (max-width: 375px) {
      width: 110px;
    }
    @media (max-width: 320px) {
      width: 100px;
    }

    input {
      max-width: 100%;
      height: 100%;
      font-size: 20px;
      font-weight: 600;
      background-color: #f3f3f3;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      text-align: center;
      transition: all 0.2s;
      color: #3d3d4d;

      @media (max-width: 576px) {
        font-size: 20px;
      }
      @media (max-width: 425px) {
        font-size: 18px;
      }
      @media (max-width: 375px) {
        font-size: 18px;
      }
      @media (max-width: 320px) {
        font-size: 16px;
      }

      &:hover {
        border-color: ${shade(0.1, '#e0e0e0')};
      }
    }
  }
  p {
    margin: 0 20px;
    color: #a8a8b3;
    font-weight: 300;
    font-size: 14px;

    @media (max-width: 576px) {
      margin: 0 10px;
    }
  }
`;
