import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './App.css';

//component import 
import Layout from './Layout';
import Home from './Home';
import Random from './Random';

function App() {
  return (
    <div className="App">
      <Layout>
      <Switch>
       <Route exact path={["/"]} component={Home} />
       <Route exact path="/pickforme" component={Random}/>
     </Switch>
    </Layout>
      
    </div>
  );
}

export default App;
