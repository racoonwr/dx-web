const CommonModel = {
  namespace: "common",
  state: {},
  effects: {
    * getAnyListView({ key, func, list, payload, callback }, { call, put }) {
      const response = yield call(func, payload);
      if (response && response.success) {
        const prevData = response.data && Array.isArray(response.data) ? response.data : [];
        let newData = list || [];
        if (payload.pageNumber * 1 !== 1) {
          newData = newData.concat(prevData);
          yield put({
            type: "setAnyListView",
            payload: {
              key,
              data: newData,
              total: newData.length   //没有分页 直接用length
            }
          });
        } else {
          yield put({
            type: "setAnyListView",
            payload: {
              key,
              data: prevData,
              total: prevData.length  //没有分页 直接用length
            }
          });
        }
        if (callback) {
          callback();
        }
      }
    },
    * clearAnyListView({ key, callback }, { put }) {
      yield put({
        type: "clearSetAnyListView",
        payload: {
          key
        }
      });
      if (callback) {
        callback;
      }
    }
  },
  reducers: {
    setAnyListView(state, { payload }) {
      return {
        ...state,
        [`${payload.key}List`]: payload.data || [],
        [`${payload.key}Total`]: payload.total || 0
      };
    },
    clearSetAnyListView(state, { payload }) {
      return {
        ...state,
        [`${payload.key}List`]: [],
        [`${payload.key}Total`]: 0
      };
    }
  }
};

export default CommonModel;
