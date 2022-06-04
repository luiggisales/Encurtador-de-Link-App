import React from 'react';
import Home from '../pages/Home';
import MeusLinks from '../pages/MeusLinks';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const navigatorOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: 'transparent' },
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  
  }),
}
const Routes = () => {
  return (
      <Stack.Navigator initialRouteName='Home' screenOptions={navigatorOptions} >
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='MeusLinks' component={MeusLinks}/>
      </Stack.Navigator>
  );
}

export default Routes;