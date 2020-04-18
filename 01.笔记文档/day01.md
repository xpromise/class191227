# day01

## Git

1. 本地有仓库，远程没有，怎么办？

- 一般 git 仓库都有忽略文件 .gitignore

  - 忽略一些文件，不进行 git 的版本控制

- 进行本地仓库的版本控制
  - git init 初始化 git 仓库
  - git add . 添加到暂存区
  - git commit -m 'xxx' 添加到版本区
  - 注释规范
    - feat 特性：新增功能
    - docs 文档：新增文档
    - fix 修复 Bug
- 创建远程仓库
- 将本地仓库和远程仓库关联起来
  - git remote add origin git@github.com:xpromise/class191227.git
- 本地仓库将代码推送到远程仓库去
  - git push origin master

2. 将来去公司，公司有远程仓库，拉取本地进行开发

- 第一次需要克隆代码
  - git clone git@github.com:xpromise/class191227.git
- 远程仓库更新代码
  - git pull origin master

## 库、框架和插件

1. 库

- 封装好特定功能代码的集合体（特定功能集合体）

2. 框架

- 基于自身特点提供一套较完整的解决方案

3. 插件

- 基于某个库/框架的库

## 渐进式

- 从底向上增量开发模式
- 比如
  - 我只需要开发一个简单静态页面，此时只要 Vue 框架即可
  - 要开发动态页面（页面中包含与后台交互的动态数据），此时使用 axios 发送请求~
  - 将来开发更加复杂功能，引入其他库或者插件 vue-router vuex 等

## 如何提问

1. 描述你的问题
2. 截图（截全）或代码（做了什么操作）
3. 预期结果是什么
4. 实际结果是什么

注意：提问前把你描述的问题百度一下，看有没有答案

## 常用学习网址

- 文章

  1. https://juejin.im/timeline
  2. https://segmentfault.com/
  3. https://www.yuque.com/explore/headlines
  4. https://www.infoq.cn/topic/Front-end

- 遇到 Bug 找解决方案
  - 百度/谷歌
  - Github 中 issues
  - https://stackoverflow.com/
