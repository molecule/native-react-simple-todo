import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { ListItem, CheckBox, Icon } from 'react-native-elements';

class Row extends Component {

  render() {
    const {complete} = this.props;

    const textComponent = (
      <TouchableOpacity style={styles.textWrap} onLongPress={() => this.props.onToggleEdit(true)}>
        <Text style={[styles.text, complete && styles.complete]}>{this.props.text}</Text>
      </TouchableOpacity>
    )

    const checkboxComponent = (
        <CheckBox
        title={this.props.text}
        onPress={this.props.onToggle}
        checked={complete}
        textStyle={[styles.text, complete && styles.complete]}
        containerStyle={styles.checkbox}
        onLongPress={this.props.onOpenMenu}
      />
    )

    const editButton = (
      <TouchableOpacity onPress={() => this.props.onToggleEdit(true)}>
      <Icon
        name='edit'
        type='feather'
        color='rgba(0,0,0,0.6)'
        size={30} />
      </TouchableOpacity>
    )

    const editingComponent = (
      <View style={styles.textWrap}>
        <TextInput 
          onChangeText={this.props.onUpdate}
          autoFocus
          value={this.props.text}
          style={styles.input}
          multiline
        />
      </View>
    )

    const saveButton = (
      <TouchableOpacity style={styles.save} onPress={() => this.props.onToggleEdit(false)}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    )

    return (
      <View style={styles.container}>
      {this.props.editing ? editingComponent : checkboxComponent}
      {this.props.editing ? saveButton : editButton}
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
  input: {
    height: 100,
    flex: 1,
    fontSize: 24,
    padding: 0,
    color: "#4d4d4d"
  },
  textWrap: {
    flex: 1,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 24,
    color: "#4d4d4d",
  },
  save: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#7be290",
    padding: 7
  },
  saveText: {
    color: "#4d4d4d",
    fontSize: 20
  },
  textWrap: {
    flex: 1,
    marginHorizontal: 10,
  },
  complete: {
      textDecorationLine: "line-through",
      color: "rgba(0,0,0,0.15)"
  }
})
export default Row;