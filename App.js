import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navbar from './src/components/Navbar';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    accent: 'black',
    //text: 'black',
    //background: '#F9FBFC',
    //surface: 'blue',
  },
  // dark: true,
};

export default function App() { //TODO show navbar only if logged in
  return (  //TODO staff auth pages
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Navbar />
      </PaperProvider>
    </SafeAreaProvider>
  );
};
