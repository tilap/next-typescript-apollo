import { render as defaultRender } from '@testing-library/react';
import { NextRouter } from 'next/router';
import { render } from '@testing-library/react';
export * from '@testing-library/react';
import { MockedProvider as ApolloMockedProvider } from '@apollo/client/testing';

type DefaultParams = Parameters<typeof defaultRender>;
export type RenderUI = DefaultParams[0];
export type RenderOptions = DefaultParams[1] & { router?: Partial<NextRouter> };

export const renderWithApollo = (ui: RenderUI) => {
  return render(ui, { wrapper: ApolloMockedProvider });
};
