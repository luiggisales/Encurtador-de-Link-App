import 'react-native-gesture-handler';
import Routes from './src/routes';
import { NavigationContainer , DarkTheme } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer children={DarkTheme}>
      <Routes/>
    </NavigationContainer>
  );
};