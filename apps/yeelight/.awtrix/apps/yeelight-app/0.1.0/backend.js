const { Yeelight } = require('yeelight-node')

module.exports = (BaseClass) => {
  return class extends BaseClass {
    register (router) {
      const light = new Yeelight({ ip: '10.0.0.51', port: 55443 })

      router.get('/toggle', (ctx) => {
        light.toggle()
        ctx.body = 'Du Schlawiner'
      })

      router.get('/status', async (ctx) => {
        const response = await light.get_prop('power')
        const json = JSON.parse(response)

        console.log(json.result[0])
        ctx.body = json.result[0]
      })
    }
  }
}
