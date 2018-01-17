import React, { Component } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { ListItem, CheckBox, Icon } from 'react-native-elements';

class Row extends Component {


  render() {
    const {complete} = this.props;
    console.log("render of row, complete: " + complete);
    return (
      <View style={styles.container}>
      <CheckBox
        title={this.props.text}
        onPress={this.props.onToggle}
        checked={complete}
        textStyle={[styles.text, complete && styles.complete]}
        containerStyle={styles.checkbox}
      />
      <TouchableOpacity onPress={this.props.onRemove}>
      <Icon
        name='md-close'
        type='ionicon'
        color='#f50'
        size={30} />
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center"
  },
  checkbox: {
    flex: 1
  },
  textWrap: {
    flex: 1,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 24,
    color: "#4d4d4d",
  },
  complete: {
      textDecorationLine: "line-through"
  }
})
export default Row;