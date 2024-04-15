import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { PageSidebar } from '@components/blocks/PageSidebar';
import { Button } from '@components/elements/Button';

import {
  updateSourceFileLinking,
  updateHeaderDirectoryLinking,
} from '@store/slices/file';

import type { RootState } from '@store/base';

export const HomePage: React.FC = () => {
  const { executables, sourceFiles, headerDirectories } = useSelector(
    (store: RootState) => store.file
  );
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <PageSidebar />
      <h1>Executables</h1>
      {executables.map((executable) => (
        <div key={executable.name}>
          <h2>{executable.name}</h2>
          <h3>Source Files</h3>
          {sourceFiles.map((sourceFile) => (
            <React.Fragment key={sourceFile}>
              <input
                type="checkbox"
                onChange={(e) =>
                  dispatch(
                    updateSourceFileLinking({
                      executableName: executable.name,
                      sourceFile,
                      isAdding: e.target.checked,
                    })
                  )
                }
              />
              <label>{sourceFile}</label>
            </React.Fragment>
          ))}
          <h3>Header Directories</h3>
          {headerDirectories.map((directory) => (
            <React.Fragment key={directory}>
              <input
                type="checkbox"
                onChange={(e) =>
                  dispatch(
                    updateHeaderDirectoryLinking({
                      executableName: executable.name,
                      directory,
                      isAdding: e.target.checked,
                    })
                  )
                }
              />
              <label>{directory}</label>
            </React.Fragment>
          ))}
        </div>
      ))}
      <Button text="Generate" />
      <br />
      <textarea
        className="rounded border border-gray-300"
        cols={30}
        rows={10}
        style={{ resize: 'none' }}
        readOnly
      ></textarea>
    </React.Fragment>
  );
};
