import { MockedProvider as ApolloMockedProvider } from '@apollo/client/testing';
import { render as defaultRender, render } from '@testing-library/react';
import { NextRouter } from 'next/router';

export * from '@testing-library/react';

type DefaultParams = Parameters<typeof defaultRender>;
export type RenderUI = DefaultParams[0];
export type RenderOptions = DefaultParams[1] & { router?: Partial<NextRouter> };

export const renderWithApollo = (ui: RenderUI) => {
  return render(ui, { wrapper: ApolloMockedProvider });
};
