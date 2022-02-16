import styled from 'styled-components';
import { shade, lighten } from 'polished';

export const Page = styled.div`
  margin-top: 50px;
  display: flex;
  width: 55%;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
  justify-self: center;
  height: 100%;
`;

export const InputsPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ImagePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageDiv = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background: #333;
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

  input {
    display: none;
  }
`;

export const Imagem = styled.div`
  margin-top: 55px;
  border-radius: 6px;
  border: 3px solid #333;
  background-color: #333;
  width: 350px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    border-radius: 2px;
    border: 2px solid #fff;
    width: 305px;
    height: 305px;
  }
`;

export const Formulario = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 350px;
  justify-content: space-between;
  align-items: center;

  strong {
    font-size: 18px;
    margin-bottom: 10px;
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

export const Picker = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  width: 350px;
  align-items: center;

  strong {
    font-size: 18px;
    margin-bottom: 10px;
  }
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

export const GoBack = styled.button`
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  align-self: flex-start;

  position: absolute;

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
