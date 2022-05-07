import React from 'react'

import { AuthenticatedUserProvider } from './AuthenticatedUserProvider'
import Navigation from './Navigation'

const AppRoutes = () => {
  return (
    <AuthenticatedUserProvider>
      <Navigation />
    </AuthenticatedUserProvider>
  )
}

export default AppRoutes