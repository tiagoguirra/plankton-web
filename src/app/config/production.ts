export default {
  amplify: {
    Auth: {
      region: 'sa-east-1',
      userPoolId: 'sa-east-1_1RMJOWfmm',
      oauth: {
        domain: 'plankton.auth.sa-east-1.amazoncognito.com',
        scope: [
          'phone',
          'email',
          'profile',
          'openid',
          'aws.cognito.signin.user.admin'
        ],
        redirectSignIn: 'http://localhost:3000/',
        redirectSignOut: 'http://localhost:3000/',
        clientId: 'i2tqfa2linpogdnamqbodh1sn',
        responseType: 'code'
      }
    }
  }
}
