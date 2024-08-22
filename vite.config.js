import restart from 'vite-plugin-restart'
import { resolve } from 'path'
import fs from 'fs'

// 动态获取 src 目录下所有的 HTML 文件
function getHtmlFiles(dir, files_ = {}) {
  const files = fs.readdirSync(dir);
  
  files.forEach(function(file) {
      const filePath = resolve(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
          getHtmlFiles(filePath, files_);
      } else {
          if (file.endsWith('.html')) {
              const name = filePath.replace(resolve(__dirname, 'src') + '/', '').replace('.html', '');
              files_[name] = filePath;
          }
      }
  });

  return files_;
}

export default {
    root: 'src/', // Sources files (typically where index.html is)
    publicDir: '../static/', // Path from "root" to static assets (files that are served as they are)
    server:
    {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true, // Add sourcemap
        rollupOptions: {
          input: getHtmlFiles(resolve(__dirname, 'src')) // 动态获取 HTML 文件
        }
    },
    plugins:
    [
        restart({ restart: [ '../static/**', ] }) // Restart server on static file change
    ],
}