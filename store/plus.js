// store/plus.js
export const state = () => ({
  plusNum: 1
})

export const mutations = {
  plus(state) {
    state.plusNum++
  }
}
