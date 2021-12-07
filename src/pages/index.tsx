import { useApolloClient } from '@apollo/client';
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';

const IndexPage: NextPage = () => {
  const { locale, locales } = useRouter();
  const { t } = useTranslation('page__index');
  const { t: tI18n } = useTranslation('i18n');
  const apolloClient = useApolloClient();

  return (
    <div>
      <p
        dangerouslySetInnerHTML={{
          __html: t('greetings', { version: apolloClient.version }),
        }}
      />

      {locales
        .filter((l) => l !== locale)
        .map((otherLocale) => (
          <Link key={otherLocale} href="/" locale={otherLocale} passHref>
            <button data-testid={`changelanguage-btn-${otherLocale}`}>{tI18n(`${otherLocale}.changelanguage`)}</button>
          </Link>
        ))}
    </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['page__index', 'common', 'i18n'])),
  },
});

export default IndexPage;
