import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Produtos from '../pages/Produtos';
import Admin from '../pages/Admin';
import Carrinho from '../pages/Carrinho';
import Pedido from '../pages/Pedido';
import Pagamento from '../pages/Pagamento';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/produtos" exact component={Produtos} />
    <Route path="/admin" exact component={Admin} />
    <Route path="/carrinho" exact component={Carrinho} />
    <Route path="/carrinho/pedido" exact component={Pedido} />
    <Route path="/carrinho/pedido/pag" exact component={Pagamento} />
  </Switch>
);

export default Routes;
