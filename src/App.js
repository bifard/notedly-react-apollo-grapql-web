import GlobalStyle from "./components/GlobalStyle";
import Pages from "./pages";
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, gql } from '@apollo/client';
import { setContext } from 'apollo-link-context'



const uri = process.env.REACT_APP_API_URI;
const cache = new InMemoryCache();
const httpLink = createHttpLink({ uri });

const authLink = setContext((_, {headers}) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
});


const data = {
  isLoggedIn: !!localStorage.getItem('token')
}

client.onResetStore(()=> {
  cache.writeQuery({
    query: gql`
      query isLoggedIn{
        isLoggedIn
      }
    `,
    data: {
      ...data
    }
  });
})

cache.writeQuery({
  query: gql`
    query isLoggedIn{
      isLoggedIn
    }
  `,
  data: {
    ...data
  }
});

const App = () => {

  return (
    <ApolloProvider client={client}>
      <GlobalStyle/>
      <Pages/>
    </ApolloProvider>
  );
}

export default App;
