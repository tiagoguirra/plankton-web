import React, { useContext, useEffect, useState } from 'react'
import { Formik } from 'formik'
import { CodeForm, CodeInput, Footer, Form, Header, Helper } from './style'
import { Button } from '../../styles/Button'
import { AlertColor, Link } from '@mui/material'
import { AuthContext } from '../../context/Auth/context'
import { SignUpConfirm } from '../../types/auth'
import { AlertMessage } from '../../styles/Alert'

export const ConfirmSignUpPage: React.FC = () => {
  const { confirmSignUp, resendSignUp, signUpUser } = useContext(AuthContext)

  const [counter, setCounter] = useState(30)
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

  const onSubmit = async ({ a, b, c, d, e, f }: SignUpConfirm) => {
    const code = `${a}${b}${c}${d}${e}${f}`
    const error = await confirmSignUp(signUpUser?.email || '', code)
    if (error) {
      setMessage({
        message: error,
        type: 'error'
      })
    }
  }

  const resend = async () => {
    const error = await resendSignUp(signUpUser?.email || '')
    if (error) {
      setMessage({
        message: error,
        type: 'error'
      })
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          a: '',
          b: '',
          c: '',
          d: '',
          e: '',
          f: ''
        }}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Header>Confirmation</Header>
            <Helper>
              A confirmation code has ben sent to your {signUpUser?.destination}
              .
            </Helper>

            <CodeForm>
              <CodeInput
                type="text"
                name="a"
                size="small"
                onChange={handleChange}
                autoFocus
              />
              <CodeInput
                type="text"
                name="b"
                size="small"
                onChange={handleChange}
              />
              <CodeInput
                type="text"
                name="c"
                size="small"
                onChange={handleChange}
              />
              <CodeInput
                type="text"
                name="d"
                size="small"
                onChange={handleChange}
              />
              <CodeInput
                type="text"
                name="f"
                size="small"
                onChange={handleChange}
              />
              <CodeInput
                type="text"
                name="g"
                size="small"
                onChange={handleChange}
              />
            </CodeForm>

            <Button
              color="primary"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              submit
            >
              Verify
            </Button>
          </Form>
        )}
      </Formik>
      <AlertMessage text={message?.message} type={message?.type} />
      <Footer>
        Don&#39;t receive code? &nbsp;
        {counter > 0 ? (
          <>Resend in {counter}</>
        ) : (
          <Link onClick={resend} color="secondary" underline="none">
            Resend
          </Link>
        )}
      </Footer>
    </>
  )
}
