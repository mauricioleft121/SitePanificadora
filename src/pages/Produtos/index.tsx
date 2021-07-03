import React, { useState, useEffect } from 'react';

import api from '../../services/index';
import Header from '../Components/Header/Header';
import MobileHeader from '../Components/HeaderMobile/index';
import { Prods, ListProds } from './styles';

interface Produtos {
  imagem: string;
  nome: string;
  descricao: string;
}

const Produtos: React.FC = () => {
  const [width, setWidth] = useState<number>();
  const [Prodts, setProdts] = useState<Produtos[]>([]);

  useEffect(() => {
    api.get('/products').then((response) => {
      setProdts(response.data);
    });
    setWidth(window.innerWidth);
  }, []);
  return (
    <>
      {width! > 576 ? <Header /> : <MobileHeader />}

      <Prods>
        <ul>
          {Prodts.map((prod) => (
            <ListProds key={prod.nome}>
              <a href="teste">
                <img src={prod.imagem} alt={prod.nome} />
                <div>
                  <strong>{prod.nome}</strong>
                  <p>{prod.descricao}</p>
                </div>
              </a>
            </ListProds>
          ))}
        </ul>
      </Prods>
    </>
  );
};

export default Produtos;
