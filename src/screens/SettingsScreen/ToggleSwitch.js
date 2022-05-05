import { useState } from 'react'
import { Switch } from 'react-native-paper';

export default function ToggleSwitch(activeState) {
  const [isSwitchOn, setIsSwitchOn] = useState(activeState);

  const onToggleSwitch = () => setIsSwitchOn(value => !value);

  return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
};
