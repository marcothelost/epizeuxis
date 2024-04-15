import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  addExecutable,
  removeExecutable,
  addSourceFile,
  removeSourceFile,
  addHeaderDirectory,
  removeHeaderDirectory,
} from '@store/slices/file';

import { AppRoute } from '@utils/route';

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
      <ul className="mb-4 flex flex-col gap-1">
        <li>
          <Link className="flex items-center gap-1" to={AppRoute.HOME}>
            <span className="typcn typcn-home-outline flex"></span>
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center gap-1"
            to={AppRoute.PROJECT_SETTINGS}
          >
            <span className="typcn typcn-cog-outline flex"></span>
            <span>Project Settings</span>
          </Link>
        </li>
      </ul>
      <div className="flex items-center">
        <h3 className="flex items-center gap-1">
          <span className="typcn typcn-point-of-interest-outline flex"></span>
          <span>Executables</span>
        </h3>
        <button onClick={handleAddExecutable} className="ml-auto">
          <span className="typcn typcn-plus flex"></span>
        </button>
      </div>
      {executables.length ? (
        <ul className="pl-2">
          {executables.map((executable, index) => (
            <li key={index}>
              <span>{executable.name}</span>
              <button
                onClick={() => dispatch(removeExecutable(executable.name))}
              >
                <span className="typcn typcn-times flex"></span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="flex items-center">
        <h3 className="flex items-center gap-1">
          <span className="typcn typcn-document flex"></span>
          <span>Source Files</span>
        </h3>
        <button onClick={handleAddSourceFile} className="ml-auto">
          <span className="typcn typcn-plus flex"></span>
        </button>
      </div>
      {sourceFiles.length ? (
        <ul className="pl-2">
          {sourceFiles.map((sourceFile, index) => (
            <li key={index}>
              <span>{sourceFile}</span>
              <button onClick={() => dispatch(removeSourceFile(sourceFile))}>
                <span className="typcn typcn-times flex"></span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="flex items-center">
        <h3 className="flex items-center gap-1">
          <span className="typcn typcn-folder flex"></span>
          <span>Header Directories</span>
        </h3>
        <button onClick={handleAddHeaderDirectory} className="ml-auto">
          <span className="typcn typcn-plus flex"></span>
        </button>
      </div>
      {headerDirectories.length ? (
        <ul className="pl-2">
          {headerDirectories.map((directory, index) => (
            <li key={index}>
              <span>{directory}</span>
              <button
                onClick={() => dispatch(removeHeaderDirectory(directory))}
              >
                <span className="typcn typcn-times flex"></span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  );
};
