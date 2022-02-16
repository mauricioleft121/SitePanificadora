import styled from 'styled-components';
import { lighten } from 'polished';

export const HeaderStyle = styled.header`
  padding-top: 22px;
  width: 100%;
  background: #e5e5e5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    padding-top: 30px;
    margin-bottom: 20px;

    a {
      color: #823d14;
      margin-left: 20px;
      text-decoration: none;
      display: block;
      font-size: 24px;
      transition: color 0.2s;

      &:hover {
        color: ${lighten(0.2, '#823d14')};
      }
    }
    div {
      width: 2px;
      background-color: #ec6e00;
      height: 35px;
      float: left;
      margin-left: 18px;
    }
  }
`;

export const HeaderImages = styled.span`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
`;

export const HeaderIcons = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-left: 90%;
  align-items: center;
  justify-content: space-between;

  span {
    margin-bottom: 20px;

    svg {
      background: #823d14;
      border-radius: 50%;
      padding: 2px;
      transition: background 0.2s;

      &:hover {
        background: ${lighten(0.2, '#823d14')};
      }
    }
  }

  svg {
    transition: color 0.2s;

    &:hover {
      color: ${lighten(0.2, '#823d14')};
    }
  }
`;
