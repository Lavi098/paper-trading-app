import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { closePosition } from '../slices/tradeSlice';

export default function PositionScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { availableMargin } = useSelector((state: RootState) => state.user);
  const openPositions = useSelector((state: RootState) => state.trades.openPositions);

  const unrealised = openPositions.reduce((sum, pos) => sum + pos.pnl, 0);
  const invested = openPositions.reduce((sum, pos) => sum + pos.entry * pos.qty, 0);

  const renderPosition = ({ item }: { item: typeof openPositions[0] }) => (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.symbol}>{item.symbol}</Text>
        <Text style={[styles.pnl, { color: item.pnl >= 0 ? '#00FF8F' : '#FF3B30' }]}>
          ₹{item.pnl.toFixed(2)}
        </Text>
      </View>
      <Text style={styles.details}>
        Qty: {item.qty} | Entry: ₹{item.entry} | LTP: ₹{item.ltp}
      </Text>
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => dispatch(closePosition(item.id, item.ltp))}
      >
        <Text style={styles.closeTxt}>CLOSE POSITION</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.summaryCard}>
        <Text style={styles.label}>
          Available Margin: ₹{availableMargin.toLocaleString('en-IN')}
        </Text>
        <Text style={styles.label}>
          Invested Margin: ₹{invested.toLocaleString('en-IN')}
        </Text>
        <Text
          style={[
            styles.label,
            { color: unrealised >= 0 ? '#00FF8F' : '#FF3B30' },
          ]}
        >
          Unrealised P&L: ₹{unrealised.toFixed(2)}
        </Text>
      </View>

      {openPositions.length === 0 ? (
        <Text style={styles.emptyText}>No open positions</Text>
      ) : (
        <FlatList
          data={openPositions}
          keyExtractor={(item) => item.id}
          renderItem={renderPosition}
          contentContainerStyle={{ paddingBottom: 80 }}
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
  summaryCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  label: {
    color: '#ddd',
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  emptyText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
  card: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  symbol: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  pnl: {
    fontWeight: '600',
    fontSize: 16,
  },
  details: {
    color: '#bbb',
    fontSize: 12,
    marginBottom: 10,
  },
  closeBtn: {
    backgroundColor: '#FF453A',
    paddingVertical: 8,
    borderRadius: 8,
  },
  closeTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 13,
  },
});
