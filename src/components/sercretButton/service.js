import request from "../../services/request";

/**获取KEY */
export const getSecretKey = () => {
  return new Promise((res) => {
    const publicKey =
      "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANL378k3RiZHWx5AfJqdH9xRNBmD9wGD\n" +
      "2iRe41HdTNF8RUhNnHit5NpMNtGL0NPTSSpPjjI1kJfVorRvaQerUgkCAwEAAQ==";
    return res(publicKey);
  });
};
