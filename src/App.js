import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/Landing/Landing';
import MovieList from './components/MovieList/MovieList';
import MovieDetail from './components/MovieDetail/MovieDetail';
import NotFound from './components/NotFound/NotFound';
import { ChakraProvider } from "@chakra-ui/react"
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Router>
        <ChakraProvider
          resetCSS
        >
          <MainLayout>
            <Switch>
              <Route path='/' component={Landing} exact />
              <Route path='/movie/:name' component={MovieList} exact />
              <Route path='/movie/:name/detail' component={MovieDetail} exact />
              <Route component={NotFound} />
            </Switch> 
        </MainLayout>

        </ChakraProvider>
    </Router>
  );
}

export default App;
