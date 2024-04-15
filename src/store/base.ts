import { configureStore } from '@reduxjs/toolkit';

import { projectSlice } from './slices/project';

export const store = configureStore({
  reducer: {
    project: projectSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
