import React, { Component } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { ListItem, CheckBox } from 'react-native-elements';

class Row extends Component {


  render() {
    const {complete} = this.props;
    console.log("render of row, complete: " + complete);
    return (
      <View style={styles.container}>
      <View style={styles.textWrap}>
        <Text style={[styles.text, complete && styles.complete]}>{this.props.text}</Text>
      </View>
      <CheckBox
        title={this.props.text}
        onPress={this.props.onToggle}
        checked={complete}
        style={[styles.text, complete && styles.complete]}
        textStyle={[styles.text, complete && styles.complete]}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
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