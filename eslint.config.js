// 既有的 imports
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

// --- 步驟 1: 新增這個 import ---
import eslintConfigPrettier from 'eslint-config-prettier'

export default defineConfig([
  globalIgnores(['dist']),

  // --- 步驟 2: 把原本 extends 裡的東西直接放到陣列中 ---
  js.configs.recommended,
  ...tseslint.configs.recommended, // tseslint.configs.recommended 是一個陣列，所以要用 ... 展開
  
  // 針對 React 的設定可以獨立出來，並指定檔案範圍
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  
  // 你自己的全域和語言設定
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module', // 建議加入
      globals: {
        ...globals.browser,
      },
    },
  },

  // --- 步驟 3: 最重要！把 prettier 設定放在陣列的最後 ---
  eslintConfigPrettier,
])