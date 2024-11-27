// App.js
import React, { useState } from 'react';
import { Image } from 'react-native';
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
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = require('./assets/home.png');
              } else if (route.name === 'Coletas') {
                iconName = require('./assets/coleta.png');
              } else if (route.name === 'Análises') {
                iconName = require('./assets/analise.png');
              } else if (route.name === 'Relatórios') {
                iconName = require('./assets/relatorio.png');
              }

              // You can return any component that you like here!
              return <Image source={iconName} style={{ width: 20, height: 20 }} />;
            },
          })}
        >
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
