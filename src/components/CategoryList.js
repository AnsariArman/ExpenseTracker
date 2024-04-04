import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import { Checkbox,Divider } from 'react-native-paper';

const CategoryList = ({
  categoriesToggle,
  visibility,
  listOfCategories,
  selectCategory,
  setSelectCategory,
}) => {
  return (
    <Modal
      visible={visibility}
      onRequestClose={categoriesToggle}
      animationType="slide"
      transparent={true}>
      <View style={styles.modalMenu}>
        <View style={styles.listView}>
          <Text>Select category</Text>
          {listOfCategories.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectCategory(item);
                  categoriesToggle();
                }}
                style={styles.selectCategoryStyle}>
                
                <Text style={styles.txt}>{item}</Text>

                {
                    item === selectCategory &&
                    <Checkbox
      status={item === selectCategory ? 'checked' : 'unchecked'}
     
    />

            //     <Image
            //     style={styles.checked}
            //     source={require('../Image/checked.png')}
            //   />
                }
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  modalMenu: {
    flex: 1,
    backgroundColor: '#74747440',
    justifyContent: 'center',
  },
  listView: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 50,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  selectCategoryStyle: {
    borderWidth: 1,
    borderColor: '#74747480',
    marginVertical: 5,
    flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal:10,
    alignItems:"center"
  },
  txt: {
    color: '#000000',
  },
  checked: {
    height: 15,
    width: 15,
  },
});
