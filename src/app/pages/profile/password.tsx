import { Formik } from 'formik'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AlertMessage } from '../../components/Alert'
import { Button } from '../../components/Button'
import { InputField } from '../../components/InputField'
import { AuthContext } from '../../context/Auth/context'
import { Form } from './style'

interface PasswordChange {
  newPassword: string
  oldPassword: string
  confirmPassword: string
}

const initialValues: PasswordChange = {
  newPassword: '',
  oldPassword: '',
  confirmPassword: ''
}

export const TabPassword: React.FC = () => {
  const { changePassword, user } = useContext(AuthContext)
  const { t } = useTranslation()
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async ({ oldPassword, newPassword }: PasswordChange) => {
    if (user?.isFederated) return
    try {
      await changePassword(oldPassword, newPassword)
      setError(null)
    } catch (error) {
      // @ts-expect-error
      setError(error?.message)
    }
  }

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <InputField
              label={t('profile.old_password')}
              type="password"
              name="oldPassword"
              onChange={handleChange}
              error={errors.oldPassword}
              touched={touched.oldPassword}
              disabled={isSubmitting || user?.isFederated}
            />

            <InputField
              label={t('profile.new_password')}
              type="password"
              name="newPassword"
              onChange={handleChange}
              error={errors.newPassword}
              touched={touched.newPassword}
              disabled={isSubmitting || user?.isFederated}
            />

            <InputField
              label={t('profile.confirm_password')}
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              disabled={isSubmitting || user?.isFederated}
            />

            <Button
              color="primary"
              fullWidth
              variant="contained"
              disabled={isSubmitting || user?.isFederated}
              submit
            >
              {t('profile.save')}
            </Button>
          </Form>
        )}
      </Formik>
      <AlertMessage text={t(error || '') || ''} type="error" />
    </>
  )
}
