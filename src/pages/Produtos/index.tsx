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
  const [width, setWidth] = useState<number>(() => {
    return window.innerWidth;
  });
  const [Prodts, setProdts] = useState<Produtos[]>([]);

  useEffect(() => {
    api.get('/products').then((response) => {
      setProdts(response.data);
    });
    const handleResize = (): void => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      {width! > 768 ? <Header /> : <MobileHeader />}

      <Prods>
        <ul>
          {Prodts.map((prod) => (
            <ListProds key={prod.nome}>
              <button type="button">
                <img src={prod.imagem} alt={prod.nome} />
                <div>
                  <strong>{prod.nome}</strong>
                  <p>{prod.descricao}</p>
                </div>
              </button>
            </ListProds>
          ))}
        </ul>
      </Prods>
    </>
  );
};

export default Produtos;
