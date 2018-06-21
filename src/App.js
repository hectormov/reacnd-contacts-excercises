import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'

class App extends Component {
  state = {
    screen: 'list', //list or create
    contacts: []
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }

  removeContact = (contact) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((c) => c.id !== contact.id)
    }))

    ContactsAPI.remove(contact);
  }
  render() {
    return (
      <div className='app'>
        {this.state.screen === 'list' && (
          <ListContacts 
            onDeleteContact={this.removeContact} 
            contacts={this.state.contacts}
          />
        )}
        {this.state.screen === 'create' && (
          <CreateContact/>
        )}
      </div>
    )
  }
}

ListContacts.PropTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired
}

export default App;
