import { Config } from '@stencil/core';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import 'fs';

export const config: Config = {
  namespace: 'homepage-menu',
  rollupPlugins: {

    after: [
      nodePolyfills(),
      nodeResolve({ preferBuiltins: false })

    ]
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
