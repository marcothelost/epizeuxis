import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DefaultLayout } from '@layouts/DefaultLayout';

import { Button } from '@components/elements/Button';

import { setProjectName as setStoreProjectName } from '@store/slices/project';

import type { RootState } from '@store/base';

export const ProjectSettingsPage: React.FC = () => {
  const { projectName: storeProjectName } = useSelector(
    (store: RootState) => store.project
  );
  const dispatch = useDispatch();

  const [projectName, setProjectName] = useState<string>(storeProjectName);

  const handleSave = () => {
    dispatch(setStoreProjectName(projectName));
  };

  return (
    <DefaultLayout>
      <h1>Project Settings</h1>
      <h2>Project Name</h2>
      <input
        className="rounded border border-gray-300 px-2 py-1"
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <br />
      <br />
      <Button text="Save" onClick={handleSave} />
    </DefaultLayout>
  );
};
