import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';
const AppHeader = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* Left: Hamburger Menu */}
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Center: Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Trade Lab</Text>
        </View>

        {/* Right: Premium + More */}
        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.premiumButton}>
            <Text style={styles.premiumText}>Activate</Text>
          </TouchableOpacity>
            <Menu>
          <MenuTrigger>
            <MaterialIcon name="more-vert" size={22} color="#fff" />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => navigation.navigate('ResetPortfolio')}>
              <Text style={{ padding: 10 }}>Reset Portfolio</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#1C1C1E',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 10,
  },
  icon: {
    padding: 4,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: -1,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  premiumButton: {
    backgroundColor: '#FFC107',
    borderRadius: 14,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  premiumText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

