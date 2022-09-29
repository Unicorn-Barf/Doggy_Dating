import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import Profile from'./pages/Profile';
import Signin from './pages/Signin';
import Signout from './pages/Signout';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import Navbar from './components/Navbar';

const client = new ApolloClient({
  uri: 'graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client = {client}>
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
    </div>
    </ApolloProvider>
  );
}

export default App;
