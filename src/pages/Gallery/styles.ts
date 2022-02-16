import styled, { css } from 'styled-components';

interface MobileProps {
  isMobile: boolean;
}

export const Page = styled.div<MobileProps>`
  background-color: #823d14;
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;

  ${(props) =>
    props.isMobile &&
    css`
      background-color: #e5e5e5;
    `}
`;

export const GridDivImagens = styled.ul`
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 470px);
    column-gap: 40px;
  }
  @media (max-width: 1000px) {
    grid-template-columns: repeat(1, 550px);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 550px);
  }
  @media (max-width: 576px) {
    grid-template-columns: repeat(1, 375px);
  }
  @media (max-width: 375px) {
    grid-template-columns: repeat(1, 320px);
  }
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(2, 550px);
  column-gap: 40px;
  box-sizing: border-box;
  margin-top: 25px;
  margin-bottom: 75px;
`;

export const DivImagens = styled.li<MobileProps>`
  margin-top: 40px;

  ${(props) =>
    props.isMobile &&
    css`
      margin-top: 30px;
    `}
  img {
    @media (max-width: 1024px) {
      width: 470px;
      height: 300px;
    }
    @media (max-width: 1000px) {
      width: 550px;
      height: 325px;
    }
    @media (max-width: 768px) {
      width: 550px;
      height: 325px;
    }
    @media (max-width: 576px) {
      width: 375px;
      height: 225px;
    }
    @media (max-width: 375px) {
      width: 320px;
      height: 200px;
    }
    @media (max-width: 320px) {
      width: 300px;
      height: 200px;
    }
    width: 550px;
    height: 325px;
    box-shadow: 0 0 1em #e5e5e5;
    border: 2px solid #e5e5e5;
    border-radius: 5px;

    ${(props) =>
      props.isMobile &&
      css`
        box-shadow: 0 0 1em #7e7e7e;
        border: 2px solid #7e7e7e;
      `}
  }
`;
