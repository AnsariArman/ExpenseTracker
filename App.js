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
import {add} from './src/redux/slices/Todo';
import {useDispatch, useSelector} from 'react-redux';
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

const App = () => {
  const dispatch = useDispatch();
  const todo = useSelector(state => state.todo.todos);

  const [balance, setBalance] = useState(0);
  const [greater, setGreater] = useState(0);
  const [less, setLess] = useState(0);
  const [number, setNumber] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [selectCategory, setSelectCategory] = useState('');
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedTransactions = await AsyncStorage.getItem('transactions');
        if (storedTransactions !== null) {
          const parsedTransactions = JSON.parse(storedTransactions);

          parsedTransactions.forEach(item => dispatch(add(item)));

          setTransactions(JSON.parse(storedTransactions));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

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

  const onChangeText = (key, val) => {
    setNumber(val);

    // setNumber(val);
  };
  const onPress = async () => {
    Keyboard.dismiss()
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
        try {
          ToastAndroid.show('Add transaction successful', ToastAndroid.SHORT);
          await AsyncStorage.setItem(
            'transactions',
            JSON.stringify(updatedTransactions),
          );
        } catch (error) {
          console.error('Error saving data:', error);
        }
        dispatch(add(newTransaction));

        // Calculate the new balance
        let totalBalance = 0;
        updatedTransactions.forEach(item => {
          totalBalance += parseInt(item.number);
        });
        setBalance(totalBalance);

        setNumber('');
        setSelectCategory('');
        setDate('');
      }
    }
  };
  const [expanded, setExpanded] = React.useState(false);
  const handleItemPress = item => {
    setSelectCategory(item);
    handlePress();
  };
  const handlePress = () => setExpanded(!expanded);
  const [checked, setChecked] = React.useState(false);

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor="#4c669f"
        barStyle={'light-content'}
      />
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={{
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 25, color: '#fff', fontWeight: 'bold'}}>
          FinanceTracker
        </Text>
      </LinearGradient>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <LinearGradient
              style={{borderRadius: 10}}
              colors={['#4c669f', '#3b5998', '#192f6a']}
              >
              <View style={styles.box}>
                <Text style={styles.txtBox}>INCOME</Text>
                <Text style={styles.txtBox}>Rs {greater}</Text>
              </View>
            </LinearGradient>
            <LinearGradient
              style={{borderRadius: 10}}
              colors={['#D31027', '#EA384D','#EA384D']}>
              <View style={styles.box}>
                <Text style={styles.txtBox}>EXPENSE</Text>
                <Text style={styles.txtBox}>Rs {less}</Text>
              </View>
            </LinearGradient>
          </View>
          <View>
          <Text style={styles.txt}>Balance: Rs {balance}</Text>
        </View>
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

          {!checked && (
            <View style={styles.categoryMainView}>
              <Text style={[styles.txtTransaction]}>Category:</Text>

              <List.Accordion
                style={styles.listAction}
                title={
                  selectCategory !== '' ? selectCategory : 'select category'
                }
                left={props => (
                  <List.Icon
                    {...props}
                    icon={
                      selectCategory === 'Utilities'
                        ? 'home'
                        : selectCategory === 'Groceries'
                        ? 'cart'
                        : selectCategory === 'Rent'
                        ? 'home-account'
                        : 'folder'
                    }
                  />
                )}
                expanded={expanded}
                onPress={handlePress}>
                <List.Item
                  left={() => (
                    <List.Icon
                      color={
                        selectCategory === 'Utilities' ? '#674fa3' : '#000000'
                      }
                      icon="home"
                    />
                  )}
                  title="Utilities"
                  titleStyle={{
                    color:
                      selectCategory === 'Utilities' ? '#674fa3' : '#000000',
                  }}
                  onPress={() => handleItemPress('Utilities')}
                  style={{marginLeft: 10}}
                />
                <View
                  style={{
                    borderBottomColor: '#747474',
                    borderBottomWidth: 1,
                    marginHorizontal: 10,
                  }}
                />
                <List.Item
                  left={() => (
                    <List.Icon
                      color={
                        selectCategory === 'Groceries' ? '#674fa3' : '#000000'
                      }
                      icon="cart"
                    />
                  )}
                  title="Groceries"
                  onPress={() => handleItemPress('Groceries')}
                  titleStyle={{
                    color:
                      selectCategory === 'Groceries' ? '#674fa3' : '#000000',
                  }}
                  style={{marginLeft: 10}}
                />
                <View
                  style={{
                    borderBottomColor: '#747474',
                    borderBottomWidth: 1,
                    marginHorizontal: 10,
                  }}
                />
                <List.Item
                  left={() => (
                    <List.Icon
                      color={selectCategory === 'Rent' ? '#674fa3' : '#000000'}
                      icon="home-account"
                    />
                  )}
                  title="Rent"
                  onPress={() => handleItemPress('Rent')}
                  titleStyle={{
                    color: selectCategory === 'Rent' ? '#674fa3' : '#000000',
                  }}
                  style={{marginLeft: 10}}
                />
                <View
                  style={{
                    borderBottomColor: '#747474',
                    borderBottomWidth: 1,
                    marginHorizontal: 10,
                  }}
                />
              </List.Accordion>
            </View>
          )}
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

          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={{marginTop: 5, borderRadius: 10}}>
            <TouchableRipple
              rippleColor="rgba(0, 0, 0, .32)"
              style={styles.btn}
              activeOpacity={0.6}
              onPress={onPress}>
              <Text style={styles.addBtn}>Add Transaction</Text>
            </TouchableRipple>
          </LinearGradient>

          <Text style={[styles.txtTransaction, {marginTop: 20, fontSize: 25}]}>
            Transaction
          </Text>
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
  btn: {
    padding: 15,
    alignItems: 'center',
  },
  txt: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop:10
  },
  box: {
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width:150
  },
  txtBox: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
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
  addBtn: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  listAction: {
    backgroundColor: '#74747440',
    height: 55,
    borderRadius: 10,
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
  categoryMainView: {
    marginTop: 20,
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
});
