// contacts.js

// Initial state
const initialState = {
    contacts: [],
  };
  
  // Action types
  const ADD_CONTACT = 'ADD_CONTACT';
  const EDIT_CONTACT = 'EDIT_CONTACT';
  const DELETE_CONTACT = 'DELETE_CONTACT';
  
  // Action creators
  export const addContact = (contact) => ({
    type: ADD_CONTACT,
    payload: contact,
  });
  
  export const editContact = (contact) => ({
    type: EDIT_CONTACT,
    payload: contact,
  });
  
  export const deleteContact = (contactId) => ({
    type: DELETE_CONTACT,
    payload: contactId,
  });
  
  // Reducer
  const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_CONTACT:
        return {
          ...state,
          contacts: [...state.contacts, action.payload],
        };
      case EDIT_CONTACT:
        return {
          ...state,
          contacts: state.contacts.map((contact) =>
            contact.id === action.payload.id ? action.payload : contact
          ),
        };
      case DELETE_CONTACT:
        return {
          ...state,
          contacts: state.contacts.filter(
            (contact) => contact.id !== action.payload
          ),
        };
      default:
        return state;
    }
  };
  
  export default contactsReducer;
  