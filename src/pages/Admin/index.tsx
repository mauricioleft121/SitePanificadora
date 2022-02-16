import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import { Body, Titulo, Prods } from './styles';

const Admin: React.FC = () => {
  return (
    <>
      <Body>
        <Titulo>Bem-Vindo ao Painel Administrativo</Titulo>

        <Prods>
          <Link to="/a89d6642c31c33525be583f4333b37d260d14903319a846e4f1e9e091a978592/admin/diaryprods">
            <div>
              <strong>Produtos</strong>
            </div>
            <FiChevronRight size={20} />
          </Link>
        </Prods>

        <Prods>
          <Link to="/a89d6642c31c33525be583f4333b37d260d14903319a846e4f1e9e091a978592/admin/createprods">
            <div>
              <strong>Cadastrar um novo produto</strong>
            </div>
            <FiChevronRight size={20} />
          </Link>
        </Prods>

        <Prods>
          <Link to="/a89d6642c31c33525be583f4333b37d260d14903319a846e4f1e9e091a978592/admin/deleteprods">
            <div>
              <strong>Deletar um produto</strong>
            </div>
            <FiChevronRight size={20} />
          </Link>
        </Prods>
      </Body>
    </>
  );
};

export default Admin;
