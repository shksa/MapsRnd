import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Maps from './Maps';
import Chart from './Chart';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={Maps} />
        <Tab.Screen name="Chart" component={Chart} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
