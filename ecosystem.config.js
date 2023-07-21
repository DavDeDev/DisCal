module.exports = {
  apps: [
    {
      name: 'DisCal',
      script: 'npm run start:prod',
      watch: ['build'],
      env: {
        NODE_ENV: 'production',
      },
    },
  ],

};
