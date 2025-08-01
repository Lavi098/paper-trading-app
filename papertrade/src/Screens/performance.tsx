import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function PerformanceScreen() {
  const closedPositions = useSelector((state: RootState) => state.trades.closedPositions);

  const renderItem = ({ item }: any) => {
    const pnlColor = item.pnl >= 0 ? '#00FF8F' : '#FF3B30';
    return (
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text style={styles.symbol}>{item.symbol}</Text>
          <Text style={[styles.pnl, { color: pnlColor }]}>₹{item.pnl.toFixed(2)}</Text>
        </View>
        <Text style={styles.details}>
          {item.side} {item.qty} @ ₹{item.entry} → Exit @ ₹{item.entry + (item.pnl / item.qty)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Performance History</Text>
      {closedPositions.length === 0 ? (
        <Text style={styles.emptyText}>No closed trades yet.</Text>
      ) : (
        <FlatList
          data={closedPositions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 32,
  },
  card: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  symbol: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  pnl: {
    fontSize: 16,
    fontWeight: '600',
  },
  details: {
    color: '#AAA',
    fontSize: 13,
  },
});

