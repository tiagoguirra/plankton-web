import test from './staging'
import production from './production'
import development from './development'

console.log(process.env.NODE_ENV)

const config = {
  test,
  production,
  development
}
export default config[process.env.NODE_ENV]
