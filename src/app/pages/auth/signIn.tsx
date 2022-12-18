import React, { useContext, useState } from 'react'
import { Formik } from 'formik'
import { Footer, Form, Header } from './style'
import { InputField } from '../../styles/InputField'
import { Button } from '../../styles/Button'
import { Link, AlertColor } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/Auth/context'
import { SignIn } from '../../types/auth'
import { AlertMessage } from '../../styles/Alert'

const initialValues: SignIn = {
  email: '',
  password: ''
}

export const SignInPage: React.FC = () => {
  const navigate = useNavigate()
  const { signIn } = useContext(AuthContext)
  const [message, setMessage] = useState<{
    message: string
    type: AlertColor
  }>()

  const onSubmit = async (values: SignIn) => {
    const error = await signIn(values.email, values.password)
    if (error) {
      if (error === 'UserNotConfirmedException') {
        navigate('/confirmSignUp')
      } else {
        setMessage({
          message: error,
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
            <Header>Sign In</Header>
            <InputField
              label="E-mail"
              type="email"
              name="email"
              onChange={handleChange}
              error={errors.email}
              touched={touched.email}
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
              error={errors.password}
              touched={touched.password}
            />

            <Button
              color="primary"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              submit
            >
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
      <AlertMessage text={message?.message} type={message?.type} />
      <Footer>
        Don&#39;t have an account? &nbsp;
        <Link
          onClick={() => navigate('/signUp')}
          color="secondary"
          underline="none"
        >
          Sign Up
        </Link>
      </Footer>
    </>
  )
}
