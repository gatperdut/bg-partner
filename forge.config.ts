import { MakerZIP } from '@electron-forge/maker-zip';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import type { ForgeConfig, ResolvedForgeConfig } from '@electron-forge/shared-types';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import * as os from 'os';
import * as path from 'path';
import { cleanup } from './webpack/cleanup';
import { mainConfig } from './webpack/webpack.main.config';
import { rendererConfig } from './webpack/webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    icon:
      os.platform() === 'linux'
        ? undefined
        : path.join(__dirname, 'src', 'assets', 'icons', '256x256'),
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
