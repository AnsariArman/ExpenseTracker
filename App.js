import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Button,
  StatusBar,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import History from './src/components/History';
import {add} from './src/redux/slices/Todo'; // Importing action creator 'add' from Redux slice
import {useDispatch, useSelector} from 'react-redux'; // Importing useDispatch and useSelector hooks from react-redux
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  TextInput,
  List,
  TouchableRipple,
  RadioButton,
} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import CategoryDropdownList from './src/components/CategoryDropdownList';
import GradientBox from './src/components/GradientBox';
import ButtonTransaction from './src/components/ButtonTransaction';

const App = () => {
  const dispatch = useDispatch(); // Initializing useDispatch hook

  // State variables
  const [balance, setBalance] = useState(0);
  const [greater, setGreater] = useState(0);
  const [less, setLess] = useState(0);
  const [number, setNumber] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [selectCategory, setSelectCategory] = useState('');
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  // Function to handle category item press
  const [expanded, setExpanded] = React.useState(false);

  const handleItemPress = item => {
    setSelectCategory(item);
    handlePress();
  };

  // Function to handle accordion press
  const handlePress = () => setExpanded(!expanded);

  // State variable for radio button
  const [checked, setChecked] = React.useState(false);

  // useEffect to load data from AsyncStorage when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedTransactions = await AsyncStorage.getItem('transactions');
        if (storedTransactions !== null) {
          const parsedTransactions = JSON.parse(storedTransactions);

          parsedTransactions.forEach(item => dispatch(add(item))); // Dispatching Redux action to add transactions

          setTransactions(JSON.parse(storedTransactions));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // useEffect to update balance and totals when transactions change
  useEffect(() => {
    const AccountBalance = () => {
      // Recalculate total income (greater) and total expenses (less)
      let totalGreater = 0;
      let totalLess = 0;
      transactions.forEach(item => {
        if (parseInt(item.number) > 0) {
          totalGreater += parseInt(item.number);
        } else if (parseInt(item.number) < 0) {
          totalLess += parseInt(item.number);
        }
      });
      setGreater(totalGreater);
      setLess(totalLess);

      // Calculate total balance
      let totalBalance = 0;
      transactions.forEach(item => {
        totalBalance += parseInt(item.number);
      });
      setBalance(totalBalance);
    };

    AccountBalance();
  }, [transactions]);

  // Function to handle text input change
  const onChangeText = (key, val) => {
    setNumber(val);
  };

  // Function to handle button press to add transaction
  const onPress = async () => {
    Keyboard.dismiss();
    const regex = /^(?!0\d)([1-9]\d*|0)(\.\d{2})?$/;
    if (!regex.test(number) && number !== '') {
      // Display an alert if the input is not numeric
      ToastAndroid.show('Please enter only numeric values', ToastAndroid.SHORT);
    } else {
      if ((selectCategory !== '' || checked) && number !== '' && date !== '') {
        const newTransaction = {
          text: checked ? 'Income' : selectCategory,
          number: checked ? Math.abs(number) : -Math.abs(number),
          id: Math.random(),
          date: moment(date).format('DD/MM/YYYY'),
        };
        const updatedTransactions = [...transactions, newTransaction];
        setTransactions(updatedTransactions);
        setNumber('');
        setSelectCategory('');
        setDate('');
        try {
          ToastAndroid.show('Add transaction successful', ToastAndroid.SHORT);
          await AsyncStorage.setItem(
            'transactions',
            JSON.stringify(updatedTransactions),
          );
        } catch (error) {
          console.error('Error saving data:', error);
        }
        dispatch(add(newTransaction)); // Dispatching Redux action to add transaction

        // Calculate the new balance
        let totalBalance = 0;
        updatedTransactions.forEach(item => {
          totalBalance += parseInt(item.number);
        });
        setBalance(totalBalance);
      }
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
    
    {/* onTop status Bar */}
      <StatusBar
        animated={true}
        backgroundColor="#4c669f"
        barStyle={'light-content'}
      />
      {/* onTop header */}
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.dashBoard}>
        <Text style={styles.dashBoardTxt}>FinanceTracker</Text>
      </LinearGradient>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          {/* Box Gradient component */}
          <GradientBox greater={greater} less={less} />

          {/* Displaying total balance */}
          <View>
            <Text style={styles.txt}>Balance: Rs {balance}</Text>
          </View>

          {/* Input for amount */}
          <Text style={[styles.amountTransaction]}>Amount:</Text>
          <TextInput
            Type={'outlined'}
            label={'Enter Amount'}
            maxLength={10}
            style={styles.input}
            onChangeText={val => onChangeText('number', val)}
            value={number}
            keyboardType="number-pad"
            mode="outlined"
          />
          {/* Displaying category selection if it's not an income transaction */}

          {/* Category List component */}
          {!checked && (
            <CategoryDropdownList
              selectCategory={selectCategory}
              expanded={expanded}
              handlePress={handlePress}
              handleItemPress={handleItemPress}
            />
          )}
          {/* Date selection */}

          <Text style={[styles.selectDate]}>Choose a date:</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              Keyboard.dismiss();
              setOpen(true);
            }}
            style={styles.DateBtn}>
            <Text
              style={[
                styles.dateTxt,
                {color: date !== '' ? '#000000' : '#747474'},
              ]}>
              {date !== '' ? moment(date).format('DD/MM/YYYY') : 'Select Date'}
            </Text>
          </TouchableOpacity>
          {/* Date picker library */}

          <DatePicker
            modal
            open={open}
            mode="date"
            date={date !== '' ? date : new Date()}
            onConfirm={date => {
              setDate(date);
              setOpen(false);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          {/* Radio buttons for expense/income */}
          <View style={styles.radioButtonView}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.Expense}
              onPress={() => setChecked(false)}>
              <RadioButton
                status={!checked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(false)}
              />
              <Text style={styles.radioTxt}>Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.Expense}
              onPress={() => setChecked(true)}>
              <RadioButton
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(true)}
              />
              <Text style={styles.radioTxt}>Income</Text>
            </TouchableOpacity>
          </View>
          <ButtonTransaction onPress={onPress} />
          {/* Header for transaction history */}
          <Text style={[styles.txtTransaction3]}>Transaction</Text>
          {/* Transaction history component */}
          <History />
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    padding: 20,
  },
  input: {
    backgroundColor: '#ffffff',
  },
  inputCategory: {
    height: 50,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  ArrowPng: {
    height: 10,
    width: 10,
  },

  txt: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },

  txtTransaction: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  amountTransaction: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 10,
  },
  selectDate: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 10,
  },
  txtTransaction2: {
    fontSize: 14,
    color: 'gray',
  },
  txtTransaction3: {
    marginTop: 20,
    fontSize: 25,
    color: '#000',
    fontWeight: 'bold',
  },

  radioButtonView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  Expense: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  radioTxt: {
    color: '#000000',
    fontSize: 15,
    fontWeight: 'bold',
  },

  DateBtn: {
    borderWidth: 1,
    borderColor: '#747474',
    marginTop: 5,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  dateTxt: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '600',
  },
  dashBoard: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashBoardTxt: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
  },

  line: {
    borderBottomColor: '#747474',
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
});
