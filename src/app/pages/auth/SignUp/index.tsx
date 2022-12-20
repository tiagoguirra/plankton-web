import React, { useContext, useState } from 'react'
import { Formik } from 'formik'
import { Footer, Form, Header } from '../style'
import { InputField } from '../../../styles/InputField'
import { Button } from '../../../styles/Button'
import { useNavigate } from 'react-router-dom'
import { AlertColor, Link } from '@mui/material'
import { AuthContext } from '../../../context/Auth/context'
import { SignUp } from '../../../types/auth'
import { AlertMessage } from '../../../styles/Alert'
import { useTranslation } from 'react-i18next'

const initialValues: SignUp = {
  email: '',
  password: '',
  name: '',
  confirmPassword: ''
}

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { signUp } = useContext(AuthContext)
  const [message, setMessage] = useState<{
    message: string
    type: AlertColor
  }>()

  const onSubmit = async ({ name, email, password }: SignUp) => {
    const error = await signUp(name, email, password)

    if (error) {
      setMessage({
        message: t(error),
        type: 'error'
      })
    } else {
      navigate('confirm')
    }
  }

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Header>{t('auth.sign_up')}</Header>
            <InputField
              label={t('auth.name')}
              type="text"
              name="name"
              onChange={handleChange}
              error={errors.name}
              touched={touched.name}
            />
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

            <InputField
              label={t('auth.confirm_password')}
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />

            <Button
              color="primary"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              submit
            >
              {t('auth.sign_up')}
            </Button>
          </Form>
        )}
      </Formik>
      <AlertMessage text={message?.message} type={message?.type} />
      <Footer>
        {t('auth.already_have_account')} &nbsp;
        <Link
          onClick={() => navigate('/signIn')}
          color="secondary"
          underline="none"
        >
          {t('auth.sign_in')}
        </Link>
      </Footer>
    </>
  )
}
