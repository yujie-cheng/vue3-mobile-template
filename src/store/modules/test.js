const state = {
  testData: '' // 筛选JSON
}
const getters = {
  getTestData (state) {
    return state.testData
  }
}

const mutations = {
  setTestData (state, obj) {
    state.testData = obj
  }
}
const actions = {}
export default {
  state,
  getters,
  mutations,
  actions
}
