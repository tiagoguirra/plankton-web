import { ThemeProvider } from '@mui/material/styles'
import React from 'react'
import Routes from './app/routes'
import theme from './app/styles/theme'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  )
}

export default App
