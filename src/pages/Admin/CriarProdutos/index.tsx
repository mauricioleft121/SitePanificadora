import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import Modal from '@material-ui/core/Modal';
import { InputPicker } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import Alert from '@mui/material/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { v4 as uuidv4 } from 'uuid';
import getCroppedImg from './getImage';
import api from '../../../services/index';

import storage from '../../../services/firebase';

import {
  Page,
  ImageDiv,
  ModalDiv,
  Imagem,
  ButtonArchive,
  Formulario,
  ButtonSubmit,
  Picker,
  ImagePage,
  InputsPage,
  Buttonmodal,
  GoBack,
} from './styles';

const CriarProdutos: React.FC = () => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState<string | null>();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [cropped, setCroppedImage] = useState<Blob>();
  const [ImageURL, setImageURL] = useState<string>();
  const [completeCrop, setCompleteCrop] = useState<boolean>(false);
  const [NomeProduto, setNomeProduto] = useState<string>('');
  const [Descricao, setDescricao] = useState<string>('');
  const [TipoVenda, setTipoVenda] = useState<string>();
  const [Valor, setValor] = useState<string | null>();
  const [ValorKG, setValorKG] = useState<string | null>();
  const [Sucess, setSucess] = useState(false);

  const handleAlertConcluir = (): void => {
    setSucess(!Sucess);
  };

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaP: Area) => {
      setCroppedAreaPixels(croppedAreaP);
      setCompleteCrop(true);
    },
    [],
  );

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels!);
      setCroppedImage(croppedImage);
      const BlobToURL = URL.createObjectURL(croppedImage);
      setImageURL(BlobToURL);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, [croppedAreaPixels, image]);

  useEffect(() => {
    if (Valor) {
      setValorKG(null);
    }
  }, [Valor]);

  const handleCloseModal = (): void => {
    setModalOpen(false);
  };
  const handleOpenModal = (): void => {
    setModalOpen(true);
  };

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
      handleOpenModal();
    }
  };

  const options = [
    {
      label: 'Unidade',
      value: 'Unidade',
    },
    {
      label: 'Kilo',
      value: 'Kilo',
    },
  ];

  const valueFormated = (valor: string): string | null => {
    if (valor) {
      const result = valor;
      const formated = result.replace(',', '.');
      return formated;
    }
    return null;
  };

  const blobToFile = (theBlob: Blob, fileName: string): File => {
    return new File([theBlob], fileName, {
      lastModified: new Date().getTime(),
      type: theBlob.type,
    });
  };

  const CadastrarProduto = async (): Promise<void> => {
    const file = await blobToFile(cropped!, NomeProduto);
    let LinkImagem = '';
    const Id = uuidv4();

    await storage.ref(`/images/${Id}`).put(file);

    await storage
      .ref(`/images/${Id}`)
      .getDownloadURL()
      .then((data) => {
        LinkImagem = data;
      });

    if (LinkImagem !== '') {
      const Val = valueFormated(Valor!);
      const ValKG = valueFormated(ValorKG!);

      await api
        .post('/products', {
          id: Id,
          imagem: LinkImagem,
          nome: NomeProduto,
          descricao: Descricao,
          venda: TipoVenda,
          valor: Val,
          valorKilo: ValKG,
        })
        .then(() => {
          // eslint-disable-next-line no-alert
          setNomeProduto('');
          setDescricao('');
          setTipoVenda('');
          setValor('');
          setValorKG('');
          setCompleteCrop(false);
          handleAlertConcluir();
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e.message);
        });
    } else {
      // eslint-disable-next-line no-alert
      alert('Erro');
    }
  };

  return (
    <>
      <GoBack>
        <Link to="/a89d6642c31c33525be583f4333b37d260d14903319a846e4f1e9e091a978592/admin">
          <ArrowBackIcon />
        </Link>
      </GoBack>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Page>
          <ImagePage>
            <ButtonArchive>
              Escolher Imagem
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  onFileChange(e);
                  e.target.value = '';
                  e.target.files = null;
                }}
              />
            </ButtonArchive>
            <Imagem>
              {completeCrop ? <img src={ImageURL} alt="" /> : null}
            </Imagem>
          </ImagePage>
          <InputsPage>
            <Formulario>
              <strong>Nome do Produto</strong>
              <input
                type="text"
                placeholder="Nome do Produto"
                value={NomeProduto}
                onChange={(v) => setNomeProduto(v.target.value)}
              />
            </Formulario>
            <Formulario>
              <strong>Descrição</strong>
              <input
                type="text"
                placeholder="Descrição do produto"
                value={Descricao}
                onChange={(v) => setDescricao(v.target.value)}
              />
            </Formulario>
            <Picker>
              <strong>Tipo de venda</strong>
              <InputPicker
                data={options}
                style={{ width: 200 }}
                value={TipoVenda!}
                onChange={(v) => setTipoVenda(v)}
              />
            </Picker>
            {TipoVenda === 'Unidade' ? (
              <Formulario>
                <strong>Valor</strong>
                <input
                  type="text"
                  value={Valor!}
                  onChange={(v) => setValor(v.target.value)}
                  placeholder="Valor da Unidade"
                />
              </Formulario>
            ) : null}

            {TipoVenda === 'Kilo' ? (
              <Formulario>
                <strong>Valor (KG)</strong>
                <input
                  type="text"
                  value={ValorKG!}
                  onChange={(v) => setValorKG(v.target.value)}
                  placeholder="Valor do Kilo"
                />
              </Formulario>
            ) : null}

            <ButtonSubmit type="button" onClick={CadastrarProduto}>
              Cadastrar Produto
            </ButtonSubmit>
          </InputsPage>
          <Modal
            open={modalOpen}
            onClose={() => {
              handleCloseModal();
            }}
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
                  handleCloseModal();
                }}
              >
                Cortar
              </Buttonmodal>
            </ModalDiv>
          </Modal>

          <Snackbar
            open={Sucess}
            autoHideDuration={4000}
            onClose={handleAlertConcluir}
          >
            <Alert onClose={handleAlertConcluir} severity="success">
              Cadastrado Com Sucesso!
            </Alert>
          </Snackbar>
        </Page>
      </div>
    </>
  );
};

export default CriarProdutos;
