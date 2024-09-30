import feTsRules from '@shelf/eslint-config/frontend-typescript.js';

export default [
  ...feTsRules,
  {
    ignores: ['**/coverage/', '**/lib/', 'renovate.json'],
  },
];
