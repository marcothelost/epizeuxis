import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DefaultLayout } from '@layouts/DefaultLayout';

import { Button } from '@components/elements/Button';

import {
  updateSourceFileLinking,
  updateHeaderDirectoryLinking,
} from '@store/slices/project';

import { generateCmakeConfig } from '@utils/cmake';

import type { RootState } from '@store/base';

export const HomePage: React.FC = () => {
  const resultRef = useRef<HTMLTextAreaElement | null>(null);
  const projectState = useSelector((store: RootState) => store.project);
  const { executables, sourceFiles, headerDirectories } = projectState;
  const dispatch = useDispatch();

  const handleGenerate = () => {
    if (!resultRef.current) {
      return;
    }
    const result = generateCmakeConfig(projectState);
    resultRef.current.value = result;
  };

  return (
    <DefaultLayout>
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
      <Button text="Generate" onClick={handleGenerate} />
      <br />
      <textarea
        className="rounded border border-gray-300"
        cols={40}
        rows={20}
        style={{ resize: 'none' }}
        readOnly
        ref={resultRef}
      ></textarea>
    </DefaultLayout>
  );
};
