import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { colors } from './src/utils/colors';
import { Focus } from './src/features/Focus';
import { Timer } from './src/features/Timer';
import { FocusHistory } from './src/features/FocusHistory';
import { useKeepAwake } from 'expo-keep-awake';

export default function App() {
  useKeepAwake();
  const [currentSubject, setCurrentSubject] = useState();
  const [history, setHistory] = useState([]);

  const onTimerEnd = (subject) => {
    setHistory([...history, subject]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!currentSubject ? (
        <>
          <Focus addSubject={setCurrentSubject} />
          <FocusHistory history={history} />
        </>
      ) : (
        <Timer
          focusSubject={currentSubject}
          onTimerEnd={onTimerEnd}
          clearSubject={() => setCurrentSubject(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.curentHeight : 0,
    backgroundColor: colors.darkBlue,
  },
});
