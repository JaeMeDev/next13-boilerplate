import { ReactNode } from 'react';

import { render } from '@testing-library/react';

import MockTheme from './MockTheme';

function renderWithProviders(node: ReactNode) {
  return render(
    <MockTheme>
      {node}
    </MockTheme>,
  );
}

export default renderWithProviders;
