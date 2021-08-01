import { regs, replaceSpace } from "../../../utils/tools";

export const FORMA = [
  {
    label: "企业ID",
    name: "id",
    rules: [
      {
        required: true,
      }
    ],
  },
  {
    label: "企业名称",
    placeholder: "请输入企业名称",
    name: "name",
    rules: [
      {
        required: true,
        whitespace: true,
        message: "企业名称不能为空"
      }
    ]
  },
  {
    label: "统一社会代码",
    placeholder: "请输入统一社会代码",
    name: "uscc",
    rules: [
      {
        required: false,
        whitespace: true,
        message: "统一社会代码不能为空"
      }
    ]
  },
  {
    label: "单位地址",
    placeholder: "请输入单位地址",
    name: "registerAddress",
    rules: [
      {
        required: false,
        whitespace: true,
        message: "单位地址不能为空"
      }
    ]
  },
  {
    label: "开户银行",
    placeholder: "请输入开户银行",
    name: "bank",
    rules: [
      {
        required: false,
        whitespace: true,
        message: "开户银行不能为空"
      }
    ]
  },
  {
    label: "银行账号",
    placeholder: "请输入银行账号",
    name: "accountNumber",
    type: "bankCard",
    rules: [
      {
        required: false,
        whitespace: true,
        message: "银行账号不能为空"
      }
    ]
  },
  {
    label: "电话号码",
    placeholder: "请输入电话号码",
    name: "phone",
    type: "phone",
    rules: [
      {
        required: false,
        whitespace: true,
        message: "电话号码不能为空"
      },
      {
        transform: replaceSpace,
        pattern: regs.mobile,
        message: "请输入正确的电话号码"
      }
    ]
  }
];
export const FORMB = [
  {
    label: "电子邮箱",
    placeholder: "请输入电子邮箱",
    name: "email",
    rules: [
      {
        required: false,
        message: "电子邮箱不能为空"
      },
      {
        type: "email",
        message: "请输入正确的电子邮箱"
      }
    ]
  },
  {
    label: "收件地址",
    placeholder: "请输入收件地址",
    name: "mailAddress",
    rules: [
      {
        required: false,
        whitespace: true,
        message: "收件地址不能为空"
      }
    ]
  },
  {
    label: "联系人",
    placeholder: "请输入联系人姓名",
    name: "contacts",
    rules: [
      {
        required: false,
        whitespace: true,
        message: "联系人姓名不能为空"
      }
    ]
  },
  {
    label: "联系电话",
    placeholder: "请输入联系电话",
    name: "contactsPhone",
    type: "phone",
    rules: [
      {
        required: false,
        whitespace: true,
        message: "联系电话不能为空"
      },
      {
        transform: replaceSpace,
        pattern: regs.mobile,
        message: "请输入正确的联系电话"
      }
    ]
  }
];
