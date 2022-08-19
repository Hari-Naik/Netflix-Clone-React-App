import React from 'react'

const Context = React.createContext({
  username: '',
  password: '',
  onChangeUsername: () => {},
  onChangePassword: () => {},
})

export default Context
