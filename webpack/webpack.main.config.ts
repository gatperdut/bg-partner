import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import type { Configuration } from 'webpack';
import { plugins } from './webpack.plugins';
import { rules } from './webpack.rules';

export const mainConfig: Configuration = {
  entry: './src/index.ts',
  module: {
    rules,
  },
  plugins: [
    ...plugins,
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*.hbs',
          context: path.resolve(__dirname, '../src'),
          to: '[path][name][ext]',
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json', '.scss'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json', // Point to your tsconfig.json
      }),
    ],
  },
};
