import { AlertColor, Link } from '@mui/material'
import { Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/Auth/context'
import { AlertMessage } from '../../../styles/Alert'
import { Button } from '../../../styles/Button'
import { InputField } from '../../../styles/InputField'
import { VerificationCode } from '../../../styles/VerificationCode'
import { Footer, Form, Header } from '../style'

interface RecoveryPassword {
  password: string
  confirmPassword: string
}

const initialValues: RecoveryPassword = {
  password: '',
  confirmPassword: ''
}

export const RecoveryCodePage: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { recoveryUser, recoveryPassword, confirmRecoveryPassword } =
    useContext(AuthContext)
  const [code, setCode] = useState<string>('')

  const [counter, setCounter] = useState<number>(30)

  const [message, setMessage] = useState<{
    message: string
    type: AlertColor
  }>()

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounter(counter > 0 ? counter - 1 : 0)
    }, 1000)
    return () => clearTimeout(timer)
  })

  useEffect(() => {
    console.log(recoveryUser)
    if (!recoveryUser?.email) {
      navigate('/forgot-password')
    }
  }, [])

  const onSubmit = async ({ password }: RecoveryPassword) => {
    const error = await confirmRecoveryPassword(
      recoveryUser?.email || '',
      code,
      password
    )
    if (error) {
      if (error === 'CodeMismatchException') {
        setCode('')
      }
      setMessage({
        message: t(error),
        type: 'error'
      })
    } else {
      navigate('/signIn')
    }
  }

  const resend = async () => {
    const error = await recoveryPassword(recoveryUser?.email || '')
    if (error) {
      setMessage({
        message: t(error),
        type: 'error'
      })
    } else {
      setCode('')
      setMessage(undefined)
      setCounter(30)
    }
  }

  const onChangeCode = (code: string) => {
    setCode(code)
    if (message && code) {
      setMessage(undefined)
    }
  }

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Header>{t('auth.recovery_password')}</Header>
            {code.length < 6 && <VerificationCode value={code} onChange={onChangeCode} />}
            {code.length === 6 && (
              <>
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
              </>
            )}

            <Button
              color="primary"
              fullWidth
              variant="contained"
              disabled={isSubmitting || code.length < 6}
              submit
            >
              {t('auth.recovery_password')}
            </Button>
          </Form>
        )}
      </Formik>

      <AlertMessage text={message?.message} type={message?.type} />
      {code.length < 6 && (
        <Footer>
          {t('auth.dont_receive_code')} &nbsp;
          {counter > 0 ? (
            <>
              {t('auth.resend_code_in')} {counter}
            </>
          ) : (
            <Link onClick={resend} color="secondary" underline="none">
              {t('auth.resend_code')}
            </Link>
          )}
        </Footer>
      )}
    </>
  )
}
