import React, { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';

import api from '../../../services/index';
import storage from '../../../services/firebase';

import { Body, Titulo, Prods, GoBack } from './styles';

interface Produtos {
  id: string;
  imagem: string;
  nome: string;
  descricao: string;
  venda: string;
  valor: number;
  valorKilo: number;
}

const DeletarProds: React.FC = () => {
  const [Prodts, setProdts] = useState<Produtos[]>([]);

  const DeleteProd = async (prod: Produtos): Promise<void> => {
    await storage.ref(`/images/${prod.id}`).delete();

    await api.delete('/products', {
      data: {
        nome: prod.nome,
      },
    });

    await api.get('/products').then((response) => {
      setProdts(response.data);
    });
  };

  useEffect(() => {
    api.get('/products').then((response) => {
      setProdts(response.data);
    });
  }, []);

  return (
    <>
      <GoBack>
        <Link to="/a89d6642c31c33525be583f4333b37d260d14903319a846e4f1e9e091a978592/admin">
          <ArrowBackIcon />
        </Link>
      </GoBack>
      <Body>
        <Titulo>Deletar Produtos</Titulo>

        {Prodts.sort((a, b) => a.nome.localeCompare(b.nome)).map((prod) => (
          <Prods key={prod.nome}>
            <span>
              <img src={prod.imagem} alt={prod.nome} />
              <div>
                <strong>{prod.nome}</strong>
                <p>{prod.descricao}</p>
              </div>

              {prod.venda === 'Unidade' ? (
                <p>{`R$ ${prod.valor} a Unidade`}</p>
              ) : (
                <p>{`R$ ${prod.valorKilo} cada 100g`}</p>
              )}
              <button type="button" onClick={() => DeleteProd(prod)}>
                <FiTrash2 size={20} />
              </button>
            </span>
          </Prods>
        ))}
      </Body>
    </>
  );
};

export default DeletarProds;
