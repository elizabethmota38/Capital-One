import React from 'react';
import { tsConstructSignatureDeclaration } from '@babel/types';
import {SearchBar} from './components/SearchBar/searchBar';
import {Jheader} from './components/header/header';


  
  function App(){
    return (
      <React.Fragment>
        <Jheader/> 
        <SearchBar/>
      </React.Fragment>
    );

  }

export default App;
