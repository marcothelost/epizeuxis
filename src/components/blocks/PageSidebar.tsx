import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  addExecutable,
  removeExecutable,
  addSourceFile,
  removeSourceFile,
  addHeaderDirectory,
  removeHeaderDirectory,
} from '@store/slices/file';

import type { RootState } from '@store/base';

export const PageSidebar: React.FC = () => {
  const { executables, sourceFiles, headerDirectories } = useSelector(
    (store: RootState) => store.file
  );
  const dispatch = useDispatch();

  const handleAddExecutable = () => {
    const executable = String(window.prompt());
    if (
      executables.some(
        (testedExecutable) => testedExecutable.name === executable
      )
    ) {
      alert('This executable already exists!');
      return;
    }
    dispatch(addExecutable(executable));
  };

  const handleAddSourceFile = () => {
    const sourceFile = String(window.prompt());
    if (sourceFiles.includes(sourceFile)) {
      alert('This source file already exists!');
      return;
    }
    if (!sourceFile.endsWith('.cpp')) {
      alert('This file is not a .cpp file!');
      return;
    }
    dispatch(addSourceFile(sourceFile));
  };

  const handleAddHeaderDirectory = () => {
    const directory = String(window.prompt());
    if (headerDirectories.includes(directory)) {
      alert('This header directory already exists!');
      return;
    }
    dispatch(addHeaderDirectory(directory));
  };

  return (
    <aside className="flex h-screen w-56 flex-col border-r border-gray-300 p-4">
      <h2 className="mb-4">Epizeuxis</h2>
      <div className="align-center flex">
        <h3 className="flex items-center gap-1">
          <span className="typcn typcn-point-of-interest-outline"></span>
          <span>Executables</span>
        </h3>
        <button onClick={handleAddExecutable} className="ml-auto">
          <span className="typcn typcn-plus"></span>
        </button>
      </div>
      {executables.length ? (
        <ul>
          {executables.map((executable, index) => (
            <li key={index}>
              <span>{executable.name}</span>
              <button
                onClick={() => dispatch(removeExecutable(executable.name))}
              >
                <span className="typcn typcn-times"></span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="align-center flex">
        <h3 className="flex items-center gap-1">
          <span className="typcn typcn-document"></span>
          <span>Source Files</span>
        </h3>
        <button onClick={handleAddSourceFile} className="ml-auto">
          <span className="typcn typcn-plus"></span>
        </button>
      </div>
      {sourceFiles.length ? (
        <ul>
          {sourceFiles.map((sourceFile, index) => (
            <li key={index}>
              <span>{sourceFile}</span>
              <button onClick={() => dispatch(removeSourceFile(sourceFile))}>
                <span className="typcn typcn-times"></span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="align-center flex">
        <h3 className="flex items-center gap-1">
          <span className="typcn typcn-folder"></span>
          <span>Header Directories</span>
        </h3>
        <button onClick={handleAddHeaderDirectory} className="ml-auto">
          <span className="typcn typcn-plus"></span>
        </button>
      </div>
      {headerDirectories.length ? (
        <ul>
          {headerDirectories.map((directory, index) => (
            <li key={index}>
              <span>{directory}</span>
              <button
                onClick={() => dispatch(removeHeaderDirectory(directory))}
              >
                <span className="typcn typcn-times"></span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  );
};
