import { useApolloClient } from '@apollo/client';
import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';

import { i18n, Language } from 'lib/i18n';

const handleClick: React.MouseEventHandler = () => {
  const currentLanguage = i18n.language;

  i18n.changeLanguage(currentLanguage === Language.EN ? Language.RU : Language.EN);
};

const IndexPage: NextPage = () => {
  const [t] = useTranslation('pages/index');
  const [tI18n] = useTranslation('i18n');
  const apolloClient = useApolloClient();
  const currentLanguage = i18n.language;
  const otherLangages = Object.values(Language).filter((l) => l !== currentLanguage);

  return (
    <div>
      <p
        dangerouslySetInnerHTML={{
          __html: t('greetings', { version: apolloClient.version }),
        }}
      />

      {otherLangages.map((otherLangage) => (
        <button
          key={otherLangage}
          data-testid={`language-switcher-button-${currentLanguage}-to-${otherLangage}`}
          onClick={handleClick}
        >
          {tI18n(`${otherLangage}.changelanguage`)}
        </button>
      ))}
    </div>
  );
};

export default IndexPage;
