import px2rem from "postcss-px2rem-exclude";
// ref: https://umijs.org/config/
const config = {
  hash: true,
  history: { type: "hash" },
  outputPath: "/build",
  publicPath: "/",
  antd: {},
  dva: {},
  dynamicImport: {
    // loading: <div>11111</div>,
  },
  inlineLimit: 20000,
  metas: [
    {
      "http-equiv": "Pragma",
      content: "no-cache"
    },
    {
      "http-equiv": "Cache-Contro",
      content: "no-cache"
    },
    {
      "http-equiv": "Expires",
      content: "0"
    },
    {
      "name": "viewport",
      content: "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover"
    }
  ],
  title: "antd mobile",
  styles: [],
  headScripts: [
    `
      if(!window.Promise) {
         document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
      }
    `
  ],
  extraPostCSSPlugins: [
    // https://www.npmjs.com/package/postcss-plugin-px2rem
    px2rem({
      remUnit: 75,
      propList: ["*", "!border"],
      exclude: /(node_module)/i
    })
  ],
  targets: {
    android: 5,
    chrome: 49,
    firefox: 64,
    safari: 10,
    ios: 7,
    ie: 9
  },
  routes: [{
    path: "/",
    component: "@/layouts/base/index",
    routes: [
      {
        path: "/user",
        router: [
          {
            name: "登陆",
            path: "/login"
            // component: ""
          }
        ]
      },
      {
        path: "/",
        component: "@/layouts/index",
        // redirect: "/login",
        routes: [
          {
            path: "/",
            component: "@/layouts/base/index",
            routes: [
              {
                path: "/",
                redirect: "/login"
              },
              {
                path: "/login",
                component: "./Login/index"
              },
              {
                path: "/register",
                component: "./Register/index"
              },
              {
                path: "/index",
                component: "./Index/index"
              }
            ]
          }
        ]
      }
    ]
  }],
  theme: {
    "@brand-primary": "#027aff"
  },
  extraBabelPlugins: [
    ["import", {
      libraryName: "antd-mobile",
      style: true
    }]
  ]
};

export default config;
