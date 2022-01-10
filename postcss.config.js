module.exports = {

  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
    },
  }

}
