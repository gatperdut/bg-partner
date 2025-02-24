import { MakerZIP } from '@electron-forge/maker-zip';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import type { ForgeConfig, ResolvedForgeConfig } from '@electron-forge/shared-types';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import { cleanup } from './cleanup';
import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    // TODO does this work for windows, at least?
    icon: '/home/carlosr/Desktop/bg-partner/src/assets/icons/256x256.ico',
  },
  makers: [new MakerZIP({}, ['linux', 'win32'])],
  hooks: {
    postPackage: async (config: ResolvedForgeConfig, options): Promise<void> => {
      cleanup(options.outputPaths[0]);
    },
  },
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            name: 'sheet',
            html: './src/views/sheet/sheet.html',
            js: './src/views/sheet/renderer.ts',
            preload: {
              js: './src/views/sheet/preload.ts',
            },
          },
          {
            name: 'control',
            html: './src/views/control/control.html',
            js: './src/views/control/renderer.ts',
            preload: {
              js: './src/views/control/preload.ts',
            },
          },
        ],
      },
    }),
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
