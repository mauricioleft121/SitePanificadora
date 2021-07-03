import React, { useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import api from '../../services/index';

import {
  Body,
  Titulo,
  Prods,
  TituloProds,
  SelectedProds,
  ListSelectedProds,
  Botoes,
  Botao,
} from './styles';

interface Produtos {
  imagem: string;
  nome: string;
  descricao: string;
}

const Admin: React.FC = () => {
  const [Prodts, setProdts] = useState<Produtos[]>([]);
  const [selectedProds, setSelectedProds] = useState<Produtos[]>([]);
  const [Sucess, setSucess] = useState(false);
  const [Clean, setClean] = useState(false);

  function Alert(props: AlertProps): JSX.Element {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleAlertClean = (): void => {
    setClean(!Clean);
  };
  const handleAlertConcluir = (): void => {
    setSucess(!Sucess);
  };

  function handleAddDiaryProduct(prod: string, full: Produtos): boolean {
    const f = selectedProds.some((item) => prod === item.nome);
    if (f === true) {
      return false;
    }
    setSelectedProds([...selectedProds, full]);
    return true;
  }

  useEffect(() => {
    api.get('/products').then((response) => {
      setProdts(response.data);
    });
  }, []);
  useEffect(() => {
    api.get('/diary').then((response) => {
      setSelectedProds(response.data);
    });
  }, []);

  return (
    <>
      <Body>
        <Titulo>Bem-Vindo ao Painel Administrativo</Titulo>
        <TituloProds>Selecione os Produtos do dia</TituloProds>

        {Prodts.map((prod) => (
          <Prods key={prod.nome}>
            <button
              type="button"
              onClick={() => handleAddDiaryProduct(prod.nome, prod)}
            >
              <img src={prod.imagem} alt={prod.nome} />
              <div>
                <strong>{prod.nome}</strong>
                <p>{prod.descricao}</p>
              </div>

              <FiChevronRight size={20} key={prod.nome} />
            </button>
          </Prods>
        ))}

        {/* FOGUETE NÃO TEM RÉ MAS TEM DEFEITO */}
        <SelectedProds>
          <ul>
            {selectedProds.map((prod) => (
              <ListSelectedProds key={prod.nome}>
                <span>
                  <img src={prod.imagem} alt={prod.nome} />
                  <div>
                    <strong>{prod.nome}</strong>
                    <p>{prod.descricao}</p>
                  </div>
                </span>
              </ListSelectedProds>
            ))}
          </ul>
        </SelectedProds>
        <Botoes>
          <Botao
            Color="#eb3c3f"
            type="button"
            onClick={() => {
              api.delete('/diary').then(() => {
                setSelectedProds([]);
                handleAlertClean();
              });
            }}
          >
            <strong>Limpar Lista</strong>
          </Botao>
          <Botao
            Color="#5AD156"
            type="button"
            onClick={() => {
              api
                .post('/diary', {
                  itens: selectedProds,
                })
                .then(() => {
                  handleAlertConcluir();
                });
            }}
          >
            <strong>Concluir</strong>
          </Botao>
        </Botoes>
        <Snackbar
          open={Clean}
          autoHideDuration={4000}
          onClose={handleAlertClean}
        >
          <Alert onClose={handleAlertClean} severity="success">
            Lista Limpa Com Sucesso!
          </Alert>
        </Snackbar>

        <Snackbar
          open={Sucess}
          autoHideDuration={4000}
          onClose={handleAlertConcluir}
        >
          <Alert onClose={handleAlertConcluir} severity="success">
            Produtos Adicionados Com Sucesso!
          </Alert>
        </Snackbar>
      </Body>
    </>
  );
};

export default Admin;
