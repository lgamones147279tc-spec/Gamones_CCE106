import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Counter() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount((previousCount) => previousCount + 1);
  };

  const decrease = () => {
    setCount((previousCount) =>
      previousCount > 0 ? previousCount - 1 : 0
    );
  };

  const clear = () => {
    setCount(0);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>Counter App</Text>
      <Text style={styles.subtitle}>Keep track of your count</Text>

      <View style={styles.counterBox}>
        <Text style={styles.counter}>{count}</Text>
      </View>

      <View style={styles.buttonRow}>
        <Pressable
          style={styles.minusButton}
          onPress={decrease}
        >
          <Text style={styles.buttonText}>−</Text>
        </Pressable>

        <Pressable
          style={styles.plusButton}
          onPress={increase}
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.clearButton}
        onPress={clear}
      >
        <Text style={styles.clearText}>Reset Counter</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#F4F7FB',
  },

  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
  },

  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 5,
    marginBottom: 30,
  },

  counterBox: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    marginBottom: 35,
  },

  counter: {
    fontSize: 65,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 25,
  },

  plusButton: {
    width: 75,
    height: 75,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    elevation: 4,
  },

  minusButton: {
    width: 75,
    height: 75,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#475569',
    elevation: 4,
  },

  buttonText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  clearButton: {
    width: 170,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },

  clearText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
  },
});