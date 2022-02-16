import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Admin from '../pages/Admin/index';
import DiaryProds from '../pages/Admin/ProdutosDiarios';
import Carrinho from '../pages/Carrinho';
import Pedido from '../pages/Pedido';
import Pagamento from '../pages/Pagamento';
import Galeria from '../pages/Gallery';
import Contato from '../pages/Contato';
import CriarProdutos from '../pages/Admin/CriarProdutos';
import DeletarProdutos from '../pages/Admin/DeletarProdutos';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/galeria" exact component={Galeria} />
    <Route path="/contato" exact component={Contato} />
    <Route
      path="/a89d6642c31c33525be583f4333b37d260d14903319a846e4f1e9e091a978592/admin"
      exact
      component={Admin}
    />
    <Route
      path="/a89d6642c31c33525be583f4333b37d260d14903319a846e4f1e9e091a978592/admin/diaryprods"
      exact
      component={DiaryProds}
    />
    <Route
      path="/a89d6642c31c33525be583f4333b37d260d14903319a846e4f1e9e091a978592/admin/deleteprods"
      exact
      component={DeletarProdutos}
    />
    <Route path="/carrinho" exact component={Carrinho} />
    <Route path="/carrinho/pedido" exact component={Pedido} />
    <Route path="/carrinho/pedido/pag" exact component={Pagamento} />
    <Route
      path="/a89d6642c31c33525be583f4333b37d260d14903319a846e4f1e9e091a978592/admin/createprods"
      exact
      component={CriarProdutos}
    />
  </Switch>
);

export default Routes;
