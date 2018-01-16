import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { ListItem, CheckBox } from 'react-native-elements';

class CheckboxRow extends Component {
  state = {
    checked: false,
  }
  press = () => {
    this.setState((state) => ({
      checked: !state.checked,
    }));
  }
  
  
  render() {
    return (
      <View style={styles.container}>
         <ListItem
            title={
              <CheckBox
                title="Click Here!"
                onPress={this.press}
                checked={this.state.checked}
              />
            }
         />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});

export default CheckboxRow;