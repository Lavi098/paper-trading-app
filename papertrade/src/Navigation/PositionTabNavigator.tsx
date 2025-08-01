import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../Components/AppHeader';
import DiscoverScreen from '../Screens/Discover';
import PositionScreen from '../Screens/position';
import PerformanceScreen from '../Screens/performance';
const renderScene = SceneMap({
  discover: DiscoverScreen,
  position: PositionScreen,
  performance: PerformanceScreen,
});

export default function PositionTabNavigator() {
  const layout = Dimensions.get('window');
  const [index, setIndex] = useState(1); // default to Positions tab
  const [routes] = useState([
    { key: 'discover', title: 'Discover' },
    { key: 'position', title: 'Positions' },
    { key: 'performance', title: 'Performance' },
  ]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1C1C1E' }}  edges={[ 'left', 'right']}>
      <AppHeader />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#007AFF' }}
            style={{ backgroundColor: '#1C1C1E' }}
            // eslint-disable-next-line react-native/no-inline-styles
           //tabStyle={{ color:, fontWeight: '600' }}
          />
        )}
      />
    </SafeAreaView>
  );
}

