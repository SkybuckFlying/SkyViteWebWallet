import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-browser.js',  // Updated for Vue 3
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@i18n': path.resolve(__dirname, './src/i18n'),
      '@mixins': path.resolve(__dirname, './src/mixins'),
      '@plugins': path.resolve(__dirname, './src/plugins'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@uiKit': path.resolve(__dirname, './src/uiKit'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@h5': path.resolve(__dirname, './srcH5'),
      '@pc': path.resolve(__dirname, './srcPC'),
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `$injectedColor: orange;`,
        // Use the modern API
        api: 'modern',
      },
    },
  },
});
