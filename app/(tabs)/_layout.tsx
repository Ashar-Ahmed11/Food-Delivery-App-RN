import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import { usePathname } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();
const pathname = usePathname()
  const primaryColor = "#F2994A"
  const tertiaryColor = "#EDEDED"
  const secondaryColor = "#838383"

  console.log(pathname);
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primaryColor,
        tabBarInactiveTintColor:secondaryColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
      
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
          
            borderRadius:20
            
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        
        options={{
        
          tabBarLabel:({focused})=>focused&&<Octicons name="dot-fill" size={12} color={primaryColor} />,
          tabBarIcon: ({ color }) => <Feather name="home" size={28} color={color} />,
        }}
      />
    
      <Tabs.Screen
        name="favourite"
        options={{
         
          tabBarIcon: ({ color }) => <Feather name="heart" size={28} color={color}/>,
          tabBarLabel:({focused})=>focused&&<Octicons name="dot-fill" size={12} color={primaryColor} />
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
         
          tabBarIcon: ({ color }) => <Feather name="shopping-bag" size={28} color={color}/>,
          tabBarLabel:({focused})=>focused&&<Octicons name="dot-fill" size={12} color={primaryColor} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
         
          tabBarIcon: ({ color }) => <Feather name="user" size={28} color={color}/>,
          tabBarLabel:({focused})=>focused&&<Octicons name="dot-fill" size={12} color={primaryColor} />
        }}
      />
    </Tabs>
  );
}
