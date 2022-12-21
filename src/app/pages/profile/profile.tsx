import { Formik } from 'formik'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AlertMessage } from '../../components/Alert'
import { Button } from '../../components/Button'
import { InputField } from '../../components/InputField'
import { AuthContext } from '../../context/Auth/context'
import { Form } from './style'

interface ProfileUser {
  name: string
  email: string
}

export const TabProfile: React.FC = () => {
  const { user, changeProfile } = useContext(AuthContext)
  const { t } = useTranslation()
  const [error, setError] = useState<string | null>(null)

  const initialValues: ProfileUser = {
    name: user?.name || '',
    email: user?.email || ''
  }

  const onSubmit = async ({ name, email }: ProfileUser) => {
    if (user?.isFederated) return
    try {
      await changeProfile(name, email)
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
              label={t('profile.name')}
              type="text"
              name="name"
              onChange={handleChange}
              defaultValue={initialValues.name}
              error={errors.name}
              touched={touched.name}
              disabled={isSubmitting || user?.isFederated}
            />
            <InputField
              label={t('profile.email')}
              type="email"
              name="email"
              onChange={handleChange}
              error={errors.email}
              touched={touched.email}
              defaultValue={initialValues.email}
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
