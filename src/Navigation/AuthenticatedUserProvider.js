import React, { useState, createContext } from 'react'

export const AuthenticatedUserContext = createContext({})

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isVerified, setIsVerified] = useState(false)

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser, isVerified, setIsVerified }}>
      {children}
    </AuthenticatedUserContext.Provider>
  )
}