import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from '@pages/HomePage';
import { ProjectSettingsPage } from '@pages/ProjectSettingsPage';
import { NotFoundPage } from '@pages/NotFoundPage';

import { AppRoute } from '@utils/route';

import 'typicons.font/src/font/typicons.css';

import '@styles/main.css';

export const App: React.FC = () => (
  <Routes>
    <Route path={AppRoute.HOME} element={<HomePage />} />
    <Route path={AppRoute.PROJECT_SETTINGS} element={<ProjectSettingsPage />} />
    <Route path={AppRoute.NOT_FOUND} element={<NotFoundPage />} />
  </Routes>
);
