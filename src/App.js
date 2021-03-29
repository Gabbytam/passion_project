import React from 'react';
import {Switch, Route} from 'react-router-dom';
import { ThemeProvider, theme, CSSReset } from '@chakra-ui/react';

import './css/App.css';

//component import 
import Layout from './Layout';
import Home from './Home';
import Random from './Random';
import Categories from './Categories';

function App() {

  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CSSReset/>
        <Layout>
          <Switch>
          <Route exact path={["/"]} component={Home} />
          <Route exact path='/pickforme' component={Random}/>
          <Route exact path='/categories' component={Categories} />
        </Switch>
        </Layout>
      </ThemeProvider>
      
      
    </div>
  );
}

export default App;
