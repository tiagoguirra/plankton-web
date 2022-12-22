import staging from './staging'
import production from './production'
import development from './development'

console.log(process.env.REACT_APP_ENV)

const config: { [env: string]: any } = {
  staging,
  production,
  development
}

const env = process.env.REACT_APP_ENV || 'development'

export default config[env] || development
