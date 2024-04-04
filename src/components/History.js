import React from 'react';
import {StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Swipeout from 'react-native-swipeout';
import {add, deleted} from '../redux/slices/Todo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const History = () => {
  const dispatch = useDispatch();
  const todo = useSelector(state => state.todo.todos);
  // const flattenedTodos =todo &&  todo.reduce((acc, curr) => acc.concat(curr), []);
//   const onDelete = id => {
//     console.log("🚀 ~ onDelete ~ id:", id)
//     // const ans = todo.filter(item => {
//     //   return item.id !== id;
//     // });
//     dispatch(deleted(id));
//   };
// // Function to delete a transaction by ID
// const deleteTransactionById = async (idToDelete) => {
//   try {
//     // Retrieve the array of transactions from AsyncStorage
//     const storedTransactions = await AsyncStorage.getItem('transactions');
//     if (storedTransactions !== null) {
//       // Parse the stored transactions
//       const transactions = JSON.parse(storedTransactions);
//       // Filter out the transaction with the specified ID
//       const updatedTransactions = transactions.filter(transaction => transaction.id !== idToDelete.id);
//       // Save the updated transactions back to AsyncStorage
//       try {
//         await AsyncStorage.setItem(
//           'transactions',
//           JSON.stringify(updatedTransactions),
//         );
//         ToastAndroid.show('Add transaction successful', ToastAndroid.SHORT);
//       } catch (error) {
//         console.error('Error saving data:', error);
//       }
//       // const storedTransactions = await AsyncStorage.getItem('transactions');
//       // console.log("🚀 ~ deleteTransactionById ~ storedTransactions:", updatedTransactions)
//       // dispatch(add(JSON.parse(storedTransactions)));

//       // dispatch(add(storedTransactions));
//       // Dispatch the 'deleted' action to update Redux state
//       // dispatch(deleted(idToDelete));

//       console.log('Transaction deleted successfully');
//     }
//   } catch (error) {
//     console.error('Error deleting transaction:', error);
//   }
// };


  return (
    <View>
      <View
        style={{
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
          marginTop: 10,
        }}
      />
      {/*
       */}
       <LinearGradient
       colors={['#4c669f', '#3b5998']} style={styles.card}>
        <Text style={styles.table}>Date</Text>
        <Text style={[styles.table,{marginLeft:10}]}>Category</Text>
        <Text style={styles.table}>Amount</Text>
      </LinearGradient>
      <View style={styles.tableMenu}>
      {todo !== undefined &&
        todo.map(item => {

          return (
            <TouchableOpacity 
            onPress={()=>{
              // onDelete(item.id)
              // deleteTransactionById(item)
            }}
            key={item.id} style={[styles.task, styles.shadow]}>
            <View
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              marginTop: 10,
            }}
          />
              <View style={styles.flex}>
              <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.category}>{item.text}</Text>
                  <Text 
                  numberOfLines={2}
                    style={[{
                      color: item.number < 0 ? 'red' : 'green',
                      width: "22%"},styles.number
                    ]}>
                    {`Rs ${item.number}`}
                  </Text>
                
             
              </View>
            </TouchableOpacity>
          );
        })}
        
        
        </View>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#4c669f',
    height: 40,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal:-2
  },
  tableMenu:{
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 10,
    backgroundColor:"#ffffff",
    paddingBottom:20,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    marginHorizontal:-2

  },
  table: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  task: {
    height: 50,

    // marginTop: 20,
    backgroundColor: '#fff',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:"center",
    flex:1,
    paddingHorizontal:10
  },
  category:{
fontSize:12,
color:"#000000",
fontWeight:"500"
  },
  date:{
    fontSize:12,
    color:"#000000",
    fontWeight:"500"
  },
  pd: {
    paddingTop: 15,
    paddingLeft: 15,
    flex: 3,
   
  },
  number:{
    fontSize:12,
    fontWeight:"500"
  },
  pd2: {
    paddingTop: 15,
    paddingLeft: 15,
    flex: 1,
  },
});
