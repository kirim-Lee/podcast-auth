import { ApolloProvider, useReactiveVar } from '@apollo/client';
import client, { isLoggedInVar } from './apollo';
import { BrowserRouter } from 'react-router-dom';
import { LoggedIn } from './logged-in-router';
import { LoggedOut } from './logged-out-router';

export default function App() {
  const isLoggin = useReactiveVar(isLoggedInVar);

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>{isLoggin ? <LoggedIn /> : <LoggedOut />}</BrowserRouter>
    </ApolloProvider>
  );
}
