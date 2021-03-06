import px2rem from "postcss-px2rem-exclude";

const config = {
  hash: true,
  history: { type: "hash" },
  outputPath: "/build",
  publicPath: "/",
  antd: {},
  dva: {},
  dynamicImport: {
    loading: "@/components/loading",
  },
  inlineLimit: 20000,
  metas: [
    {
      "http-equiv": "Pragma",
      content: "no-cache",
    },
    {
      "http-equiv": "Cache-Contro",
      content: "no-cache",
    },
    {
      "http-equiv": "Expires",
      content: "0",
    },
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover",
    },
  ],
  title: " ",
  headScripts: [
    "//wechatfe.github.io/vconsole/lib/vconsole.min.js?v=3.4.0",
    `
      if(!window.Promise) {
         document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
      }
      var vConsole = new VConsole();
    `,
  ],
  extraPostCSSPlugins: [
    // https://www.npmjs.com/package/postcss-plugin-px2rem
    px2rem({
      remUnit: 75,
      propList: ["*", "!border"],
      exclude: /(node_module)/i,
    }),
  ],
  targets: {
    android: 5,
    chrome: 49,
    firefox: 64,
    safari: 10,
    ios: 7,
    ie: 9,
  },
  routes: [
    {
      path: "/",
      component: "@/layouts/index",
      routes: [
        {
          path: "/login",
          title: "登录",
          component: "./Login/index",
        },
        {
          path: "/register",
          title: "注册",
          component: "./Register/index",
        },
        {
          component: "@/layouts/security",
          routes: [
            {
              routes: [
                {
                  component: "@/layouts/base/index",
                  routes: [
                    {
                      path: "/",
                      redirect: "/index",
                    },
                    {
                      path: "/index",
                      title: "管理后台",
                      component: "./Index/index",
                    },
                    {
                      path: "/enterprise",
                      component: "./Enterprise/index",
                    },
                    {
                      path: "/enterprise/add",
                      title: "新增企业",
                      component: "./Enterprise/Operate/index",
                    },
                    {
                      path: "/enterprise/detail",
                      component: "./Enterprise/Operate/index",
                    },
                    {
                      path: "/deal",
                      component: "./Deal/index",
                    },
                    {
                      path: "/deal/add",
                      component: "./Deal/Add/index",
                    },
                    {
                      path: "/deal/detail",
                      component: "./Deal/Detail/index",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  theme: {
    "@brand-primary": "#027aff",
    "@brand-primary-tap": "#0e80d2",
  },
  extraBabelPlugins: [
    [
      "import",
      {
        libraryName: "antd-mobile",
        style: true,
      },
    ],
  ],
};

export default config;
