import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Crypto from 'crypto-js';
import Header from '../Components/Header/Header';
import MobileHeader from '../Components/HeaderMobile/index';

import {
  Prods,
  Body,
  Quant,
  Total,
  Botao,
  Subtotal,
  NoProds,
  QuantKilo,
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

const Carrinho: React.FC = () => {
  const [width, setWidth] = useState<number>(() => {
    return window.innerWidth;
  });
  const [Prodts, setProdts] = useState<Produtos[]>(() => {
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
    const encript = Crypto.AES.encrypt(
      JSON.stringify(Prodts),
      '2576',
    ).toString();
    sessionStorage.setItem('@PanificadoraUbaense/Carrinho', encript);
  }, [Prodts]);

  useEffect(() => {
    const handleResize = (): void => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isEmpty = (): boolean => {
    if (Prodts.length === 0) {
      return false;
    }
    return true;
  };

  const Delete = (prod: Produtos): void => {
    const index = Prodts.indexOf(prod);
    const array = Prodts.slice();
    array.splice(index, 1);
    setProdts(array);
  };

  const ValorTotal = (): string => {
    let subTotal = 0;
    Prodts.forEach((element) => {
      if (element.valor != null) {
        subTotal += element.quantity * +element.valor;
      }
      if (element.valorKilo != null) {
        subTotal += (element.quantity / 100) * +element.valorKilo;
      }
    });
    const FormatedSubTotal = subTotal.toFixed(2).replace('.', ',');
    return FormatedSubTotal;
  };

  const valueFormated = (valor: string, quantidade: number): string => {
    const soma = (+valor * +quantidade).toFixed(2);
    const result = soma.toString();
    const formated = result.replace('.', ',');

    return formated;
  };

  const valueFormatedKilo = (valor: string, quantidade: number): string => {
    const soma = (+valor * (+quantidade / 100)).toFixed(2);
    const result = soma.toString();
    const formated = result.replace('.', ',');

    return formated;
  };

  const handlePlus = (index: number): void => {
    const val = +Prodts[index].quantity + 1;
    const array = Prodts.slice();
    array[index].quantity = val;
    setProdts(array);

    const encript = Crypto.AES.encrypt(
      JSON.stringify(Prodts),
      '2576',
    ).toString();
    sessionStorage.setItem('@PanificadoraUbaense/Carrinho', encript);
  };

  const handleMinus = (index: number): void => {
    const val = +Prodts[index].quantity - 1;
    if (val === 0) {
      return;
    }
    const array = Prodts.slice();
    array[index].quantity = val;
    setProdts(array);
    const encript = Crypto.AES.encrypt(
      JSON.stringify(Prodts),
      '2576',
    ).toString();
    sessionStorage.setItem('@PanificadoraUbaense/Carrinho', encript);
  };

  const handleChange = (index: number, newvalue: string): void => {
    const quant = newvalue.replace(' gramas', '');
    const quantform = quant.replace(',', '');
    const array = Prodts.slice();
    array[index].quantity = +quantform;
    setProdts(array);

    const encript = Crypto.AES.encrypt(
      JSON.stringify(Prodts),
      '2576',
    ).toString();
    sessionStorage.setItem('@PanificadoraUbaense/Carrinho', encript);
  };

  return (
    <>
      {width! > 768 ? <Header /> : <MobileHeader />}
      <Body>
        {isEmpty() ? (
          Prodts.map((prod, index) => (
            <Prods key={prod.nome}>
              <button type="button">
                <img src={prod.imagem} alt={prod.nome} />
                <div>
                  <strong>{prod.nome}</strong>
                  <p>{prod.descricao}</p>
                </div>

                {prod.valor && (
                  <Quant>
                    <div>
                      <button type="button" onClick={() => handleMinus(index)}>
                        <strong>-</strong>
                      </button>
                      <p>{prod.quantity}</p>
                      <button
                        type="button"
                        onClick={() => {
                          handlePlus(index);
                        }}
                      >
                        <strong>+</strong>
                      </button>
                    </div>
                    <p>Quantidade</p>
                  </Quant>
                )}
                {prod.valorKilo && (
                  <QuantKilo>
                    <div>
                      <NumberFormat
                        value={prod.quantity}
                        onValueChange={(val) => {
                          const { formattedValue } = val;
                          handleChange(index, formattedValue);
                        }}
                        thousandSeparator={true}
                        isNumericString={true}
                        suffix=" gramas"
                        placeholder="Insira a quantia"
                      />
                    </div>
                    <p>Quantidade</p>
                  </QuantKilo>
                )}
                <Total>
                  <p>Total</p>
                  <strong>
                    {prod.valor && (
                      <NumberFormat
                        value={valueFormated(prod.valor, prod.quantity)}
                        displayType="text"
                        thousandSeparator={true}
                        prefix="R$ "
                        isNumericString={true}
                      />
                    )}
                    {prod.valorKilo && (
                      <NumberFormat
                        value={valueFormatedKilo(prod.valorKilo, prod.quantity)}
                        displayType="text"
                        thousandSeparator={true}
                        prefix="R$ "
                        isNumericString={true}
                      />
                    )}
                  </strong>
                </Total>
                <IconButton onClick={() => Delete(prod)}>
                  <DeleteForeverIcon />
                </IconButton>
              </button>
            </Prods>
          ))
        ) : (
          <NoProds>
            <strong>Não há produtos no carrinho</strong>
          </NoProds>
        )}
        {isEmpty() && (
          <Subtotal>
            <div>
              <strong>Subtotal</strong>
              <strong>
                <NumberFormat
                  value={ValorTotal()}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="R$ "
                  isNumericString={true}
                />
              </strong>
            </div>
            <Link to="carrinho/pedido">
              <Botao type="button">
                <strong>Finalizar Pedido</strong>
              </Botao>
            </Link>
          </Subtotal>
        )}
      </Body>
    </>
  );
};

export default Carrinho;
