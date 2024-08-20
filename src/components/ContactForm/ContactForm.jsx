import { Component } from "react";
import { nanoid } from "nanoid";
import css from "./ContactForm.module.css";
import PropTypes from "prop-types";

export class ContactForm extends Component {
    static propTypes = {
        addContact: PropTypes.func.isRequired,
        contacts: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
    })),
};

state = {
    name: "",
    number: "",
};

nameChangeEvent = e => {
    this.setState({name: e.target.value,});
};

numberChangeEvent = e => {
    this.setState({number: e.target.value,});
};

addContactSubmit = e => {
    // prevent the form from refreshing upon submit
    e.preventDefault();
    const { name, number } = this.state;
    const { addContact, contacts } = this.props;

    //if name and number is empty, it will not submit
    if (name.trim() === "" || number.trim() === "") {
        return;
    }
    // if contact exist, set an alert and it will not submit
    const existingContact = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());

    if (existingContact) {
        alert(`${name} is already in contacts!`);
        return;
    } 

    //Adding contact
    addContact({
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
    });

    //Reset form fields upon submitting
    this.setState({
        name: "",
        number: "",
    });
};

render() {
    const { name, number } = this.state;

    return (
        <form className={css.form} onSubmit={this.addContactSubmit}>
            <label className={css.formField}>
                <p className={css.nameLabel}>Name</p>
                <input type="text"
                        name="name"
                        placeholder="Name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan." 
                        required
                        value={name}
                        onChange={this.nameChangeEvent} />
            </label>

            <label className={css.formField} >
                <p className={css.nameLabel}>Number</p>
                <input
                    type="tel"
                    name="number"
                    placeholder="Phone number"
                    pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    value={number}
                    onChange={this.numberChangeEvent} />
            </label>

            <button className={css.addContactButton}
                    type="submit">Add Contact</button>
        </form>
    );
}
}
