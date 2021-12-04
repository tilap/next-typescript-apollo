import { ApolloProvider } from '@apollo/client';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

// eslint-disable-next-line import/no-unassigned-import
import '../lib/i18n';
import { useApollo } from '../lib/apollo';

// eslint-disable-next-line import/no-unassigned-import
import 'normalize.css/normalize.css';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
