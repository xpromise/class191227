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
