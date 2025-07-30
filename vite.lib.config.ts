import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}

export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    rollupOptions: {
      external: ['vue', 'ant-design-vue', 'axios',
         'vxe-table', 'dayjs', 
         'codemirror-editor-vue3',
          'codemirror', 
          'jspdf',
           'vxe-table-plugin-export-pdf',
           'antdv-crud',
           'vxe-pc-ui',
           'vuedraggable',
           'less',
            'nanoid',
            'prettier',
            ],
      output: {
        globals: {
          vue: 'Vue',
        },
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'style.css';
          }
          return assetInfo.name;
        }
      },
    },
    lib: {
      entry: 'package/index.js',
      name: 'antdv-design',
      fileName: (format) => `antdv-design.${format}.js`,
    },
    sourcemap: true,
  },
  resolve: {
    alias: [
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
      },
      {
        find: /\/\@\//,
        replacement: pathResolve('package') + '/',
      },
      {
        find: /\/\#\//,
        replacement: pathResolve('types') + '/',
      },
    ],
  }
}) 