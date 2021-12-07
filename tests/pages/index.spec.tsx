import { screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import Index from 'pages/index';
import { renderWithApollo } from '../renderers';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('Page Index', () => {
  describe('Page does not change', () => {
    it('match previous snapshot', () => {
      (useRouter as jest.Mock).mockImplementation(() => ({
        locale: 'en',
        locales: ['en'],
      }));
      const result = renderWithApollo(<Index />);
      expect(result.baseElement).toMatchSnapshot();
    });
  });

  describe('Page shows button to switch language', () => {
    it('does not render button when there is only one language available', () => {
      (useRouter as jest.Mock).mockImplementation(() => ({
        locale: 'en',
        locales: ['en'],
      }));
      renderWithApollo(<Index />);

      expect(screen.queryByTestId('changelanguage-btn-en')).not.toBeInTheDocument();
      expect(screen.queryByTestId('changelanguage-btn-ru')).not.toBeInTheDocument();
    });

    it('renders one button when another language is available', () => {
      (useRouter as jest.Mock).mockImplementation(() => ({
        locale: 'en',
        locales: ['en', 'ru'],
      }));
      renderWithApollo(<Index />);

      expect(screen.queryByTestId('changelanguage-btn-en')).not.toBeInTheDocument();
      expect(screen.queryByTestId('changelanguage-btn-ru')).toBeInTheDocument();
    });

    it('renders many buttons when another langages are available', () => {
      const push = jest.fn();
      (useRouter as jest.Mock).mockImplementation(() => ({
        push,
        pathname: '/',
        route: '/',
        asPath: '/',
        query: '',
        locale: 'fr',
        locales: ['en', 'ru', 'fr', 'nl'],
      }));
      renderWithApollo(<Index />);

      expect(screen.queryByTestId('changelanguage-btn-fr')).not.toBeInTheDocument();
      expect(screen.queryByTestId('changelanguage-btn-en')).toBeInTheDocument();
      expect(screen.queryByTestId('changelanguage-btn-ru')).toBeInTheDocument();
      expect(screen.queryByTestId('changelanguage-btn-nl')).toBeInTheDocument();
    });
  });
});
