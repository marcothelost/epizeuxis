import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { Executable } from '@typings/file';

export interface InitialStateDefaultObject {
  projectName: string;
  executables: Executable[];
  sourceFiles: string[];
  headerDirectories: string[];
}

const INITIAL_STATE: InitialStateDefaultObject = {
  projectName: 'project',
  executables: [],
  sourceFiles: [],
  headerDirectories: [],
};

export const projectSlice = createSlice({
  name: 'project',
  initialState: INITIAL_STATE,
  reducers: {
    setProjectName: (state, action: PayloadAction<string>) => {
      state.projectName = action.payload;
    },
    addExecutable: (state, action: PayloadAction<string>) => {
      state.executables.push({
        name: action.payload,
        sourceFiles: [],
        headerDirectories: [],
      });
    },
    removeExecutable: (state, action: PayloadAction<string>) => {
      state.executables = state.executables.filter(
        (executable) => executable.name !== action.payload
      );
    },
    addSourceFile: (state, action: PayloadAction<string>) => {
      state.sourceFiles.push(action.payload);
    },
    removeSourceFile: (state, action: PayloadAction<string>) => {
      state.sourceFiles = state.sourceFiles.filter(
        (sourceFile) => sourceFile !== action.payload
      );
    },
    addHeaderDirectory: (state, action: PayloadAction<string>) => {
      state.headerDirectories.push(action.payload);
    },
    removeHeaderDirectory: (state, action: PayloadAction<string>) => {
      state.headerDirectories = state.headerDirectories.filter(
        (headerDirectory) => headerDirectory !== action.payload
      );
    },
    updateSourceFileLinking: (
      state,
      action: PayloadAction<{
        executableName: Executable['name'];
        sourceFile: string;
        isAdding: boolean;
      }>
    ) => {
      state.executables.map((executable) => {
        if (executable.name !== action.payload.executableName) {
          return executable;
        }
        action.payload.isAdding
          ? executable.sourceFiles.push(action.payload.sourceFile)
          : executable.sourceFiles.splice(
              executable.sourceFiles.indexOf(action.payload.sourceFile),
              1
            );
        return executable;
      });
    },
    updateHeaderDirectoryLinking: (
      state,
      action: PayloadAction<{
        executableName: Executable['name'];
        directory: string;
        isAdding: boolean;
      }>
    ) => {
      state.executables.map((executable) => {
        if (executable.name !== action.payload.executableName) {
          return executable;
        }
        action.payload.isAdding
          ? executable.headerDirectories.push(action.payload.directory)
          : executable.headerDirectories.splice(
              executable.headerDirectories.indexOf(action.payload.directory),
              1
            );
        return executable;
      });
    },
  },
});
export const {
  setProjectName,
  addExecutable,
  removeExecutable,
  addSourceFile,
  removeSourceFile,
  addHeaderDirectory,
  removeHeaderDirectory,
  updateSourceFileLinking,
  updateHeaderDirectoryLinking,
} = projectSlice.actions;
