// vite.config.js 或 vite.config.ts  
import { defineConfig } from 'vite';  
// import vue from '@vitejs/plugin-vue'; // 如果您在使用Vue，则包含此插件  
  
// https://vitejs.dev/config/  
export default defineConfig({  
  plugins: [  
    // 如果您在使用Vue，则取消注释以下行  
    // vue()  
  ],  
  // 这里不需要特殊的配置来访问three库  
  // 但您可以添加其他配置来满足您的项目需求  
  resolve: {  
    // 默认情况下，Vite已经能够解析node_modules中的模块  
    // 但如果您需要自定义解析选项，可以在这里进行配置  
  },  
  // 其他Vite配置...  
});