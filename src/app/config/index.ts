import staging from './staging'
import production from './production'

console.log(process.env.NODE_ENV)
export default process.env.NODE_ENV === 'production' ? production : staging
