import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import CloseIcon from '@material-ui/icons/Close';

import storage from '../../../services/firebase';
import getCroppedImg from './getImage';
import api from '../../../services/index';

import {
  Body,
  Titulo,
  Prods,
  GoBack,
  ButtonTrue,
  ButtonFalse,
  ButtonMenu,
  DivModal,
  ImagemDiv,
  Picker,
  DivInputs,
  ButtonSubmit,
  DivModalAll,
  ButtonArchive,
  Buttonmodal,
  ImageDiv,
  ModalDiv,
  CloseButton,
} from './styles';

interface Produtos {
  id: string;
  imagem: string;
  nome: string;
  descricao: string;
  venda: string;
  valor: number;
  valorKilo: number;
  included: boolean;
}

const DiaryProds: React.FC = () => {
  const [Prodts, setProdts] = useState<Produtos[]>([]);
  const [selectedProds, setSelectedProds] = useState<Produtos[]>([]);
  const [Array, setArray] = useState<Produtos[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCropOpen, setModalCropOpen] = useState(false);
  const [MenuOpen, setMenuOpen] = useState<null | HTMLElement>(null);
  const [Id, setId] = useState<string>();
  const [Imagem, setImagem] = useState<string>();
  const [Nome, setNome] = useState<string>();
  const [Descricao, setDescricao] = useState<string>();
  const [Venda, setVenda] = useState<string>();
  const [VUnidade, setVUnidade] = useState<string | null>('');
  const [VKilo, setVKilo] = useState<string | null>('');
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const [cropped, setCroppedImage] = useState<Blob>();
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState<string | null>();
  const [BackProd, setBackProd] = useState<Produtos>();
  const [Complete, setComplete] = useState<boolean>(true);

  const open = Boolean(MenuOpen);

  const handleOpenModal = (): void => {
    setModalOpen(!modalOpen);
  };

  const handleCloseModal = (): void => {
    setModalOpen(!modalOpen);
  };

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaP: Area) => {
      setCroppedAreaPixels(croppedAreaP);
    },
    [],
  );

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels!);
      setCroppedImage(croppedImage);
      const BlobToURL = URL.createObjectURL(croppedImage);
      setImagem(BlobToURL);
      setComplete(true);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, [croppedAreaPixels, image]);

  function readFile(file: Blob): Promise<string | null | ArrayBuffer> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const onFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);

      setImage(imageDataUrl?.toString());
      setModalCropOpen(true);
    }
  };

  const blobToFile = (theBlob: Blob, fileName: string): File => {
    return new File([theBlob], fileName, {
      lastModified: new Date().getTime(),
      type: theBlob.type,
    });
  };

  const valueFormated1 = (valor: string): string => {
    if (valor) {
      const result = valor;
      const formated = result.replace('.', ',');
      return formated;
    }
    return '0';
  };

  const valueFormated2 = (valor: string | null): string | null => {
    if (valor) {
      const result = valor;
      const formated = result.replace(',', '.');
      return formated;
    }
    return null;
  };

  const valueFormated3 = (valor: number): string => {
    if (valor) {
      const result = valor.toString();
      const formated = result.replace('.', ',');
      return formated;
    }
    return '0';
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    prod: Produtos,
  ): void => {
    setMenuOpen(event.currentTarget);
    setBackProd(prod);
    setId(prod.id);
    setImagem(prod.imagem);
    setNome(prod.nome);
    setDescricao(prod.descricao);
    setVenda(prod.venda);
    if (prod.venda === 'Unidade') {
      setVUnidade(valueFormated1(prod.valor.toString()));
      setVKilo(null);
    } else {
      setVKilo(valueFormated1(prod.valorKilo.toString()));
      setVUnidade(null);
    }
  };

  const handleClose = (): void => {
    setMenuOpen(null);
  };

  const handleAddDiaryProduct = async (prod: Produtos): Promise<void> => {
    await api.post('/diary', {
      imagem: prod.imagem,
      nome: prod.nome,
      descricao: prod.descricao,
      venda: prod.venda,
      valor: prod.valor,
      valorKilo: prod.valorKilo,
    });
    await api.get('/diary').then((response) => {
      setSelectedProds(response.data);
    });
  };

  const handlePauseProduct = async (prod: Produtos): Promise<void> => {
    await api.delete('/diary', {
      data: {
        nome: prod.nome,
      },
    });
    await api.get('/diary').then((response) => {
      setSelectedProds(response.data);
    });
  };

  const handleChangeProduct = (v: ChangeEvent<HTMLSelectElement>): void => {
    if (v.target.value === 'Kilo') {
      setVenda(v.target.value);
      setVUnidade(null);
      setVKilo('');
    }
    if (v.target.value === 'Unidade') {
      setVenda(v.target.value);
      setVKilo(null);
      setVUnidade('');
    }
  };

  const handleApiChangeProduct = async (): Promise<void> => {
    await api
      .delete('/diary', {
        data: {
          nome: BackProd?.nome,
        },
      })
      .catch((e) => e);
    await api.get('/diary').then((response) => {
      setSelectedProds(response.data);
    });
    if (Imagem === BackProd?.imagem) {
      await api.patch('/products', {
        id: Id,
        imagem: Imagem,
        nome: Nome,
        descricao: Descricao,
        venda: Venda,
        valor: valueFormated2(VUnidade),
        valorKilo: valueFormated2(VKilo),
      });
    } else {
      await storage.ref(`/images/${Id}`).delete();
      const file = await blobToFile(cropped!, Nome!);
      let LinkImagem = '';

      await storage.ref(`/images/${Id}`).put(file);
      await storage
        .ref(`/images/${Id}`)
        .getDownloadURL()
        .then((data) => {
          LinkImagem = data;
        });

      await api.patch('/products', {
        id: Id,
        imagem: LinkImagem,
        nome: Nome,
        descricao: Descricao,
        venda: Venda,
        valor: valueFormated2(VUnidade),
        valorKilo: valueFormated2(VKilo),
      });
    }

    setComplete(true);
    handleCloseModal();
  };

  useEffect(() => {
    api.get('/diary').then((response) => {
      setSelectedProds(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('/products').then((response) => {
      setArray(response.data);

      const obj = { ...Array };

      Object.keys(obj).forEach((e) => {
        if (
          selectedProds.findIndex((item) => obj[+e].nome === item.nome) !== -1
        ) {
          obj[+e].included = true;
        } else {
          obj[+e].included = false;
        }
      });

      return setProdts(Array);
    });
  }, [Array, selectedProds]);

  return (
    <>
      <GoBack>
        <Link to="/a89d6642c31c33525be583f4333b37d260d14903319a846e4f1e9e091a978592/admin">
          <ArrowBackIcon />
        </Link>
      </GoBack>
      <Body>
        <Titulo>Produtos do dia</Titulo>

        {Prodts.sort((a, b) => a.nome.localeCompare(b.nome)).map((prod) => (
          <Prods key={prod.nome}>
            <span>
              <img src={prod.imagem} alt={prod.nome} />
              <div>
                <strong>{prod.nome}</strong>
                {prod.venda === 'Unidade' ? (
                  <p>{`R$ ${valueFormated3(prod.valor)} a Unidade`}</p>
                ) : (
                  <p>{`R$ ${valueFormated3(prod.valorKilo)} cada 100g`}</p>
                )}
              </div>

              <span>
                <ButtonTrue
                  Selected={prod.included}
                  type="button"
                  onClick={(e) => {
                    if (prod.included) {
                      e.preventDefault();
                    } else {
                      handleAddDiaryProduct(prod);
                    }
                  }}
                >
                  Ativo
                </ButtonTrue>
                <ButtonFalse
                  Selected={prod.included}
                  type="button"
                  onClick={(e) => {
                    if (!prod.included) {
                      e.preventDefault();
                    } else {
                      handlePauseProduct(prod);
                    }
                  }}
                >
                  Pausado
                </ButtonFalse>
              </span>
              <ButtonMenu
                onClick={(e) => {
                  handleClick(e, prod);
                }}
              >
                <MoreVertIcon />
              </ButtonMenu>
            </span>
          </Prods>
        ))}
        <Menu anchorEl={MenuOpen} open={open} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              handleClose();
              handleOpenModal();
            }}
          >
            Editar Produto
          </MenuItem>
        </Menu>
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DivModalAll>
            <CloseButton onClick={() => handleCloseModal()}>
              <CloseIcon />
            </CloseButton>
            <DivModal>
              <ImagemDiv>
                <img src={Imagem} alt={Nome} />
                <ButtonArchive>
                  Escolher Imagem
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setComplete(false);
                      onFileChange(e);
                      e.target.value = '';
                      e.target.files = null;
                    }}
                  />
                </ButtonArchive>
              </ImagemDiv>

              <div>
                <DivInputs>
                  <p>Nome</p>
                  <input
                    type="text"
                    value={Nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </DivInputs>

                <DivInputs>
                  <p>Descrição</p>
                  <input
                    type="text"
                    value={Descricao}
                    placeholder="Não há descrição"
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </DivInputs>

                <Picker>
                  <p>Tipo de venda</p>
                  <form>
                    <select
                      value={Venda}
                      onChange={(e) => handleChangeProduct(e)}
                    >
                      <option value="Unidade">Unidade</option>
                      <option value="Kilo">A cada 100 gramas</option>
                    </select>
                  </form>
                </Picker>

                {Venda === 'Unidade' ? (
                  <DivInputs>
                    <p>Valor unidade</p>
                    <input
                      type="text"
                      value={VUnidade!}
                      onChange={(e) => {
                        setVUnidade(e.target.value);
                      }}
                    />
                  </DivInputs>
                ) : null}

                {Venda === 'Kilo' ? (
                  <DivInputs>
                    <p>Valor a cada 100 gramas</p>
                    <input
                      type="text"
                      value={VKilo!}
                      onChange={(e) => setVKilo(e.target.value)}
                    />
                  </DivInputs>
                ) : null}
              </div>
            </DivModal>
            {Complete ? (
              <ButtonSubmit
                onClick={() => {
                  handleApiChangeProduct();
                }}
              >
                Editar
              </ButtonSubmit>
            ) : (
              <ButtonSubmit onClick={(e) => e.preventDefault()} disabled>
                Editar
              </ButtonSubmit>
            )}
          </DivModalAll>
        </Modal>

        <Modal
          open={modalCropOpen}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ModalDiv>
            <ImageDiv>
              <Cropper
                image={image!}
                crop={crop}
                zoom={zoom}
                aspect={4 / 4}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                zoomSpeed={0.05}
              />
            </ImageDiv>
            <Buttonmodal
              type="button"
              onClick={() => {
                showCroppedImage();
                setModalCropOpen(false);
              }}
            >
              Cortar
            </Buttonmodal>
          </ModalDiv>
        </Modal>
      </Body>
    </>
  );
};

export default DiaryProds;
