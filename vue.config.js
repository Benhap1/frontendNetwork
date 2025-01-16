const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    port: 3000, // Порт, на котором работает фронтенд
    proxy: {
      '/api': {
        target: 'http://localhost:8085', // Gateway-сервер
        changeOrigin: true, // Изменяет Origin-заголовок для соответствия целевому серверу

      },
    },
  },
});
