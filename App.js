import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, ListView, Keyboard, AsyncStorage, ActivityIndicator } from "react-native";
import {MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";
import Header from "./header";
import Footer from "./footer";
import Row from "./row";
import CheckboxRow from "./checkboxRow";

const filterItems = (filter, items) => {
  return items.filter((item) => {
    if (filter === "ALL") return true;
    if (filter === "OPEN") return !item.complete && !item.scheduled && !item.future;
    if (filter === "ACTIVE") return !item.complete && !item.future;
  })
}

class App extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      value: "",
      filter: "ALL",
      items: [],
      dataSource: ds.cloneWithRows([]),
      loading: true
    }
    this.setSource = this.setSource.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleToggleComplete = this.handleToggleComplete.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleClearComplete = this.handleClearComplete.bind(this);
    this.handleUpdateText = this.handleUpdateText.bind(this);
    this.handleToggleEditing = this.handleToggleEditing.bind(this);
  }

  componentWillMount() {
    AsyncStorage.getItem("items").then((json) => {
      try {
        const items = JSON.parse(json);
        this.setSource(items, items, { loading: false});
      } catch(e) {
        this.setState({
          loading: false
        })
      }
    })
  }

  setSource(items, itemsDatasource, otherState = {}) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
      ...otherState
    })
    AsyncStorage.setItem("items", JSON.stringify(items));
  }

  handleUpdateText(key, text) {
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item;
      return {
        ...item,
        text
      }
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }
  handleToggleEditing(key, editing) {
    console.log("handleToggleEditing");
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item;
      return {
        ...item,
        editing
      }
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  handleClearComplete() {
    const newItems = filterItems("ACTIVE", this.state.items);
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  handleFilter(filter) {
    this.setSource(this.state.items, filterItems(filter, this.state.items), { filter })
  }

  handleRemoveItem(key) {
    const newItems = this.state.items.filter((item) => {
      return item.key != key;
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  handleToggleComplete(key, complete) {
    const newItems = this.state.items.map((item) => {
      if (item.key != key) return item;
      return {
        ... item,
        complete
      }
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  handleAddItem() {
    if (!this.state.value) return;
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false,
        scheduled: false,
        future: true
      }
    ]
    this.setSource(newItems, filterItems(this.state.filter, newItems), { value: "" })
  }
  render() {
    return (
      <MenuProvider style={{flexDirection: 'column'}}>
      <View style={styles.container}>
        <Header 
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={(value) => this.setState({ value })}
        />
        <View style={styles.content}>
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={({ key, ...value}) => {
              return (
                <Menu onSelect={value => alert(`Selected number: ${value}`)}>
                <MenuTrigger text="..." />
                <MenuOptions>
                <MenuOption onSelect={() => alert(`Save`)} text="Save" />
                <MenuOption onSelect={() => alert(`Delete`)}>
                    <Text style={{ color: 'red' }}>Delete</Text>
                  </MenuOption>
                <Row
                  key={key}
                  onToggle={() => this.handleToggleComplete(key, !value.complete)}
                  onRemove={() => this.handleRemoveItem(key)}
                  onUpdate={(text) => this.handleUpdateText(key, text)}
                  onToggleEdit={(editing) => this.handleToggleEditing(key, editing)}
                  {...value}
                />
                </MenuOptions>
                </Menu>
              )
            }}
          />
        </View>
        <Footer 
          onFilter={this.handleFilter}
          filter={this.state.filter}
          onClearComplete={this.handleClearComplete}/>
        {this.state.loading && <View style={styles.loading}>
          <ActivityIndicator
            animating
            size="large"
          />
        </View>}
      </View>
      </MenuProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    ...Platform.select({
      ios: { paddingTop: 30 }
    })
  },
  loading: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.2)"
  },
  content: {
    flex: 1
  },
  list: {
    backgroundColor: '#FFF'
  },
  separator: {
    borderWidth: 1,
    borderColor: "#F5F5F5"
  }
})

export default App;