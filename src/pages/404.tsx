// pages/404.tsx
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import NextErrorComponent from 'next/error';

const NotFoundPage = () => {
  const { t } = useTranslation('page__404');
  return <NextErrorComponent statusCode={404} title={t('title')} />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['page__404'])),
    },
  };
};

export default NotFoundPage;
