import React, { useContext, useState } from 'react'
import { Formik } from 'formik'
import { Footer, Form, Header } from './style'
import { InputField } from '../../styles/InputField'
import { Button } from '../../styles/Button'
import { useNavigate } from 'react-router-dom'
import { AlertColor, Link } from '@mui/material'
import { AuthContext } from '../../context/Auth/context'
import { SignUp } from '../../types/auth'
import { AlertMessage } from '../../styles/Alert'

const initialValues: SignUp = {
  email: '',
  password: '',
  name: '',
  confirmPassword: ''
}

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate()
  const { signUp } = useContext(AuthContext)
  const [message, setMessage] = useState<{
    message: string
    type: AlertColor
  }>()

  const onSubmit = async ({ name, email, password }: SignUp) => {
    const error = await signUp(name, email, password)

    if (error) {
      setMessage({
        message: error,
        type: 'error'
      })
    } else {
      navigate('/confirmSignUp')
    }
  }

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Header>Sign Up</Header>
            <InputField
              label="Name"
              type="text"
              name="name"
              onChange={handleChange}
              error={errors.name}
              touched={touched.name}
            />
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

            <InputField
              label="Confirm password"
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
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
      <AlertMessage text={message?.message} type={message?.type} />
      <Footer>
        Already have an account? &nbsp;
        <Link
          onClick={() => navigate('/signIn')}
          color="secondary"
          underline="none"
        >
          Sign In
        </Link>
      </Footer>
    </>
  )
}
