// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ColetasScreen from './screens/ColetasScreen';
import AnaliseScreen from './screens/AnaliseScreen';
import RelatorioScreen from './screens/RelatorioScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Home">
            {props => <HomeScreen {...props} onLogout={() => setIsLoggedIn(false)} />}
          </Tab.Screen>
          <Tab.Screen name="Coletas" component={ColetasScreen} />
          <Tab.Screen name="Análises" component={AnaliseScreen} />
          <Tab.Screen name="Relatórios" component={RelatorioScreen} />
        </Tab.Navigator>
      ) : (
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      )}
    </NavigationContainer>
  );
}
