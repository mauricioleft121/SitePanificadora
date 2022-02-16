import React from 'react';
import { FiFacebook, FiInstagram } from 'react-icons/fi';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';

import { HeaderStyle, HeaderImages, HeaderIcons } from './styles';

import logoImg from '../../../assets/logo.svg';

const Header: React.FC = () => {
  return (
    <>
      <HeaderStyle>
        <HeaderImages>
          <Link to="/">
            <img src={logoImg} alt="Panificadora Ubaense" />
          </Link>
          <HeaderIcons>
            <span>
              <a
                href="https://www.facebook.com/panificadoraubaense"
                target="_blank"
                rel="noreferrer"
              >
                <FiFacebook size={40} color="#fff" />
              </a>
            </span>
            <a
              href="https://www.instagram.com/panificadoraubaense/"
              target="_blank"
              rel="noreferrer"
            >
              <FiInstagram size={40} />
            </a>
          </HeaderIcons>
        </HeaderImages>
        <div>
          <Link to="/">
            <strong>Início</strong>
          </Link>
          <div />
          <Link to="galeria">
            <strong>Galeria</strong>
          </Link>
          <div />
          <Link to="contato">
            <strong>Contato</strong>
          </Link>
          <div />
          <Link to="carrinho">
            <strong>Meu Carrinho</strong>
            <ShoppingCartIcon fontSize="large" />
          </Link>
        </div>
      </HeaderStyle>
    </>
  );
};

export default Header;
