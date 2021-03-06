import { resolve } from 'path';

import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'aiao-elements',
  plugins: [sass()],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'dist-hydrate-script'
    }
  ],
  copy: [
    {
      src: resolve(__dirname, '../../', 'dist/libs/image-storage'),
      dest: resolve(__dirname, 'vendors/image-storage')
    },
    {
      src: resolve(__dirname, '../../', 'node_modules/monaco-editor/dev'),
      dest: resolve(__dirname, 'vendors/monaco-editor')
    },
    {
      src: resolve(__dirname, '../../', 'node_modules/ionicons'),
      dest: resolve(__dirname, 'vendors/ionicons')
    }
  ],
  tsconfig: 'tsconfig.json',
  globalScript: 'src/lib/global/global.ts'
};
