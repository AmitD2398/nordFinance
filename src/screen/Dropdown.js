import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Modal} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const CustomDropdown = ({options}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleDropdown = () => {
    setModalVisible(!modalVisible);
  };

  const selectOption = option => {
    setSelectedOption(option);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
        <Text style={styles.selectedOptionText}>
          {selectedOption ? selectedOption.label : 'Select an option'}
        </Text>
        <EvilIcons
          name={modalVisible ? 'chevron-up' : 'chevron-down'}
          size={30}
          color={'#000000'}
          style={styles.dropdownIcon}
          onPress={toggleDropdown}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.dropdownOptionsContainer}>
          {options.map(option => (
            <TouchableOpacity
              key={option.value}
              onPress={() => selectOption(option)}
              style={styles.dropdownOption}>
              <Text style={styles.dropdownOptionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
    alignSelf: 'flex-start',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  selectedOptionText: {
    fontSize: 13,
    marginRight: 10,
    color: '#252A48',
    fontWeight: '700',
  },
  dropdownIcon: {
    position: 'absolute',
    right: 0,
    top: '25%',
    transform: [{translateY: -10}],
    zIndex: 1,
  },
  dropdownOptionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    top: '40%',
    left: 0,
    right: 0,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
  },
  dropdownOption: {
    paddingVertical: 10,
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default CustomDropdown;
