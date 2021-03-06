import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class Footer extends Component {
  render() {
    const { filter } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.filters}>
          <TouchableOpacity style={[styles.filter, filter === "ALL" && styles.selected]} onPress={() => this.props.onFilter("ALL")}>
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filter, filter === "ACTIVE" && styles.selected]} onPress={() => this.props.onFilter("ACTIVE")}>
            <Text>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filter, filter === "OPEN" && styles.selected]} onPress={() => this.props.onFilter("COMPLETED")}>
            <Text>Open</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.filter} onPress={this.props.onClearComplete}>
          <Text>Clear Completed</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  filters: {
    flexDirection: "row"
  },
  filter: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "transparent"
  },
  selected: {
    borderColor: "rgba(0, 0, 0, .2)"
  }
})
export default Footer;