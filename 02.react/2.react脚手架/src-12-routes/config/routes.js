/*
  路由表：将来所有路由配置都根据路由表来生成~
*/

import Timeline from "../pages/Timeline";
import Frontend from "../pages/Timeline/components/Frontend";
import Backend from "../pages/Timeline/components/Backend";
import Pins from "../pages/Pins";
import Following from "../pages/Pins/components/Following";
import Hot from "../pages/Pins/components/Hot";
import Books from "../pages/Books";
import Mobile from "../pages/Books/components/Mobile";
import BlockChain from "../pages/Books/components/BlockChain";

const routes = [
  {
    path: "/timeline", // 路由路径
    component: Timeline, // 路由组件
    name: "首页",
    children: [
      // 子路由
      {
        path: "/timeline/frontend", // 路由路径
        component: Frontend, // 路由组件
        name: "前端",
      },
      {
        path: "/timeline/backend", // 路由路径
        component: Backend, // 路由组件
        name: "后端",
      },
    ],
  },
  {
    path: "/pins", // 路由路径
    component: Pins, // 路由组件
    name: "沸点",
    children: [
      {
        path: "/pins/following", // 路由路径
        component: Following, // 路由组件
        name: "关注",
      },
      {
        path: "/pins/hot", // 路由路径
        component: Hot, // 路由组件
        name: "热门",
      },
    ],
  },
  {
    path: "/books", // 路由路径
    component: Books, // 路由组件
    name: "小册",
    children: [
      {
        path: "/books/mobile", // 路由路径
        component: Mobile, // 路由组件
        name: "移动开发",
      },
      {
        path: "/books/blockchain", // 路由路径
        component: BlockChain, // 路由组件
        name: "区块链",
      },
    ],
  },
];

export default routes;
