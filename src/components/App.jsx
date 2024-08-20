import { Component } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts !== null) {
      //if contacts are already saved in localStorage, we write this in the state
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      //if a contact is new, set value to localStorage
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } 
  };

  addContact = newContact => {
    this.setState(prevState => ({contacts: [...prevState.contacts, newContact],}));
  };

  deleteContact = id => {this.setState(prevState => ({contacts: prevState.contacts.filter(contact => contact.id !== id),}));
};

setFilter = filterValue => {
  this.setState({
    filter: filterValue,
});
};

filterContact = () => {
  const { contacts, filter } = this.state;
  const filterLowerCase = filter.toLowerCase();
  return contacts.filter(contact => contact.name.toLowerCase().includes(filterLowerCase)); 
};

render() {
  const { contacts, filter } = this.state;
  return (
    <div style={{backgroundColor: "palegoldenrod",
                paddingLeft: "30px",
                paddingTop: "10px",
                paddingBottom: "10px"}}>
      <h1>Phonebook</h1>
      <ContactForm addContact={this.addContact} contacts={contacts} />

      <h2>Contacts</h2>
      <Filter filter={filter} setFilter={this.setFilter} />
      <ContactList
        filterContact={this.filterContact}
        deleteContact={this.deleteContact} />
    </div> 
  );
}

} 














