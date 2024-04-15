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
    if (executables.includes(executable)) {
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
    <aside>
      <h2>Sidebar</h2>
      <h3>Executables</h3>
      {executables.length ? (
        <ul>
          {executables.map((executable, index) => (
            <li key={index}>
              <span>{executable}</span>&nbsp;&nbsp;
              <button onClick={() => dispatch(removeExecutable(executable))}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <button onClick={handleAddExecutable}>Add</button>
      <h3>Source Files</h3>
      {sourceFiles.length ? (
        <ul>
          {sourceFiles.map((sourceFile, index) => (
            <li key={index}>
              <span>{sourceFile}</span>&nbsp;&nbsp;
              <button onClick={() => dispatch(removeSourceFile(sourceFile))}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <button onClick={handleAddSourceFile}>Add</button>
      <h3>Header Directories</h3>
      {headerDirectories.length ? (
        <ul>
          {headerDirectories.map((directory, index) => (
            <li key={index}>
              <span>{directory}</span>&nbsp;&nbsp;
              <button
                onClick={() => dispatch(removeHeaderDirectory(directory))}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <button onClick={handleAddHeaderDirectory}>Add</button>
    </aside>
  );
};
