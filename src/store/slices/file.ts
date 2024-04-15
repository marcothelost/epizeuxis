import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialStateDefaultObject {
  executables: string[];
  sourceFiles: string[];
  headerDirectories: string[];
}

const INITIAL_STATE: InitialStateDefaultObject = {
  executables: [],
  sourceFiles: [],
  headerDirectories: [],
};

export const fileSlice = createSlice({
  name: 'file',
  initialState: INITIAL_STATE,
  reducers: {
    addExecutable: (state, action: PayloadAction<string>) => {
      state.executables.push(action.payload);
    },
    removeExecutable: (state, action: PayloadAction<string>) => {
      state.executables = state.executables.filter(
        (executable) => executable !== action.payload
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
  },
});
export const {
  addExecutable,
  removeExecutable,
  addSourceFile,
  removeSourceFile,
  addHeaderDirectory,
  removeHeaderDirectory,
} = fileSlice.actions;
