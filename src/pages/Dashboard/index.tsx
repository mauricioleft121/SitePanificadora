import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Modal from '@material-ui/core/Modal';
import NumberFormat from 'react-number-format';

import Header from '../Components/Header/Header';
import MobileHeader from '../Components/HeaderMobile/index';

import api from '../../services/index';
import img from '../../assets/Images/Img1.jpg';

import {
  CarouselDiv,
  Prods,
  ListProds,
  DivModal,
  Conter,
  Comprar,
} from './styles';

interface Produtos {
  imagem: string;
  nome: string;
  descricao: string;
  valor: string;
  quantity: number;
}

interface Banners {
  imagem: string;
  nome: string;
}

const Dashboard: React.FC = () => {
  const [width, setWidth] = useState<number>();
  const [Prodts, setProdts] = useState<Produtos[]>([]);
  const [Banner, setBanner] = useState<Banners[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState<Produtos>();
  const [quantity, setQuantity] = useState<number>(0);
  const [value, setValue] = useState<string>('');
  const [BuyedProdts, setBuyedProdts] = useState<Produtos[]>(() => {
    const storagedProds = sessionStorage.getItem(
      '@PanificadoraUbaense/Carrinho',
    );
    if (storagedProds) {
      return JSON.parse(storagedProds);
    }

    return [];
  });

  useEffect(() => {
    sessionStorage.setItem(
      '@PanificadoraUbaense/Carrinho',
      JSON.stringify(BuyedProdts),
    );
    setWidth(window.innerWidth);
  }, [BuyedProdts, width]);

  const valueFormated = (valor: string): string => {
    const result = valor.toString();
    const formated = result.replace('.', ',');

    return formated;
  };

  const handlePlus = (valor: string): void => {
    const soma = +value + +valor;
    setQuantity(quantity + 1);
    setValue(soma.toFixed(2));
  };

  const handleMinus = (valor: string): void => {
    if (quantity === 1) {
      return;
    }
    const soma = +value - +valor;
    setQuantity(quantity - 1);
    setValue(soma.toFixed(2));
  };

  const handleOpenModal = (prod: Produtos): void => {
    setProduct(prod);
    setModalOpen(!modalOpen);
    setQuantity(1);
    setValue(prod.valor);
  };

  const handleCloseModal = (): void => {
    setModalOpen(!modalOpen);
    setQuantity(1);
  };

  function handleBuy(prod: Produtos, quant: number): void {
    const produto = {
      imagem: prod.imagem,
      nome: prod.nome,
      descricao: prod.descricao,
      valor: prod.valor,
      quantity: quant,
    };
    const f = BuyedProdts.some((item) => produto.nome === item.nome);
    if (f === true) {
      const pos = BuyedProdts.findIndex((item) => produto.nome === item.nome);
      const val = +BuyedProdts[pos].quantity + +quant;
      const array = BuyedProdts.slice();
      array[pos].quantity = val;
      setBuyedProdts(array);
      handleCloseModal();
      return;
    }
    setBuyedProdts([...BuyedProdts, produto]);
    handleCloseModal();
  }

  useEffect(() => {
    api.get('/diary').then((response) => {
      setProdts(response.data);
    });
    api.get('/banner').then((response) => {
      setBanner(response.data);
    });
  }, []);

  return (
    <>
      {width! > 576 ? (
        <>
          <Header />
          <CarouselDiv>
            <Carousel fade>
              {Banner.map((banner) => (
                <Carousel.Item interval={3000} key={banner.nome}>
                  <img src={banner.imagem} alt="First slide" />
                </Carousel.Item>
              ))}
            </Carousel>
          </CarouselDiv>
        </>
      ) : (
        <MobileHeader />
      )}
      <Prods>
        <ul>
          {Prodts.map((prod) => (
            <ListProds key={prod.nome}>
              <button type="button" onClick={() => handleOpenModal(prod)}>
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
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DivModal>
          <img src={product?.imagem ?? ''} alt="aaa" />
          <div>
            <strong>{product?.nome}</strong>
            <p>{product?.descricao}</p>
            <Conter>
              <div>
                <button
                  type="button"
                  onClick={() => handleMinus(product?.valor ?? '')}
                >
                  <strong>-</strong>
                </button>
                <p>{quantity}</p>
                <button
                  type="button"
                  onClick={() => handlePlus(product?.valor ?? '')}
                >
                  <strong>+</strong>
                </button>
              </div>
              <Comprar>
                <button
                  type="button"
                  onClick={() => handleBuy(product!, quantity)}
                >
                  <strong>Adicionar</strong>
                  <strong>
                    <NumberFormat
                      value={valueFormated(value)}
                      displayType="text"
                      thousandSeparator={true}
                      prefix="R$ "
                      isNumericString={true}
                    />
                  </strong>
                </button>
              </Comprar>
            </Conter>
          </div>
        </DivModal>
      </Modal>
    </>
  );
};

export default Dashboard;
