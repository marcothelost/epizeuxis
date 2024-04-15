/**
 * Represents an executable with its name, source files, and header directories.
 *
 * @interface
 */
export interface Executable {
  name: string;
  sourceFiles: string[];
  headerDirectories: string[];
}
