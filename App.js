import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Navbar from './components/Navbar';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    accent: 'black',
    //text: 'black',
    //background: 'blue',
    //surface: 'blue',
  },
  // dark: true,
};

export default function App() {
  return (  //TODO staff auth pages
    <PaperProvider theme={theme}>
      <Navbar />
    </PaperProvider>
  );
};
