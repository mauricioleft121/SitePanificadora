import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Header from '../Components/Header/Header';
import MobileHeader from '../Components/HeaderMobile/index';

import { Prods, Body, Quant, Total, Botao, Subtotal, NoProds } from './styles';

interface Produtos {
  imagem: string;
  nome: string;
  descricao: string;
  valor: string;
  quantity: number;
}

const Carrinho: React.FC = () => {
  const [width] = useState<number>(() => {
    return window.innerWidth;
  });
  const [Prodts, setProdts] = useState<Produtos[]>(() => {
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
      JSON.stringify(Prodts),
    );
  }, [Prodts]);

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
      subTotal += +element.quantity * +element.valor;
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

  const handlePlus = (index: number): void => {
    const val = +Prodts[index].quantity + 1;
    const array = Prodts.slice();
    array[index].quantity = val;
    setProdts(array);

    sessionStorage.setItem(
      '@PanificadoraUbaense/Carrinho',
      JSON.stringify(Prodts),
    );
  };

  const handleMinus = (index: number): void => {
    const val = +Prodts[index].quantity - 1;
    if (val === 0) {
      return;
    }
    const array = Prodts.slice();
    array[index].quantity = val;
    setProdts(array);
    sessionStorage.setItem(
      '@PanificadoraUbaense/Carrinho',
      JSON.stringify(Prodts),
    );
  };

  return (
    <>
      {width! > 576 ? <Header /> : <MobileHeader />}
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
                <Total>
                  <p>Total</p>
                  <strong>
                    <NumberFormat
                      value={valueFormated(prod.valor, prod.quantity)}
                      displayType="text"
                      thousandSeparator={true}
                      prefix="R$ "
                      isNumericString={true}
                    />
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
