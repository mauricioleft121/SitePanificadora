import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Info } from '@material-ui/icons';
import {
  Page,
  Body,
  Titulo,
  Formulario,
  Button,
  Enable,
  Disable,
  GoBack,
} from './styles';

interface Info {
  Rua: string;
  Numero: string;
  Bairro: string;
  Complemento: string;
  Referencia: string;
  Nome: string;
  Telefone: string;
}

const Pedido: React.FC = () => {
  const [Cli] = useState(() => {
    const storagedProds = sessionStorage.getItem(
      '@PanificadoraUbaense/Cliente',
    );
    if (storagedProds) {
      return JSON.parse(storagedProds);
    }

    return [];
  });
  const [Rua, setRua] = useState(() => {
    if (Cli.length !== 0) {
      return Cli.Rua;
    }

    return '';
  });
  const [Numero, setNumero] = useState(() => {
    if (Cli.length !== 0) {
      return Cli.Numero;
    }

    return '';
  });
  const [Bairro, setBairro] = useState(() => {
    if (Cli.length !== 0) {
      return Cli.Bairro;
    }

    return '';
  });
  const [Complemento, setComplemento] = useState(() => {
    if (Cli.length !== 0) {
      return Cli.Complemento;
    }

    return '';
  });
  const [Referencia, setReferencia] = useState(() => {
    if (Cli.length !== 0) {
      return Cli.Referencia;
    }

    return '';
  });
  const [Nome, setNome] = useState(() => {
    if (Cli.length !== 0) {
      return Cli.Nome;
    }

    return '';
  });
  const [Telefone, setTelefone] = useState(() => {
    if (Cli.length !== 0) {
      return Cli.Telefone;
    }

    return '';
  });

  const Check = (): boolean => {
    if (
      Rua === '' ||
      Numero === '' ||
      Bairro === '' ||
      Nome === '' ||
      Telefone === ''
    ) {
      return false;
    }
    return true;
  };

  const handleContinue = (
    rua: string,
    numero: string,
    bairro: string,
    complemento: string,
    referencia: string,
    nome: string,
    telefone: string,
  ): void => {
    const Cliente: Info = {
      Rua: rua,
      Numero: numero,
      Bairro: bairro,
      Complemento: complemento,
      Referencia: referencia,
      Nome: nome,
      Telefone: telefone,
    };
    sessionStorage.setItem(
      '@PanificadoraUbaense/Cliente',
      JSON.stringify(Cliente),
    );
  };

  return (
    <>
      <Page>
        <GoBack>
          <Link to="/carrinho">
            <ArrowBackIcon />
          </Link>
        </GoBack>
        <Body>
          <Titulo>Dados para Entrega</Titulo>
          <Formulario>
            <span>
              <input
                placeholder="Digite o nome da sua RUA"
                value={Rua}
                onChange={(e) => setRua(e.target.value)}
              />
              <NumberFormat
                placeholder="Número"
                value={Numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </span>
            <input
              placeholder="Digite o nome do seu Bairro"
              value={Bairro}
              onChange={(e) => setBairro(e.target.value)}
            />
            <input
              placeholder="Complemento"
              value={Complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />
            <input
              placeholder="Ponto de referência"
              value={Referencia}
              onChange={(e) => setReferencia(e.target.value)}
            />
            <input
              placeholder="Seu Nome"
              value={Nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <NumberFormat
              placeholder="Seu WhatsApp com DDD"
              format="(##) #####-####"
              value={Telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </Formulario>
        </Body>
        <Button>
          {Check() ? (
            <Enable>
              <div>
                <p>Tudo Certo!</p>
              </div>
              <div>
                <Link to="/carrinho/pedido/pag">
                  <button
                    type="button"
                    onClick={() => {
                      handleContinue(
                        Rua,
                        Numero,
                        Bairro,
                        Complemento,
                        Referencia,
                        Nome,
                        Telefone,
                      );
                    }}
                  >
                    Continuar
                  </button>
                </Link>
              </div>
            </Enable>
          ) : (
            <Disable>
              <div>
                <p>Preencha as informações para continuar</p>
              </div>
              <div>
                <button type="button">Continuar</button>
              </div>
            </Disable>
          )}
        </Button>
      </Page>
    </>
  );
};

export default Pedido;
