import { MockedProvider as ApolloMockedProvider } from '@apollo/client/testing';
import { fireEvent, render, screen } from '@testing-library/react';

import { i18n, Language } from '../../src/lib/i18n';
import Index from '../../src/pages/index';

const renderWithApollo = (element: React.ReactElement) => {
  render(element, { wrapper: ApolloMockedProvider });
};

describe('Index page correctly renders in different locales', () => {
  it('renders in English', () => {
    i18n.init({ lng: Language.EN });
    renderWithApollo(<Index />);
    expect(screen.getByText(/hi!/i)).toBeInTheDocument();
  });

  it('renders in Russian', () => {
    i18n.init({ lng: Language.RU });
    renderWithApollo(<Index />);
    expect(screen.getByText(/привет!/i)).toBeInTheDocument();
  });

  it('switch from english to russian', () => {
    i18n.init({ lng: Language.EN });

    renderWithApollo(<Index />);

    const languageSwitcherButton = screen.getByTestId('language-switcher-button-en-to-ru');

    expect(i18n.language).toBe(Language.EN);
    expect(languageSwitcherButton).toBeInTheDocument();

    fireEvent.click(languageSwitcherButton);

    expect(i18n.language).toBe(Language.RU);
  });
});
