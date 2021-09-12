import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { Main } from './components/Main';
import { LotteriesProvider } from './contexts/LotteriesContext';

function App() {
  return (
    <Router>
      <LotteriesProvider>
        <Switch>
          <Route path="/:id" component={Main} />
          <Route exact path="/">
            <Redirect to="/0" />
          </Route>
        </Switch>
      </LotteriesProvider>
    </Router>
  );
}

export default App;

