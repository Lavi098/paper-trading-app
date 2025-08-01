import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import uuid from 'react-native-uuid';
import { addPosition } from '../slices/tradeSlice';
import { AppDispatch } from '../store/store';

interface Props {
  visible: boolean;
  onClose: () => void;
  row: {
    strike: number;
    cePrice: number;
    pePrice: number;
  };
  optionType: 'CE' | 'PE';
  symbol: string; // e.g. NIFTY or BANKNIFTY
}

const TradeModal: React.FC<Props> = ({
  visible,
  onClose,
  row,
  optionType,
  symbol,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // Lot size logic
  const lotSize = symbol.toUpperCase() === 'BANKNIFTY' ? 35 : 75;
  const [qty, setQty] = useState(String(lotSize));

  const entry = optionType === 'CE' ? row.cePrice : row.pePrice;

  const placeTrade = (side: 'BUY' | 'SELL') => {
    const qtyNum = Number(qty);

    if (!qtyNum || qtyNum % lotSize !== 0) {
      Alert.alert('Invalid quantity', `Must be multiple of ${lotSize}`);
      return;
    }

    dispatch(
      addPosition({
        id: uuid.v4() as string,
        symbol: `${symbol}${row.strike}${optionType}`,
        strike: row.strike,
        qty: qtyNum,
        type: optionType,
        side,
        entry,
        ltp: entry,
        pnl: 0,
      })
    );

    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>
            {symbol} {row.strike} {optionType}
          </Text>
          <Text style={styles.price}>LTP ₹{entry}</Text>
          <Text style={styles.lotInfo}>Lot size • {lotSize}</Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={qty}
            onChangeText={setQty}
            placeholder="Qty"
          />

          <View style={styles.row}>
            <Button title="BUY" onPress={() => placeTrade('BUY')} />
            <Button title="SELL" onPress={() => placeTrade('SELL')} />
          </View>

          <Button title="Cancel" onPress={onClose} color="#AAA" />
        </View>
      </View>
    </Modal>
  );
};

export default TradeModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0007',
  },
  card: {
    margin: 24,
    padding: 22,
    backgroundColor: '#2C2C2E',
    borderRadius: 14,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  price: {
    color: '#4ADE80',
    fontSize: 16,
    marginBottom: 10,
  },
  lotInfo: {
    color: '#888',
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#3A3A3C',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
});
