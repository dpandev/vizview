import React, { useState } from 'react'
import { Switch } from 'react-native-paper'

const ToggleSwitch = (activeState) => {
  const [isSwitchOn, setIsSwitchOn] = useState(activeState)

  const onToggleSwitch = () => setIsSwitchOn(value => !value)

  return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
}

export default ToggleSwitch