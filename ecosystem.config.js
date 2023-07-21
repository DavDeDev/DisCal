module.exports = {
  apps: [
    {
      name: 'DisCal',
      script: 'npm',
      args: 'run start',
      watch: ['build'],
      env: {
        NODE_ENV: 'production',
      },
    },
  ],

};
