module.exports = {
  apps: [
    {
      name: 'DisCal',
      script: 'npm',
      args: 'start',
      watch: ['build'],
      env: {
        NODE_ENV: 'production',
      },
    },
  ],

};
