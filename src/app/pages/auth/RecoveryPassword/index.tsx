import { AlertColor } from '@mui/material'
import { Formik } from 'formik'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/Auth/context'
import { AlertMessage } from '../../../styles/Alert'
import { Button } from '../../../styles/Button'
import { InputField } from '../../../styles/InputField'

import { Form, Header, Helper } from '../style'
interface ForgotPassword {
  email: string
}
const initialValues: ForgotPassword = {
  email: ''
}

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { recoveryPassword } = useContext(AuthContext)

  const [message, setMessage] = useState<{
    message: string
    type: AlertColor
  }>()

  const onSubmit = async ({ email }: ForgotPassword) => {
    console.log(email)
    const error = await recoveryPassword(email)

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
            <Header>{t('auth.recovery_password')}</Header>
            <Helper>{t('auth.recovery_helper')}</Helper>
            <br></br>
            <InputField
              label={t('auth.email')}
              type="email"
              name="email"
              onChange={handleChange}
              error={errors.email}
              touched={touched.email}
            />

            <Button
              color="primary"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              submit
            >
              {t('auth.send')}
            </Button>
          </Form>
        )}
      </Formik>
      <AlertMessage text={message?.message} type={message?.type} />
    </>
  )
}
