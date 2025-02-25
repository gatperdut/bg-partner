import * as fs from 'fs';
import * as path from 'path';

export const cleanup = (outputDir: string): void => {
  const deleteFiles: string[] = [
    'version',
    'LICENSE',
    'LICENSES.chromium.html',
    'vulkan-1.dll',
    'vk_swiftshader_icd.json',
    'vk_swiftshader.dll',
    'libGLESv2.dll',
    'libEGL.dll',
    'd3dcompiler_47.dll',
    'libvk_swiftshader.so',
    'libvulkan.so.1',
    'chrome-sandbox',
    'chrome_crashpad_handler',
  ];

  const deleteFolders: string[] = [
    'locales',
    path.join('resources/app.asar.unpacked/.webpack/main/native_modules/build/koffi/darwin_arm64'),
    path.join('resources/app.asar.unpacked/.webpack/main/native_modules/build/koffi/darwin_x64'),
    path.join('resources/app.asar.unpacked/.webpack/main/native_modules/build/koffi/freebsd_arm64'),
    path.join('resources/app.asar.unpacked/.webpack/main/native_modules/build/koffi/freebsd_ia32'),
    path.join('resources/app.asar.unpacked/.webpack/main/native_modules/build/koffi/freebsd_x64'),
    path.join('resources/app.asar.unpacked/.webpack/main/native_modules/build/koffi/musl_x64'),
    path.join('resources/app.asar.unpacked/.webpack/main/native_modules/build/koffi/openbsd_ia32'),
    path.join('resources/app.asar.unpacked/.webpack/main/native_modules/build/koffi/openbsd_x64'),
  ];

  deleteFiles.forEach((file: string): void => {
    const filePath = path.join(outputDir, file);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });

  deleteFolders.forEach((folder: string): void => {
    const folderPath = path.join(outputDir, folder);

    if (fs.existsSync(folderPath)) {
      fs.rmSync(folderPath, { recursive: true, force: true });
    }
  });
};
