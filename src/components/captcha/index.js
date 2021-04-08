import React from "react";
import { Button, Toast } from "antd-mobile";
import { getCaptchaCode } from "../../services/tools";

const Index = (props) => {
  const { className, countDown, disabled, mobile } = props;

  const [count, setCount] = React.useState(countDown || 60);
  const [timing, setTiming] = React.useState(false);

  const onGetCaptcha = React.useCallback(async (mobile) => {
    const result = await getCaptchaCode({
      mobile
    });

    if (result && result.code === "00000") {
      Toast.info("验证码发送成功，请在手机查看。");
    }

    setTiming(true);
  }, []);

  React.useEffect(() => {
    let interval = 0;
    if (timing) {
      interval = window.setInterval(() => {
        setCount((preSecond) => {
          if (preSecond <= 1) {
            setTiming(false);
            clearInterval(interval); // 重置秒数
            return countDown || 60;
          }
          return preSecond - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timing]);

  return (
    <Button
      className={className}
      disabled={timing || disabled}
      onClick={() => {
        onGetCaptcha(mobile);
      }}
    >
      {timing ? `${count} 秒` : "获取验证码"}
    </Button>
  );
};

export default Index;
