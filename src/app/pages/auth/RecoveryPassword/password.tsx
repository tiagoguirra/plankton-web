import { AlertColor } from '@mui/material'
import { Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/Auth/context'
import { AlertMessage } from '../../../styles/Alert'
import { Button } from '../../../styles/Button'
import { InputField } from '../../../styles/InputField'
import { Form, Header } from '../style'

interface RecoveryPassword {
  password: string
  confirmPassword: string
}

const initialValues: RecoveryPassword = {
  password: '',
  confirmPassword: ''
}

export const RecoveryPasswordPage: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { recoveryUser, confirmRecoveryPassword } = useContext(AuthContext)

  const [message, setMessage] = useState<{
    message: string
    type: AlertColor
  }>()

  useEffect(() => {
    console.log(recoveryUser)
    if (!recoveryUser?.email) {
      return navigate('/forgot-password')
    }
    if (!recoveryUser?.code) {
      navigate('/forgot-password/confirm')
    }
  }, [])

  const onSubmit = async ({ password, confirmPassword }: RecoveryPassword) => {
    if (password !== confirmPassword) {
      setMessage({
        message: t('auth.password_not_match'),
        type: 'error'
      })
      return
    }

    const error = await confirmRecoveryPassword(
      recoveryUser?.email || '',
      recoveryUser?.code || '',
      password
    )

    if (error) {
      setMessage({
        message: t(error),
        type: 'error'
      })
    } else {
      navigate('/signIn')
    }
  }

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Header>{t('auth.recovery_password')}</Header>
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
              {t('auth.recovery_password')}
            </Button>
          </Form>
        )}
      </Formik>
      <AlertMessage text={message?.message} type={message?.type} />
    </>
  )
}
