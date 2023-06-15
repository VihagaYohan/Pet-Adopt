import React, { useEffect } from "react";
import {
  createDrawerNavigator,
  useDrawerProgress,
  DrawerContentScrollView,
  DrawerItemList,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { View, Image, Text, StatusBar } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import HomeScreen from "../screens/HomeScreen";
import COLORS from "../../const/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView style={{ paddingVertical: 30 }}>
      <View style={{ marginLeft: 20, marginVertical: 40 }}>
        <Image
          source={require("../../assets/person.jpg")}
          style={{ width: 70, height: 70, borderRadius: 20 }}
        />

        <Text
          style={{
            color: COLORS.white,
            fontWeight: "bold",
            fontSize: 13,
            marginTop: 10,
          }}
        >
          JANE DOE
        </Text>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const DrawerScreenContainer = ({ children }) => {
  /* const progress = useDrawerProgress();
  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  }); */

  const isDrawerOpen = useDrawerStatus();
  const progress = useSharedValue(0);

  useEffect(() => {
    if (isDrawerOpen == "open") {
      progress.value = withTiming(1);
    } else {
      progress.value = withTiming(0);
    }
  }, [isDrawerOpen]);

  const rContainerStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [1, 0.8]);
    const borderRadius = interpolate(progress.value, [0, 1], [0, 25]);

    return {
      transform: [{ scale }],
      borderRadius: borderRadius,
      overflow: "hidden",
    };
  });

  console.log(`progress : ${isDrawerOpen}`);

  return (
    <Animated.View
      style={[
        {
          backgroundColor: COLORS.white,
          flex: 1,
        },
        rContainerStyle,
      ]}
    >
      <StatusBar
        barStyle={isDrawerOpen == "open" ? "light-content" : "dark-content"}
        backgroundColor={isDrawerOpen == "open" ? COLORS.primary : COLORS.grey}
      />
      {children}
    </Animated.View>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        drawerStyle: {
          width: 200,
          backgroundColor: COLORS.primary,
        },
        overlayColor: null,
        sceneContainerStyle: {
          backgroundColor: COLORS.primary,
        },
        drawerActiveTintColor: COLORS.white,
        drawerInactiveTintColor: COLORS.secondary,
        drawerItemStyle: {
          backgroundColor: null,
        },
        drawerLabelStyle: {
          fontWeight: "bold",
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        options={{
          title: "ADOPTION",
          drawerIcon: ({ color }) => (
            <Icon name="paw" size={25} style={{ marginRight: -20, color }} />
          ),
        }}
      >
        {(props) => (
          <DrawerScreenContainer>
            <HomeScreen {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="DONATION"
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="gift" size={25} style={{ marginRight: -20, color }} />
          ),
        }}
      >
        {(props) => (
          <DrawerScreenContainer>
            <HomeScreen {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="ADD PET"
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              name="plus-box"
              size={25}
              style={{ marginRight: -20, color }}
            />
          ),
        }}
      >
        {(props) => (
          <DrawerScreenContainer>
            <HomeScreen {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="FAVOURITES"
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="heart" size={25} style={{ marginRight: -20, color }} />
          ),
        }}
      >
        {(props) => (
          <DrawerScreenContainer>
            <HomeScreen {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="PROFILE"
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              name="account"
              size={25}
              style={{ marginRight: -20, color }}
            />
          ),
        }}
      >
        {(props) => (
          <DrawerScreenContainer>
            <HomeScreen {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
