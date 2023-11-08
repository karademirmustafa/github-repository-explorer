import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './graphql/index.ts'
import "./index.css";
import { DataProvider } from './context/DataContext.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DataProvider>

      <ApolloProvider client={apolloClient}>

        <App />

      </ApolloProvider>
    </DataProvider>



  </React.StrictMode >,
)
