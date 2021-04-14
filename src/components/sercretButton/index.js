import React from "react";
import { Button } from "antd-mobile";
import { JSEncrypt } from "jsencrypt";
import { useRequest } from "ahooks";
import { getSecretKey } from "./service";

const encrypt = new JSEncrypt();

export default (props) => {
  const { onClick, loading } = props;

  const { run: getSecretKeyRun, loading: getSecretKeyLoading } = useRequest(
    getSecretKey,
    {
      manual: true,
    }
  );

  const handleSercetNext = React.useCallback(() => {
    getSecretKeyRun().then((res) => {
      encrypt.setPublicKey(res);
      if (onClick) {
        onClick(encrypt);
      }
    });
  }, [onClick]);

  return (
    <Button
      {...props}
      loading={loading || getSecretKeyLoading}
      onClick={handleSercetNext}
    />
  );
};
