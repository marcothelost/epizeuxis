import { InitialStateDefaultObject as ProjectState } from '@store/slices/project';

export const generateCmakeConfig = (projectState: ProjectState): string => {
  let result = '';

  result += '# CMake Minimum Version\n';
  result += 'cmake_minimum_required(VERSION 3.5)\n\n';
  result += '# Constants\n';
  result += `set(PROJECT_NAME ${projectState.projectName})\n\n`;
  result += '# Project Name\n';
  result += 'project(${PROJECT_NAME})\n\n';
  result += '# C++ Standard\n';
  result += 'set(CMAKE_CXX_STANDARD 17)\n';

  if (projectState.executables.length === 0) {
    return result;
  }
  result += '\n# Executables\n';

  projectState.executables.forEach((executable) => {
    result += 'add_executable(\n';
    result += `  ${executable.name}\n`;
    executable.sourceFiles.forEach((sourceFile) => {
      result += `  ${sourceFile}\n`;
    });
    result += ')\n';
    if (executable.headerDirectories.length > 0) {
      result += `target_include_directories(${executable.name} PUBLIC `;
      executable.headerDirectories.forEach((directory) => {
        result += ` ${directory}`;
      });
      result += ')\n';
    }
  });

  return result;
};
