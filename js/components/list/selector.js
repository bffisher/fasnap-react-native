import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';

export default class Selector extends Component {

  constructor(props) {
    super(props);
    var { value } = this.props;
    this.state = { value };
  };

  render() {
    var { title, candidateItems } = this.props;

    var pickerItems = [];
    candidateItems.forEach(element => {
      pickerItems.push(<Picker.Item label={element.name} value={element.value} key={element.value}/>);
    });

    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
      }}>
        <Text style={{ fontSize: 16 }}>{title}</Text>
        <Picker
          mode='dropdown'
          selectedValue={this.state.value}
          onValueChange={this.onValueChange.bind(this)}
          itemStyle={{textAlign:'right'}}
          style={{ width: 150, height: 20 }}>
          {pickerItems}
        </Picker>
      </View>
    );
  };

  onValueChange(value) {
    this.setState({ value });
    this.props.onValueChange(value);
  }
};