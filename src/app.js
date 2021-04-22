import "lib-flexible";
import { Toast } from "antd-mobile";
import { history } from "umi";

history.listen((location, action) => {
  console.log('88888888888888888',location, action, history, history.length);

  var l = history.length;
  var hash = location.pathname;

  if(l === 0) {

  }else if (hash === history[l - 2]) {
    // history.pop();
    console.log("left")
  }else {
    console.log("right")
  }
});
// window.addEventListener('popstate', (event) => {
//   console.log("location: " + document.location + ", state: " + event);
// });

Toast.config({
  duration: 1.5,
  mask: false,
});
