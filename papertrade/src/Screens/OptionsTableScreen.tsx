import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import TradeModal from '../Components/TradeModal';


const generateDummyOptions = () => {
  const baseStrike = 22500;
  return Array.from({ length: 10 }).map((_, i) => {
    const strike = baseStrike + i * 50;
    const cePrice = +(Math.random() * 100 + 50).toFixed(2);
    const pePrice = +(Math.random() * 100 + 50).toFixed(2);
    const changeCE = +(Math.random() * 5 - 2.5).toFixed(2);
    const changePE = +(Math.random() * 5 - 2.5).toFixed(2);
    return { strike, cePrice, pePrice, changeCE, changePE };
  });
};

export default function OptionsTableScreen() {
  const selectedIndex = useSelector((state: RootState) => state.market.selectedIndex);
  const [optionsData, setOptionsData] = useState(generateDummyOptions());
  const [modalInfo, setModalInfo] = useState<{
    visible: boolean;
    row: any | null;
    type: 'CE' | 'PE';
  }>({ visible: false, row: null, type: 'CE' });

  useEffect(() => {
    const interval = setInterval(() => {
      setOptionsData(generateDummyOptions());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const openTrade = (row: any, type: 'CE' | 'PE') => {
    setModalInfo({ visible: true, row, type });
  };

  const closeTrade = () => setModalInfo({ ...modalInfo, visible: false });

  const renderOptionRow = ({ item }: { item: typeof optionsData[0] }) => (
    <View style={styles.optionRow}>
      <TouchableOpacity
        style={styles.cellWithChange}
        onPress={() => openTrade(item, 'CE')}
      >
        <Text style={[styles.price, { color: item.changeCE >= 0 ? '#00FF8F' : '#FF3B30' }]}>
          ₹{item.cePrice}
        </Text>
        <Text style={styles.changeText}>
          {item.changeCE >= 0 ? '+' : ''}
          {item.changeCE}%
        </Text>
      </TouchableOpacity>

      <Text style={styles.strike}>{item.strike}</Text>

      <TouchableOpacity
        style={styles.cellWithChange}
        onPress={() => openTrade(item, 'PE')}
      >
        <Text style={[styles.price, { color: item.changePE >= 0 ? '#00FF8F' : '#FF3B30' }]}>
          ₹{item.pePrice}
        </Text>
        <Text style={styles.changeText}>
          {item.changePE >= 0 ? '+' : ''}
          {item.changePE}%
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.header}>{selectedIndex || 'Index'} Options Chain</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeading}>Call LTP</Text>
        <Text style={styles.tableHeading}>Strike</Text>
        <Text style={styles.tableHeading}>Put LTP</Text>
      </View>
      <FlatList
        data={optionsData}
        renderItem={renderOptionRow}
        keyExtractor={(item) => item.strike.toString()}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
      {modalInfo.visible && modalInfo.row && (
        <TradeModal
          visible={modalInfo.visible}
          onClose={closeTrade}
          row={modalInfo.row}
          optionType={modalInfo.type}
          symbol={selectedIndex || 'NIFTY'}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 16,
  },
  header: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  tableHeading: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 12,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  strike: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  cellWithChange: {
    flex: 1,
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
});
