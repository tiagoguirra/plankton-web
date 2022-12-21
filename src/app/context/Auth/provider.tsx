import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthUser } from '../../types/auth'
import { AuthContext } from './context'
import { Amplify, Auth, Hub } from 'aws-amplify'
import config from '../../config'
import { SignUpProcess } from '../../types/auth'

Amplify.configure(config.amplify)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [signUpUser, setSignUpUser] = useState<SignUpProcess>()
  const [recoveryUser, setRecoveryUser] = useState<SignUpProcess>()
  const [user, setUser] = useState<AuthUser | null>()
  const [error, setError] = useState<string | null>()
  const [loading, setLoading] = useState<boolean>(true)

  const signOut = useCallback(async (): Promise<void> => {
    try {
      await Auth.signOut()
      setUser(null)
      setError(null)
    } catch (err) {
      // @ts-expect-error
      const code = err?.code
      setError(code)
      throw new Error(code)
    }
  }, [user])

  const signIn = useCallback(
    async (username: string, password: string): Promise<void> => {
      try {
        const { signInUserSession } = await Auth.signIn(username, password)
        const { accessToken } = signInUserSession

        setUser({
          name: accessToken.payload.name,
          email: accessToken.payload.email,
          avatar: accessToken.payload?.picture,
          isFederated: false
        })
        setError(null)
      } catch (err) {
        // @ts-expect-error
        const code = err?.code
        setError(code)
        throw new Error(code)
      }
    },
    []
  )

  const signUp = useCallback(
    async (name: string, email: string, password: string): Promise<void> => {
      try {
        const { codeDeliveryDetails } = await Auth.signUp({
          username: email,
          password,
          attributes: {
            email,
            name
          }
        })
        console.log(codeDeliveryDetails)

        setSignUpUser({
          email,
          destination: codeDeliveryDetails.Destination
        })
        setError(null)
      } catch (err) {
        // @ts-expect-error
        const code = err?.code
        setError(code)
        throw new Error(code)
      }
    },
    []
  )

  const confirmSignUp = useCallback(
    async (email: string, code: string): Promise<void> => {
      try {
        await Auth.confirmSignUp(email, code)
        setError(null)
      } catch (err) {
        // @ts-expect-error
        const code = err?.code
        setError(code)
        throw new Error(code)
      }
    },
    []
  )

  const resendSignUp = useCallback(async (email: string): Promise<void> => {
    try {
      const { codeDeliveryDetails } = await Auth.resendSignUp(email)
      setSignUpUser({
        email,
        destination: codeDeliveryDetails.Destination
      })
      setError(null)
    } catch (err) {
      // @ts-expect-error
      const code = err?.code
      setError(code)
      throw new Error(code)
    }
  }, [])

  const recoveryPassword = useCallback(
    async (email: string): Promise<void> => {
      try {
        const { CodeDeliveryDetails } = await Auth.forgotPassword(email)

        setRecoveryUser({
          email,
          destination: CodeDeliveryDetails.Destination
        })
        setError(null)
      } catch (err) {
        // @ts-expect-error
        const code = err?.code
        setError(code)
        throw new Error(code)
      }
    },
    [recoveryUser]
  )

  const confirmRecoveryPassword = useCallback(
    async (email: string, code: string, password: string): Promise<void> => {
      try {
        await Auth.forgotPasswordSubmit(email, code, password)
        setError(null)
      } catch (err) {
        // @ts-expect-error
        const code = err?.code
        setError(code)
        throw new Error(code)
      }
    },
    []
  )

  const setRecovery = useCallback(
    (user: SignUpProcess) => setRecoveryUser({ ...recoveryUser, ...user }),
    [recoveryUser]
  )
  const checkUser = useCallback(async (): Promise<void> => {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser()

      setUser({
        name: attributes.name,
        email: attributes.email,
        avatar: attributes.picture,
        isFederated: !!attributes.identities
      })
      setLoading(false)
    } catch {
      setUser(null)
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    checkUser()
    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      const { event, data } = payload
      switch (event) {
        case 'cognitoHostedUI':
          return checkUser()
        case 'cognitoHostedUI_failure':
          setError(`cognitoHostedUI_failure_${data?.message || ''}`)
          break
        default:
          console.log(event, data)
          break
      }
    })

    return unsubscribe
  }, [])

  const signInWith = useCallback(async (provider: string): Promise<void> => {
    try {
      console.log(provider)
      const response = await Auth.federatedSignIn({ customProvider: provider })
      console.log(response)
    } catch (err) {
      // @ts-expect-error
      const code = err?.code
      setError(code)
      throw new Error(code)
    }
  }, [])

  const changePassword = useCallback(
    async (oldPassword: string, newPassword: string): Promise<void> => {
      try {
        const user = await Auth.currentAuthenticatedUser()
        await Auth.changePassword(user, oldPassword, newPassword)
      } catch (err) {
        // @ts-expect-error
        const code = err?.code
        throw new Error(code)
      }
    },
    [user]
  )

  const changeProfile = useCallback(
    async (name: string, email: string) => {
      try {
        const user = await Auth.currentAuthenticatedUser()
        await Auth.updateUserAttributes(user, {
          name,
          email
        })
        await checkUser()
      } catch (err) {
        // @ts-expect-error
        const code = err?.code
        throw new Error(code)
      }
    },
    [user]
  )

  const providerState = useMemo(
    () => ({
      loading,
      error,
      user,
      signUpUser,
      recoveryUser,
      setRecovery,
      signIn,
      signUp,
      signOut,
      confirmSignUp,
      resendSignUp,
      recoveryPassword,
      confirmRecoveryPassword,
      signInWith,
      changePassword,
      changeProfile
    }),
    [user, signUpUser, recoveryUser, loading]
  )

  return (
    <AuthContext.Provider value={providerState}>
      {children}
    </AuthContext.Provider>
  )
}
