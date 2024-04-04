import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableRipple } from 'react-native-paper'

const ButtonTransaction = ({onPress}) => {
  return (
    <View>
     {/* Button to add transaction */}
     <LinearGradient
     colors={['#4c669f', '#3b5998', '#192f6a']}
     style={styles.ButtonView}>
     <TouchableRipple
       rippleColor="rgba(0, 0, 0, .32)"
       style={styles.btn}
       activeOpacity={0.6}
       onPress={onPress}>
       <Text style={styles.addBtn}>Add Transaction</Text>
     </TouchableRipple>
   </LinearGradient>
    </View>
  )
}

export default ButtonTransaction

const styles = StyleSheet.create({

  ButtonView: {
    marginTop: 5,
    borderRadius: 10,
  },
  btn: {
    padding: 15,
    alignItems: 'center',
  },
  addBtn: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },

})