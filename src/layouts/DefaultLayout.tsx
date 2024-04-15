import React from 'react';

import { PageSidebar } from '@components/blocks/PageSidebar';

interface Props {
  children: React.ReactNode;
}

export const DefaultLayout: React.FC<Props> = ({ children }) => (
  <div className="flex w-max">
    <PageSidebar />
    <div className="flex-1 p-4">{children}</div>
  </div>
);
