import { Config } from '@stencil/core';
import nodePolyfills from 'rollup-plugin-node-polyfills';


export const config: Config = {
  namespace: 'homepage-menu',
  globalStyle: 'src/global/global.css',
  rollupPlugins: {

    after: [
      nodePolyfills(),
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
      baseUrl: 'http://localhost:3333'
    },
  ],
};
