import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {deleted} from '../redux/slices/Todo'; // Importing Redux actions
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const History = ({setTransactions}) => {
  const dispatch = useDispatch(); // Initializing useDispatch hook

  const todo = useSelector(state => state.todo.todos);

  // Function to delete a transaction by ID
  const deleteTransactionById = async idToDelete => {
    try {
      // Retrieve the array of transactions from AsyncStorage
      const storedTransactions = await AsyncStorage.getItem('transactions');
      if (storedTransactions !== null) {
        // Parse the stored transactions
        const transactions = JSON.parse(storedTransactions);
        // Filter out the transaction with the specified ID
        const updatedTransactions = transactions.filter(
          transaction => transaction.id !== idToDelete,
        );
        // Save the updated transactions back to AsyncStorage
        try {
          await AsyncStorage.setItem(
            'transactions',
            JSON.stringify(updatedTransactions),
          );
          ToastAndroid.show('Add transaction successful', ToastAndroid.SHORT);
        } catch (error) {
          console.error('Error saving data:', error);
        }
        // Dispatching the delete action
        dispatch(deleted(idToDelete));
        // remaining transactions
        setTransactions(updatedTransactions);
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <View>
      <View style={styles.line} />
      <LinearGradient colors={['#4c669f', '#3b5998']} style={styles.card}>
        <Text style={styles.table}>Date</Text>
        <Text style={[styles.table, styles.addLIst]}>Category</Text>
        <Text style={styles.tableAmount}>Amount</Text>
      </LinearGradient>

      <View style={styles.tableMenu}>
        {todo.length > 0 ? (
           // If there are todos, render them, otherwise show a message
          <>
            {todo !== undefined &&
              todo.map(item => {
                return (
                  <View key={item.id} style={[styles.task, styles.shadow]}>
                    <View style={styles.line} />
                    <View style={styles.flex}>
                      <Text style={styles.date}>{item.date}</Text>
                      <Text style={styles.category}>{item.text}</Text>
                      <Text
                        numberOfLines={2}
                        style={[
                          {
                            color: item.number < 0 ? 'red' : 'green',
                          },
                          styles.number,
                        ]}>
                        {`Rs ${item.number}`}
                      </Text>
                      <TouchableOpacity
                        hitSlop={styles.hitSlopStyles}
                        onPress={() => {
                          deleteTransactionById(item.id);
                        }}>
                        <Image
                          style={styles.deleteIcon}
                          source={require('../Image/delete.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
          </>
        ) : (
          // Message when no transactions are found
          <Text style={styles.foundTxt}>no transaction found</Text>
        )}
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
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -2,
  },
  tableMenu: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 10,
    backgroundColor: '#ffffff',
    paddingBottom: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal: -2,
  },
  table: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tableAmount:{
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  task: {
    height: 50,
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
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
  category: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '500',
  },

  number: {
    fontSize: 12,
    fontWeight: '500',
    marginRight: -50,
    width: '20%',
  },

  deleteIcon: {
    height: 14,
    width: 14,
  },
  line: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 10,
  },
  addLIst: {
    marginLeft: 10,
  },
  foundTxt: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginTop: 10,
  },
  hitSlopStyles: {
    right: 5,
    left: 5,
    top: 5,
    bottom: 5,
  },
});
