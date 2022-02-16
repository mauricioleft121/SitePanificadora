import React, { useState, useEffect } from 'react';
import Header from '../Components/Header/Header';
import MobileHeader from '../Components/HeaderMobile/index';
import api from '../../services/index';

import { DivImagens, GridDivImagens, Page } from './styles';

interface Imagem {
  url: string;
  nome: string;
}

const Galeria: React.FC = () => {
  const [width, setWidth] = useState<number>(() => {
    return window.innerWidth;
  });
  const [imagens, setImagens] = useState<Imagem[]>([]);

  useEffect(() => {
    api.get('/gallery').then((response) => {
      setImagens(response.data);
    });
  }, []);

  useEffect(() => {
    const handleResize = (): void => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const HandleMobile = (): boolean => {
    if (width > 768) {
      return false;
    }
    return true;
  };
  return (
    <>
      {width! > 768 ? <Header /> : <MobileHeader />}
      <Page isMobile={HandleMobile()}>
        <GridDivImagens>
          {imagens.map((img) => (
            <DivImagens key={img.nome} isMobile={HandleMobile()}>
              <img key={img.nome} src={img.url} alt={img.nome} />
            </DivImagens>
          ))}
        </GridDivImagens>
      </Page>
    </>
  );
};

export default Galeria;
