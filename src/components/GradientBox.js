import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const GradientBox = ({greater, less}) => {
  return (
    <View style={styles.lineTable}>
      {/* Displaying total expenses */}
      <LinearGradient
        style={styles.gradientRadius}
        colors={['#D31027', '#EA384D', '#EA384D']}>
        <View style={styles.box}>
          <Text style={styles.txtBox}>EXPENSE</Text>
          <Text style={styles.txtBox}>Rs {less}</Text>
        </View>
      </LinearGradient>

      {/* Displaying total income */}
      <LinearGradient
        style={styles.gradientRadius}
        colors={['#4c669f', '#3b5998', '#192f6a']}>
        <View style={styles.box}>
          <Text style={styles.txtBox}>INCOME</Text>
          <Text style={styles.txtBox}>Rs {greater}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default GradientBox;

const styles = StyleSheet.create({
  lineTable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gradientRadius: {
    borderRadius: 10,
  },
  box: {
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 150,
  },
  txtBox: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
