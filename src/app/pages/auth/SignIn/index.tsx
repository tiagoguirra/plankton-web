import React, { useContext } from 'react'
import { Formik } from 'formik'
import { Footer, Form, Header } from '../style'
import { ForgotLink, ForgotPassword } from './styles'
import { InputField } from '../../../components/InputField'
import { Button } from '../../../components/Button'
import { Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/Auth/context'
import { SignIn } from '../../../types/auth'
import { useTranslation } from 'react-i18next'

const initialValues: SignIn = {
  email: '',
  password: ''
}

export const SignInPage: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { signIn, resendSignUp } = useContext(AuthContext)

  const onSubmit = async (values: SignIn) => {
    try {
      await signIn(values.email, values.password)
    } catch (error) {
      // @ts-expect-error
      if (error?.message === 'UserNotConfirmedException') {
        await resendSignUp(values.email)
        navigate('confirm')
      }
    }
  }

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Header>{t('auth.sign_in')}</Header>
            <InputField
              label={t('auth.email')}
              type="email"
              name="email"
              onChange={handleChange}
              error={errors.email}
              touched={touched.email}
            />

            <InputField
              label={t('auth.password')}
              type="password"
              name="password"
              onChange={handleChange}
              error={errors.password}
              touched={touched.password}
            />
            <ForgotPassword>
              <ForgotLink
                onClick={() => navigate('/forgot-password')}
                underline="none"
              >
                {t('auth.forgot_password')}
              </ForgotLink>
            </ForgotPassword>

            <Button
              color="primary"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              submit
            >
              {t('auth.sign_in')}
            </Button>
          </Form>
        )}
      </Formik>

      <Footer>
        {t('auth.dont_rave_account')} &nbsp;
        <Link
          onClick={() => navigate('/auth/sign-up')}
          color="secondary"
          underline="none"
        >
          {t('auth.sign_up')}
        </Link>
      </Footer>
    </>
  )
}
