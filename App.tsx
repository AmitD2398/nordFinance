import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Slider from 'react-native-slider';
import CustomDropdown from './src/screen/Dropdown';
import axios from 'axios';
import {ApiUrl} from './src/constants/Constant';

export default function App() {
  const [seekbarValue, setSeekbarValue]: any = useState(21);
  const [value, setValue]: any = useState(10);
  const [selected, setSelected]: any = useState(0);
  const [inputValue, setInputValue]: any = useState('21');
  const [investMoney, setInvestMoney]: any = useState('');
  const [investMoneyValue, setInvestMoneyValue]: any = useState('');

  const formatInvestedAmount = () => {
    if (investMoney?.investedAmount >= 1000) {
      const suffixes = ['', 'K', 'M', 'B', 'T'];
      const suffixNum = Math.floor(
        ('' + investMoney?.investedAmount).length / 3,
      );
      let shortValue = parseFloat(
        (suffixNum !== 0
          ? investMoney?.investedAmount / 1000 ** suffixNum
          : investMoney?.investedAmount
        ).toPrecision(2),
      );
      if (shortValue % 1 !== 0) {
        shortValue = parseFloat(shortValue.toFixed(1));
      }
      return shortValue + suffixes[suffixNum];
    } else {
      return investMoney?.investedAmount;
    }
  };

  const formatTotalShares = () => {
    if (investMoney?.totalShares >= 1000) {
      const suffixes = ['', 'K', 'M', 'B', 'T'];
      const suffixNum = Math.floor(Math.log10(investMoney?.totalShares) / 3);
      let shortValue = investMoney?.totalShares / 1000 ** suffixNum;
      if (shortValue % 1 !== 0) {
        shortValue = parseFloat(shortValue.toFixed(2));
      } else {
        shortValue = parseInt(shortValue);
      }
      return shortValue + suffixes[suffixNum];
    } else {
      return investMoney?.totalShares;
    }
  };

  const reversedValue = 11 - value;

  const handleValueChange = (sliderValue: number) => {
    setValue(sliderValue);
  };
  const handleSlider = (value: any) => {
    setSeekbarValue(value);
    setInputValue(String(value));
  };
  const dropdownOptions = [
    {value: 'option1', label: 'USDT'},
    {value: 'option2', label: 'INR'},
  ];
  const options = [
    {value: 'option1', label: 'Grayscale Bitcoin Trust'},
    {value: 'option2', label: 'Bitcoin Trust'},
  ];
  const handleInputChange = (text: string) => {
    setInputValue(text);
    const numericValue = parseInt(text);
    if (!isNaN(numericValue)) {
      setSeekbarValue(numericValue);
    }
  };
  const calculatorApi = () => {
    axios
      .post(ApiUrl, {
        poolId: '11',
        frqInDays: selected === 0 ? 7 : selected === 1 ? 30 : 365,
        investmentCount:
          selected === 0
            ? 52 * reversedValue
            : selected === 1
            ? 12 * reversedValue
            : 1 * reversedValue,
        sipAmount: seekbarValue,
      })
      .then(response => {
        const resultData = response.data.data.result.resultData;
        const lastObject = resultData[resultData?.length - 1];
        setInvestMoney(lastObject);
        console.log(lastObject);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Calculator Earrings</Text>
        <View>
          <View style={styles.investedAmountScetion}>
            <Text style={{color: '#9EACDB'}}>Invested Amount</Text>
            <View style={{flexDirection: 'row'}}>
              <View>
                <TextInput
                  value={inputValue}
                  onChangeText={handleInputChange}
                  keyboardType="numeric"
                  color={'#252A48'}
                  defaultValue={seekbarValue}
                  placeholderTextColor={'#252A48'}
                  style={styles.inputStyle}
                />
              </View>
              <View style={styles.pickerIcon}>
                <CustomDropdown options={dropdownOptions} />
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: 'stretch',
              justifyContent: 'center',
              width: '100%',
            }}>
            <Slider
              thumbTintColor={'#304FFE'}
              minimumTrackTintColor={'#304FFE'}
              maximumTrackTintColor={'#9EACDB'}
              value={seekbarValue}
              minimumValue={0}
              maximumValue={21000}
              step={1}
              onValueChange={handleSlider}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.priceStyle}>0</Text>
            <Text style={styles.priceStyle}>3K</Text>
            <Text style={styles.priceStyle}>12K</Text>
            <Text style={styles.priceStyle}>15K</Text>
            <Text style={styles.priceStyle}>18K</Text>
            <Text style={styles.priceStyle}>21K</Text>
          </View>
        </View>
        <View style={styles.investedAmountScetion}>
          <Text style={{color: '#9EACDB'}}>Invested In</Text>
          <View>
            <View style={styles.pickerIcon}>
              <CustomDropdown options={options} />
            </View>
          </View>
        </View>
        <View style={styles.investedAmountScetion}>
          <Text style={{color: '#9EACDB'}}>Investment Timeline</Text>
          <View style={{flexDirection: 'row'}}>
            <Pressable
              style={[
                styles.timeLineStyle,
                {backgroundColor: selected == 0 ? '#304FFE' : '#F3F3F3'},
              ]}
              onPress={() => {
                setSelected(0);
              }}>
              <Text
                style={[
                  styles.yesrStyle,
                  {color: selected == 0 ? '#fff' : 'rgba(37, 42, 72, 0.20)'},
                ]}>
                Weekly
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.timeLineStyle,
                {backgroundColor: selected == 1 ? '#304FFE' : '#F3F3F3'},
              ]}
              onPress={() => {
                setSelected(1);
              }}>
              <Text
                style={[
                  styles.yesrStyle,
                  {color: selected == 1 ? '#fff' : 'rgba(37, 42, 72, 0.20)'},
                ]}>
                Monthly
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.timeLineStyle,
                {backgroundColor: selected == 2 ? '#304FFE' : '#F3F3F3'},
              ]}
              onPress={() => {
                setSelected(2);
              }}>
              <Text
                style={[
                  styles.yesrStyle,
                  {color: selected == 2 ? '#fff' : 'rgba(37, 42, 72, 0.20)'},
                ]}>
                Yearly
              </Text>
            </Pressable>
          </View>
        </View>
        <View>
          <View style={styles.investedAmountScetion}>
            <Text style={{color: '#9EACDB'}}>Invested From</Text>
            <View style={{flexDirection: 'row'}}>
              <Pressable style={styles.amountStyle}>
                <Text style={{alignSelf: 'center', color: '#252A48'}}>
                  {reversedValue} yrs
                </Text>
              </Pressable>
            </View>
          </View>
          <View
            style={{
              alignItems: 'stretch',
              justifyContent: 'center',
              width: '100%',
            }}>
            <Slider
              thumbTintColor={'#304FFE'}
              minimumTrackTintColor={'#304FFE'}
              maximumTrackTintColor={'#9EACDB'}
              value={value}
              onValueChange={handleValueChange}
              minimumValue={1}
              maximumValue={10}
              step={1}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.priceStyle}>10 yrs</Text>
            <Text style={styles.priceStyle}>8 yrs</Text>
            <Text style={styles.priceStyle}>6 yrs</Text>
            <Text style={styles.priceStyle}>4 yrs</Text>
            <Text style={styles.priceStyle}>Present</Text>
          </View>
        </View>
        <View style={styles.bottamStyle}>
          <Text style={{color: '#9EACDB'}}>Invested Money</Text>
          <Text style={styles.pementTypeStyle}>
            {formatInvestedAmount()} USDT
          </Text>
        </View>
        <View style={styles.bottamStyle}>
          <Text style={{color: '#9EACDB'}}>Money you would have</Text>
          <Text style={[styles.pementType]}>{formatTotalShares()} USDT</Text>
        </View>
        <View>
          {reversedValue <= 6 ? (
            <Pressable onPress={calculatorApi} style={styles.btn}>
              <Text style={styles.textStyle}>Calculate</Text>
            </Pressable>
          ) : (
            <Pressable style={[styles.btn, {backgroundColor: '#9EACDB'}]}>
              <Text style={styles.textStyle}>Calculate</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: '90%',
  },
  title: {
    color: '#333',
    alignSelf: 'center',
    fontSize: 20,
    marginVertical: 10,
  },
  pickerIcon: {
    backgroundColor: '#F3F3F3',
    borderRadius: 20,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  amountStyle: {
    backgroundColor: '#F3F3F3',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 30,
    borderRadius: 20,
    width: 70,
  },
  priceStyle: {
    color: '#000',
    marginVertical: 10,
  },
  investedAmountScetion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  timeLineStyle: {
    borderRadius: 20,
    marginRight: 5,
  },
  yesrStyle: {
    padding: 5,
    fontSize: 12,
    marginHorizontal: 6,
  },
  pementTypeStyle: {
    color: '#9EACDB',
    fontSize: 17,
    fontWeight: '700',
  },
  bottamStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    textAlign: 'center',
    alignSelf: 'center',
    marginVertical: 5,
  },
  pementType: {
    fontSize: 15,
    color: '#2BA24C',
    fontWeight: '800',
  },
  btn: {
    width: 100,
    backgroundColor: '#304FFE',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },
  textStyle: {
    color: '#fff',
  },
  inputStyle: {
    backgroundColor: '#F3F3F3',
    width: 70,
    height: 35,
    borderRadius: 20,
    fontSize: 13,
    fontWeight: '700',
    marginHorizontal: 2,
  },
});
