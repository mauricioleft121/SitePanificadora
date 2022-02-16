import React, { useState, useEffect } from 'react';
import Header from '../Components/Header/Header';
import MobileHeader from '../Components/HeaderMobile/index';

import { Page } from './styles';

const Contato: React.FC = () => {
  const [width, setWidth] = useState<number>(() => {
    return window.innerWidth;
  });

  useEffect(() => {
    const handleResize = (): void => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      {width! > 768 ? <Header /> : <MobileHeader />}
      <Page>
        <h1>Endereço</h1>
        <h2>Av Governador Valadares - Nº 937 - Centro</h2>
        <h1>Telefone de Contato</h1>
        <h2>(32) 3541-2781</h2>
      </Page>
    </>
  );
};

export default Contato;
