/*
 * @Author: Joe 1762509314@qq.com
 * @Date: 2024-06-24 15:53:17
 * @LastEditors: Joe 1762509314@qq.com
 * @LastEditTime: 2024-06-24 16:10:17
 * @FilePath: \my-vue3-three\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),Inspect()],
  server:{hmr:true,host:'localhost'}
})
