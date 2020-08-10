import type { Plugin } from 'vite'
import { PurgeIconsOptions } from 'purge-icons'
import { createServerPlugin } from './server'
import { createRollupPlugin } from './build'

export default function createPlugin(options: PurgeIconsOptions = {}): Plugin {
  const parsedOptions: PurgeIconsOptions = {
    content: [
      '**/*.html',
      '**/*.vue',
      '**/*.js',
      '**/*.ts',
    ],
    ...options,
  }

  return {
    configureServer: createServerPlugin({
      ...parsedOptions,
      iconifyImport: 'import Module from "/@modules/@iconify/iconify.js"\nconst Iconify = Module.default',
    }),
    rollupInputOptions: {
      plugins: [
        createRollupPlugin({
          ...parsedOptions,
          iconifyImport: 'import Iconify from "@iconify/iconify.js"',
        }),
      ],
    },
  }
}
