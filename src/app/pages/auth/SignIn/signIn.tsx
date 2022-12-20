import React, { useContext, useState } from 'react'
import { Formik } from 'formik'
import { Footer, Form, Header } from '../style'
import { ForgotLink, ForgotPassword } from './styles'
import { InputField } from '../../../styles/InputField'
import { Button } from '../../../styles/Button'
import { Link, AlertColor } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/Auth/context'
import { SignIn } from '../../../types/auth'
import { AlertMessage } from '../../../styles/Alert'
import { useTranslation } from 'react-i18next'

const initialValues: SignIn = {
  email: '',
  password: ''
}

export const SignInPage: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { signIn } = useContext(AuthContext)
  const [message, setMessage] = useState<{
    message: string
    type: AlertColor
  }>()

  const onSubmit = async (values: SignIn) => {
    const error = await signIn(values.email, values.password)
    if (error) {
      if (error === 'UserNotConfirmedException') {
        navigate('confirm')
      } else {
        setMessage({
          message: t(error),
          type: 'error'
        })
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
              <ForgotLink onClick={() => navigate('/forgot-password')} underline="none">
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

      <AlertMessage text={message?.message} type={message?.type} />
      <Footer>
        {t('auth.dont_rave_account')} &nbsp;
        <Link
          onClick={() => navigate('/signUp')}
          color="secondary"
          underline="none"
        >
          {t('auth.sign_up')}
        </Link>
      </Footer>
    </>
  )
}
