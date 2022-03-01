import GlobalStyle from "./components/GlobalStyle";
import Pages from "./pages";
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context'
import { IS_LOGGED_IN } from "./gql/query";



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
    query: IS_LOGGED_IN,
    data: {
      ...data
    }
  });
})

cache.writeQuery({
  query: IS_LOGGED_IN,
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
