import React, { useState, createContext } from 'react'

export const AuthenticatedUserContext = createContext({})

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isVerified, setIsVerified] = useState(false)
  const [account, setAccount] = useState(null)

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser, isVerified, setIsVerified, account, setAccount }}>
      {children}
    </AuthenticatedUserContext.Provider>
  )
}