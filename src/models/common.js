const CommonModel = {
  namespace: "common",
  state: {},
  effects: {
    *getAnyListView({ key, func, list, payload, callback }, { call, put }) {
      const response = yield call(func, payload);
      if (response && response.success) {
        let newData = list || [];
        if (payload.pageNumber * 1 !== 1) {
          newData = newData.concat(response.data.data);
          yield put({
            type: "setAnyListView",
            payload: {
              key,
              data: newData,
              total: response.data.total,
            },
          });
        } else {
          yield put({
            key,
            type: "setAnyListView",
            payload: response.data,
          });
        }
        if (callback) callback();
      }
    },
    *clearAnyListView({ callback }, { put }) {
      yield put({
        type: "clearAnyListView",
      });
      if (callback) callback;
    },
  },
  reducers: {
    setAnyListView(state, { payload }) {
      return {
        ...state,
        [`${payload.key}List`]: payload.data || [],
        [`${payload.key}Total`]: payload.total,
      };
    },
    clearAnyListView(state) {
      return {
        ...state,
        [`${payload.key}List`]: [],
        [`${payload.key}Total`]: 0,
      };
    },
  },
};

export default CommonModel;
