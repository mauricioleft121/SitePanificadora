import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Modal from '@material-ui/core/Modal';
import NumberFormat from 'react-number-format';
import Crypto from 'crypto-js';

import Header from '../Components/Header/Header';
import MobileHeader from '../Components/HeaderMobile/index';

import api from '../../services/index';

import {
  Body,
  CarouselDiv,
  Prods,
  ListProds,
  DivModal,
  Conter,
  Comprar,
  Kilo,
  DivButtonContinue,
} from './styles';

interface Produtos {
  imagem: string;
  nome: string;
  descricao: string;
  venda: string;
  valor: string;
  valorKilo: string;
  quantity: number;
}

interface Banners {
  imagem: string;
  nome: string;
}

const Dashboard: React.FC = () => {
  const [width, setWidth] = useState<number>(() => {
    return window.innerWidth;
  });
  const [Prodts, setProdts] = useState<Produtos[]>([]);
  const [Banner, setBanner] = useState<Banners[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState<Produtos>();
  const [quantity, setQuantity] = useState<number>(0);
  const [value, setValue] = useState<string>('');
  const [valueKilo, setValueKilo] = useState('');
  const [BuyedProdts, setBuyedProdts] = useState<Produtos[]>(() => {
    const storagedProds = sessionStorage.getItem(
      '@PanificadoraUbaense/Carrinho',
    );
    if (storagedProds) {
      const decript = Crypto.AES.decrypt(storagedProds, '2576');
      const decryptedData = JSON.parse(decript.toString(Crypto.enc.Utf8));
      return decryptedData;
    }

    return [];
  });

  useEffect(() => {
    const handleResize = (): void => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const encript = Crypto.AES.encrypt(
      JSON.stringify(BuyedProdts),
      '2576',
    ).toString();
    sessionStorage.setItem('@PanificadoraUbaense/Carrinho', encript);
  }, [BuyedProdts]);

  const valueFormated = (valor: string): string => {
    const result = +valor;
    const val = result.toFixed(2);
    const formated = val.replace('.', ',');

    return formated;
  };

  const handlePlus = (valor: string): void => {
    const soma = +value + +valor;
    setQuantity(quantity + 1);
    setValue(soma.toFixed(2));
  };

  const isEmp = (prod: string | undefined): boolean => {
    if (prod === '') {
      return true;
    }

    return false;
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

  const multiple = (vkilo: string, quanti: string): string => {
    const quant = quanti.replace(' gramas', '');
    const quantform = quant.replace(',', '');
    const resu = +vkilo * (+quantform / 100);
    const form = resu.toFixed(2);
    return valueFormated(form);
  };

  function handleBuy(prod: Produtos, quant: number): void {
    const produto = {
      imagem: prod.imagem,
      nome: prod.nome,
      descricao: prod.descricao,
      venda: prod.venda,
      valor: prod.valor,
      valorKilo: prod.valorKilo,
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

  function handleBuyKilo(prod: Produtos, quant: string): void {
    const quantid = quant.replace(' gramas', '');
    const quantform = quantid.replace(',', '');
    const produto = {
      imagem: prod.imagem,
      nome: prod.nome,
      descricao: prod.descricao,
      venda: prod.venda,
      valor: prod.valor,
      valorKilo: prod.valorKilo,
      quantity: +quantform,
    };

    const f = BuyedProdts.some((item) => produto.nome === item.nome);
    if (f === true) {
      const pos = BuyedProdts.findIndex((item) => produto.nome === item.nome);
      const val = +BuyedProdts[pos].quantity + +quantform;
      const array = BuyedProdts.slice();
      array[pos].quantity = val;
      setBuyedProdts(array);
      handleCloseModal();
      return;
    }

    setBuyedProdts([...BuyedProdts, produto]);
    setValueKilo('');
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
    <Body>
      {width! > 900 ? (
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
          {Prodts.sort((a, b) => a.nome.localeCompare(b.nome)).map((prod) => (
            <ListProds key={prod.nome}>
              <button type="button" onClick={() => handleOpenModal(prod)}>
                <img src={prod.imagem} alt={prod.nome} />
                <span>
                  <div>
                    <strong>{prod.nome}</strong>
                    <p>{prod.descricao}</p>
                  </div>
                  {prod.venda === 'Unidade' ? (
                    <p>{`R$ ${valueFormated(prod.valor)} Un`}</p>
                  ) : (
                    <p>{`R$ ${valueFormated(prod.valorKilo)} cada 100 g`}</p>
                  )}
                </span>
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
        <DivModal isEmpty={isEmp(product?.descricao)}>
          <img src={product?.imagem ?? ''} alt="aaa" />
          <div>
            <strong>{product?.nome}</strong>
            <p>{product?.descricao}</p>
            {product?.valor && (
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
            )}
            {product?.valorKilo && (
              <Kilo>
                <h1>{`Preço: R$${valueFormated(
                  product.valorKilo,
                )} cada 100g`}</h1>
                <div>
                  <NumberFormat
                    value={valueKilo}
                    onValueChange={(val) => {
                      const { formattedValue } = val;
                      setValueKilo(formattedValue);
                    }}
                    thousandSeparator={true}
                    isNumericString={true}
                    suffix=" gramas"
                    placeholder="Insira a quantia"
                  />
                  <form>
                    <button
                      type="button"
                      onClick={() => handleBuyKilo(product!, valueKilo)}
                    >
                      <strong>Adicionar</strong>
                      <strong>
                        <NumberFormat
                          value={multiple(product.valorKilo, valueKilo)}
                          displayType="text"
                          thousandSeparator={true}
                          prefix="R$ "
                          isNumericString={true}
                        />
                      </strong>
                    </button>
                  </form>
                </div>
              </Kilo>
            )}
          </div>
        </DivModal>
      </Modal>
      <DivButtonContinue>
        <Link to="carrinho">
          <button type="button">
            <strong>Ir para o Carrinho</strong>
          </button>
        </Link>
      </DivButtonContinue>
    </Body>
  );
};

export default Dashboard;
