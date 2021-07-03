import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {
  Body,
  DivTitle,
  Title,
  DivButtons,
  DivMensagem,
  GoBack,
} from './styles';

interface Produtos {
  imagem: string;
  nome: string;
  descricao: string;
  valor: string;
  quantity: number;
}

interface Info {
  Rua: string;
  Numero: string;
  Bairro: string;
  Complemento: string;
  Referencia: string;
  Nome: string;
  Telefone: string;
}

const Pagamento: React.FC = () => {
  const [Prodts] = useState<Produtos[]>(() => {
    const storagedProds = sessionStorage.getItem(
      '@PanificadoraUbaense/Carrinho',
    );
    if (storagedProds) {
      return JSON.parse(storagedProds);
    }

    return [];
  });
  const [Cli] = useState<Info>(() => {
    const storagedProds = sessionStorage.getItem(
      '@PanificadoraUbaense/Cliente',
    );
    if (storagedProds) {
      return JSON.parse(storagedProds);
    }

    return [];
  });
  const [SubTotal] = useState<string>(() => {
    let value = 0;
    for (let index = 0; index < Prodts.length; index++) {
      const soma = Prodts[index].quantity * +Prodts[index].valor;

      value += soma;
    }

    return value.toLocaleString('pt-br', {
      minimumFractionDigits: 2,
    });
  });

  const valueFormated = (valor: string): string => {
    const result = valor.toString();
    const formated = result.replace('.', ',');

    return formated;
  };
  const Soma = (a: string, b: number): string => {
    const result = +a * b;
    const formated = result.toLocaleString('pt-br', {
      minimumFractionDigits: 2,
    });

    return formated;
  };
  const [Pag, setPag] = useState<string>('');
  const [text, setText] = useState<string>();

  useEffect(() => {
    const encode = (): string => {
      let produtos =
        '✅ *NOVO PEDIDO*\n ------------------------------------------\n▶ *RESUMO DO PEDIDO*\n\n';
      for (let index = 0; index < Prodts.length; index++) {
        const valor = Soma(Prodts[index].valor, Prodts[index].quantity);
        const prodsmessage = `${Prodts[index].quantity}x ${
          Prodts[index].nome
        } - (R$ ${valueFormated(
          Prodts[index].valor,
        )})\n\nSubtotal do Item: R$ ${valor}\n -  -  -  -  -  -  -  -  -  -  -\n`;

        produtos += prodsmessage;
      }

      produtos += `
▶ *DADOS PARA ENTREGA*\n
*Nome*: ${Cli.Nome}
*Endereço*: ${Cli.Rua}, nº: ${Cli.Numero}
*Bairro*: ${Cli.Bairro}${
        Cli.Complemento ? `\n*Complemento*: ${Cli.Complemento}` : ''
      }${Cli.Referencia ? `\n*Ponto de Referência*: ${Cli.Referencia}` : ''}
*WhatsApp*: ${Cli.Telefone}
  ------------------------------------------
▶ *TOTAL* = *R$ ${SubTotal}*
  ------------------------------------------
  \n▶ *PAGAMENTO*
  \n ${Pag}`;

      return encodeURI(produtos);
    };
    setText(encode());
  }, [Pag, Cli, Prodts, SubTotal]);

  return (
    <>
      <GoBack>
        <Link to="/carrinho/pedido">
          <ArrowBackIcon />
        </Link>
      </GoBack>
      <Body>
        <DivTitle>
          <Title>Escolha a forma de pagamento</Title>
        </DivTitle>
        <DivButtons>
          <button type="button" onClick={() => setPag('Dinheiro')}>
            Dinheiro
          </button>
          <button type="button" onClick={() => setPag('Cartão de Credito')}>
            Cartão de Credito
          </button>
          <button type="button" onClick={() => setPag('Cartão de Débito')}>
            Cartão de Débito
          </button>
        </DivButtons>
        <DivMensagem>
          <div>
            <strong>Subtotal</strong>
            <strong>R$ {SubTotal}</strong>
          </div>
          {Pag ? (
            <a
              href={`https://api.whatsapp.com/send?phone=55032984024112&text=${text}`}
              target="_blank"
              rel="noreferrer"
            >
              <button type="button">
                <WhatsAppIcon />
                Enviar Pedido
              </button>
            </a>
          ) : (
            <a href="/" onClick={(e) => e.preventDefault()}>
              <button type="button" disabled>
                <WhatsAppIcon />
                Enviar Pedido
              </button>
            </a>
          )}
        </DivMensagem>
      </Body>
    </>
  );
};

export default Pagamento;
