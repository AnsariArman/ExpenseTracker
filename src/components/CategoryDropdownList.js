import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { List } from 'react-native-paper'

const CategoryDropdownList = ({selectCategory,expanded,handlePress,handleItemPress}) => {
  return (
    <View style={styles.categoryMainView}>
    <Text style={[styles.txtTransaction]}>Category:</Text>
    {/* Accordion for category selection */}

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
              : selectCategory === 'Entertainment'? 'movie': 'folder'
          }
        />
      )}
      expanded={expanded}
      onPress={handlePress}>
      {/* Category items */}
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
        style={styles.dropdownPadding}
      />
      <View style={styles.line} />
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
        style={styles.dropdownPadding}
      />
      <View style={styles.line} />
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
        style={styles.dropdownPadding}
      />
      <View style={styles.line} />
      {/* Entertainment category */}
      <List.Item
      left={() => (
        <List.Icon
          color={selectCategory === 'Entertainment' ? '#674fa3' : '#000000'}
          icon="movie"
        />
      )}
      title="Entertainment"
      onPress={() => handleItemPress('Entertainment')}
      titleStyle={{
        color: selectCategory === 'Entertainment' ? '#674fa3' : '#000000',
      }}
      style={styles.dropdownPadding}
    />
    <View style={styles.line} />
    </List.Accordion>
  </View>
  )
}

export default CategoryDropdownList

const styles = StyleSheet.create({
    categoryMainView: {
        marginTop: 20,
      },
      txtTransaction: {
        fontSize: 15,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 5,
      },
      listAction: {
        backgroundColor: '#74747440',
        height: 55,
        borderRadius: 10,
        paddingTop:5
      },
      line: {
        borderBottomColor: '#747474',
        borderBottomWidth: 1,
        marginHorizontal: 10,
      },
      dropdownPadding: {
        marginLeft: 10,
      },

})