export default {
  amplify: {
    Auth: {
      region: 'sa-east-1',
      userPoolId: 'sa-east-1_1RMJOWfmm',
      userPoolWebClientId: 'i2tqfa2linpogdnamqbodh1sn',
      authenticationFlowType: 'USER_SRP_AUTH',
      oauth: {
        name: 'Github-staging',
        domain: 'plankton.auth.sa-east-1.amazoncognito.com',
        scope: [
          'phone',
          'email',
          'profile',
          'openid',
          'aws.cognito.signin.user.admin'
        ],
        redirectSignIn: 'https://app-stg.planktondoc.com',
        redirectSignOut: 'https://app-stg.planktondoc.com',
        responseType: 'code'
      }
    }
  }
}
