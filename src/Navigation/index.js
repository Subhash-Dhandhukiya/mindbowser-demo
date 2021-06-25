import * as React from 'react'
import { Text, View, StyleSheet, ColorPropType } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import { color } from '../Constant'
import { DetailsScreen, FavoriteScreen, HomeScreen, SearchScreen, SplashScreen } from '../Container'
import { SEARCH, HOME, FAVORITE, SPLASH, MAINSCREEN, DETAILS } from '../Constant/Route'

import { HomeIcon, FavoriteIcon, SearchIcon } from '../Constant/Icon'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const tabBarOptions = {
    showLabel: true,
    activeTintColor: color.BLUE,
    inactiveTintColor: color.ICON,
    keyboardHidesTabBar: true,
    style: {
        position: 'relative'
    }
}

const tabBarListeners = ({ navigation, route }) => ({
    tabPress: () => navigation.navigate(route.name),
});

//Home Tab
function HomeTab() {
    return (
        <Tab.Navigator
            initialRouteName={HomeScreen}
            tabBarOptions={tabBarOptions}
        >
            <Tab.Screen
                name={HOME}
                component={HomeScreen}
                listeners={tabBarListeners}
                options={{
                    tabBarIcon:({color})=>(
                        <HomeIcon
                            fill={color}
                            height={25}
                            width={25}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name={SEARCH}
                component={SearchScreen}
                listeners={tabBarListeners}
                options={{
                    tabBarIcon:({color})=>(
                        <SearchIcon
                            fill={color}
                            height={25}
                            width={25}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name={FAVORITE}
                component={FavoriteScreen}
                listeners={tabBarListeners}
                options={{
                    tabBarIcon:({color})=>(
                        <FavoriteIcon
                            fill={color}
                            height={25}
                            width={25}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

//Root of Navigation
const NavContainer = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={MAINSCREEN}
                    component={HomeTab}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name={DETAILS}
                    component={DetailsScreen}
                    options={{ headerShown: false }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default NavContainer;

