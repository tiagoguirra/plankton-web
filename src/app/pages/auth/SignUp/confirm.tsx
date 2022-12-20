import React, { useContext, useEffect, useState } from 'react'
import { Footer } from '../style'
import { Button } from '../../../styles/Button'
import { AlertColor, Link } from '@mui/material'
import { AuthContext } from '../../../context/Auth/context'
import { AlertMessage } from '../../../styles/Alert'
import { VerificationCode } from '../../../styles/VerificationCode'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const ConfirmSignUpPage: React.FC = () => {
  const { confirmSignUp, resendSignUp, signUpUser } = useContext(AuthContext)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [counter, setCounter] = useState<number>(30)
  const [code, setCode] = useState<string>('')

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
    console.log('ConfirmPage')
    if (!signUpUser?.email) {
      navigate('/signIn')
    }
  }, [])

  const onSubmit = async (code: string) => {
    const error = await confirmSignUp(signUpUser?.email || '', code)
    if (error) {
      setCode('')
      setMessage({
        message: t(error),
        type: 'error'
      })
    } else {
      navigate('/signIn')
    }
  }

  const onChange = (code: string) => {
    console.log(code)
    setCode(code)
    if (code.length === 6) {
      onSubmit(code)
    }
  }

  const resend = async () => {
    const error = await resendSignUp(signUpUser?.email || '')
    if (error) {
      setCode('')
      setMessage({
        message: t(error),
        type: 'error'
      })
    } else {
      setCounter(30)
    }
  }

  return (
    <>
      <VerificationCode value={code} onChange={onChange} />
      <Button
        color="primary"
        fullWidth
        variant="contained"
        disabled={!code || code.length < 6}
        onClick={() => onSubmit(code)}
      >
        {t('auth.verify')}
      </Button>
      <AlertMessage text={message?.message} type={message?.type} />
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
    </>
  )
}
