import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import DatePicker, { registerLocale } from 'react-datepicker';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Crypto from 'crypto-js';
import pt from 'date-fns/locale/pt-BR';

import 'react-datepicker/dist/react-datepicker.css';

import PixImage from '../../assets/logo_pix.png';

import {
  Body,
  DivTitle,
  Title,
  DivButtons,
  Buttons,
  DivMensagem,
  GoBack,
  ButtonTroco,
  ButtonTroco2,
  TextCobranca,
  DivData,
  DivEntrega,
  ButtonTrue,
  ButtonFalse,
  TextCobranca2,
} from './styles';

registerLocale('pt', pt);

interface Produtos {
  imagem: string;
  nome: string;
  descricao: string;
  venda: string;
  valor: string;
  valorKilo: string;
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
  const [Troco, setTroco] = useState<boolean>();
  const [TrocoButton, setTrocoButton] = useState<number>(0);
  const [TrocoValue, setTrocoValue] = useState<string>('');
  const [Active, setActive] = useState<number>();
  const [B1, setB1] = useState<boolean>(false);
  const [B2, setB2] = useState<boolean>(false);
  const [B3, setB3] = useState<boolean>(false);
  const [B4, setB4] = useState<boolean>(false);
  const [Retirada, setRetirada] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(new Date());
  const [Prodts] = useState<Produtos[]>(() => {
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
      let soma = 0;
      if (Prodts[index].valor) {
        soma = Prodts[index].quantity * +Prodts[index].valor;
      }
      if (Prodts[index].valorKilo) {
        soma = (Prodts[index].quantity / 100) * +Prodts[index].valorKilo;
      }

      value += soma;
    }
    const formated = value.toFixed(2);
    const valor = +formated;
    return valor.toLocaleString('pt-br', {
      minimumFractionDigits: 2,
    });
  });

  const isDisabled = (): boolean => {
    const val = SubTotal.replace(',', '.');
    if (+val >= 20) {
      return false;
    }
    return true;
  };

  const valueFormated = (valor: string): string => {
    const result = +valor;
    const val = result.toFixed(2);
    const formated = val.replace('.', ',');

    return formated;
  };
  const Soma = (a: string, b: number): string => {
    const result = +a * b;
    const formated = result.toLocaleString('pt-br', {
      minimumFractionDigits: 2,
    });

    return formated;
  };

  const SomaKilo = (a: string, b: number): string => {
    const result = +a * (b / 100);
    const form = result.toFixed(2);
    const number = +form;
    const formated = number.toLocaleString('pt-br', {
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
        let valor = '';
        let prodsmessage = '';
        if (Prodts[index].valor) {
          valor = Soma(Prodts[index].valor, Prodts[index].quantity);
          prodsmessage = `*${Prodts[index].quantity}x* ${
            Prodts[index].nome
          } - (R$ ${valueFormated(
            Prodts[index].valor,
          )})\n\nSubtotal do Item: R$ ${valor}\n -  -  -  -  -  -  -  -  -  -  -\n`;
        }
        if (Prodts[index].valorKilo) {
          valor = SomaKilo(Prodts[index].valorKilo, Prodts[index].quantity);
          prodsmessage = `*${Prodts[index].quantity} gramas* de ${
            Prodts[index].nome
          } - (R$ ${valueFormated(
            Prodts[index].valorKilo,
          )})\n\nSubtotal do Item: R$ ${valor}\n -  -  -  -  -  -  -  -  -  -  -\n`;
        }

        produtos += prodsmessage;
      }

      if (Retirada === true) {
        produtos += `
▶ *DADOS PARA ENTREGA*\n
*Nome*: ${Cli.Nome}
*Endereço*: ${Cli.Rua}, *nº*: ${Cli.Numero}
*Bairro*: ${Cli.Bairro}${
          Cli.Complemento ? `\n*Complemento*: ${Cli.Complemento}` : ''
        }${Cli.Referencia ? `\n*Ponto de Referência*: ${Cli.Referencia}` : ''}
*WhatsApp*: ${Cli.Telefone}

*Taxa de Entrega*: R$ 6,00
    `;
      }
      if (Retirada === false) {
        produtos += `
▶ *DADOS PARA ENTREGA*\n
*Nome*: ${Cli.Nome}
*WhatsApp*: ${Cli.Telefone}
*Retirada no Local*
        `;
      }

      produtos += `
  ------------------------------------------
  `;
      if (Retirada === true) {
        const formated = SubTotal.replace(',', '.');
        const Ttl = parseFloat(formated) + 6;
        const TtlString = Ttl.toFixed(2).replace('.', ',');
        produtos += `
▶ *TOTAL* = *R$ ${TtlString}*
`;
      }
      if (Retirada === false) {
        produtos += `
▶ *TOTAL* = *R$ ${SubTotal}*
`;
      }
      produtos += `
  ------------------------------------------
  \n▶ *AGENDAMENTO*
  \n Pedido para o Dia `;
      if (startDate.getDate() < 10) {
        produtos += `0${startDate.getDate()}/`;
      }
      if (startDate.getDate() >= 10) {
        produtos += `${startDate.getDate()}/`;
      }
      if (startDate.getMonth() + 1 < 10) {
        produtos += `0${startDate.getMonth() + 1}`;
      }
      if (startDate.getMonth() + 1 >= 10) {
        produtos += `${startDate.getMonth() + 1}`;
      }
      produtos += `/${startDate.getFullYear()} as *${startDate.getHours()}:`;
      if (startDate.getMinutes() === 0) {
        produtos += `00*`;
      } else {
        produtos += `${startDate.getMinutes()}*`;
      }
      produtos += `
  \n▶ *PAGAMENTO*
  \n*${Pag}*`;
      if (Pag === 'Dinheiro') {
        if (Troco === false) {
          produtos += `\n*Não Precisa de Troco*`;
        } else if (Troco === true) {
          if (Retirada === true) {
            produtos += `\n*Precisa de Troco*\n*Valor*: R$`;
            const formated = SubTotal.replace(',', '.');
            const valu = +TrocoValue - (+formated + 6);
            const formatedValue = valu.toLocaleString('pt-br', {
              minimumFractionDigits: 2,
            });
            produtos += formatedValue;
          } else if (Retirada === false) {
            produtos += `\n*Precisa de Troco*\n*Valor*: R$`;
            const formated = SubTotal.replace(',', '.');
            const valu = +TrocoValue - +formated;
            const formatedValue = valu.toLocaleString('pt-br', {
              minimumFractionDigits: 2,
            });
            produtos += formatedValue;
          }
        }
      }

      return encodeURI(produtos);
    };
    setText(encode());
  }, [Pag, Cli, Prodts, SubTotal, Troco, startDate, TrocoValue, Retirada]);

  useEffect(() => {
    const isActive = (): void => {
      if (Active === 1) {
        setB1(true);
        setB2(false);
        setB3(false);
        setB4(false);
        setTrocoButton(0);
      }
      if (Active === 2) {
        setB1(false);
        setB2(true);
        setB3(false);
        setB4(false);
        setTroco(undefined);
        setTrocoButton(0);
      }
      if (Active === 3) {
        setB1(false);
        setB2(false);
        setB3(true);
        setB4(false);
        setTroco(undefined);
        setTrocoButton(0);
      }
      if (Active === 4) {
        setB1(false);
        setB2(false);
        setB3(false);
        setB4(true);
        setTroco(undefined);
        setTrocoButton(0);
      }
    };
    isActive();
  }, [Active]);

  const CheckSelected = (): boolean => {
    const v = SubTotal.replace(',', '.');
    if (Pag !== '') {
      if (Pag !== 'Dinheiro') {
        return true;
      }
      if (Pag === 'Dinheiro') {
        if (Troco !== undefined) {
          if (Troco === true) {
            if (TrocoValue !== '') {
              if (TrocoValue < SubTotal) {
                return false;
              }
              if (Retirada === true) {
                if (+TrocoValue < +v + 6) {
                  return false;
                }
                return true;
              }
              return true;
            }
            return false;
          }
          return true;
        }
        return false;
      }
    }
    return false;
  };

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
        <DivButtons Selected={B1}>
          <Buttons
            hasClicked={false}
            ButtonName={B1}
            type="button"
            onClick={() => {
              setPag('Dinheiro');
              setActive(1);
            }}
          >
            Dinheiro
          </Buttons>
          {B1 && (
            <div>
              <h1>Precisa de Troco?</h1>
              <span>
                <ButtonTroco
                  TrocoIs={TrocoButton}
                  type="button"
                  onClick={() => {
                    setTroco(true);
                    setTrocoButton(1);
                  }}
                >
                  Sim
                </ButtonTroco>
                <ButtonTroco2
                  TrocoIs={TrocoButton}
                  type="button"
                  onClick={() => {
                    setTroco(false);
                    setTrocoButton(2);
                  }}
                >
                  Não
                </ButtonTroco2>
              </span>
              {Troco && (
                <NumberFormat
                  value={TrocoValue}
                  onValueChange={(val) => {
                    const { value } = val;
                    setTrocoValue(value);
                  }}
                  isNumericString={true}
                  thousandSeparator="."
                  decimalSeparator=","
                  fixedDecimalScale={true}
                  decimalScale={2}
                  prefix="R$ "
                  placeholder="Troco para quanto?"
                />
              )}
            </div>
          )}
          <Buttons
            hasClicked={B2}
            ButtonName={false}
            type="button"
            onClick={() => {
              setPag('Pix');
              setActive(2);
            }}
          >
            <div>
              <img src={PixImage} alt="Pix" />
              <h1>Pix</h1>
            </div>
          </Buttons>
          <Buttons
            hasClicked={B3}
            ButtonName={false}
            type="button"
            onClick={() => {
              setPag('Cartão de Credito');
              setActive(3);
            }}
          >
            Cartão de Credito
          </Buttons>
          <Buttons
            hasClicked={B4}
            ButtonName={false}
            type="button"
            onClick={() => {
              setPag('Cartão de Débito');
              setActive(4);
            }}
          >
            Cartão de Débito
          </Buttons>
        </DivButtons>
        <DivData>
          <p>Agende seu pedido ao lado</p>
          <span>
            <DatePicker
              locale="pt"
              selected={startDate}
              onChange={(date: Date) => {
                setStartDate(date);
              }}
              showTimeSelect
              timeCaption="Hora"
              dateFormat="Pp"
            />
          </span>
        </DivData>
        <DivEntrega>
          <p>Modo de Entrega</p>
          <ButtonTrue
            Selected={Retirada}
            type="button"
            onClick={() => {
              isDisabled();
              setRetirada(true);
            }}
            disabled={isDisabled()}
          >
            Entrega
          </ButtonTrue>
          <ButtonFalse
            Selected={Retirada}
            type="button"
            onClick={() => {
              isDisabled();
              setRetirada(false);
            }}
          >
            Retirada
          </ButtonFalse>
        </DivEntrega>
        <DivMensagem>
          <div>
            <strong>Subtotal</strong>
            <strong>R$ {SubTotal}</strong>
          </div>
          {CheckSelected() ? (
            <a
              href={`https://api.whatsapp.com/send?phone=5503235412781&text=${text}`}
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
        <TextCobranca2>Pedido minimo para entrega: R$ 20,00</TextCobranca2>
        <TextCobranca>Haverá uma cobrança de R$ 6,00 para Entrega</TextCobranca>
      </Body>
    </>
  );
};

export default Pagamento;
