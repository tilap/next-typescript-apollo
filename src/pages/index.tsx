import { useApolloClient } from '@apollo/client';
import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';

import { i18n, Language } from '../lib/i18n';

const handleClick: React.MouseEventHandler = () => {
  const currentLanguage = i18n.language;

  i18n.changeLanguage(currentLanguage === Language.EN ? Language.RU : Language.EN);
};
const IndexPage: NextPage = () => {
  const [t] = useTranslation('common');
  const apolloClient = useApolloClient();

  return (
    <div>
      <p
        dangerouslySetInnerHTML={{
          __html: t('greetings', { version: apolloClient.version }),
        }}
      />

      <button onClick={handleClick}>Change language</button>
    </div>
  );
};

export default IndexPage;
