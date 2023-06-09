import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../store/contacts';
import ContactDetails from './ContactDetails';

  import { AiFillDelete } from "react-icons/ai";

const ContactList = () => {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  const handleDelete = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div className="  grid  grid-cols-5 px-4">


      {contacts.map((contact) => (
        <div>
    
   <div className="flex flex-col mt-2 justify-between items-center p-8 border rounded-md w-60 sm:px-12 dark:bg-gray-900 dark:text-gray-100">
	<div className="text-center mb-3">
		<h2 className="text-xl font-semibold"> {contact.name}&nbsp;{contact.lname}</h2>
		<p className="text-sm dark:text-gray-400"> {contact.status}</p>
	</div>

<div className='flex'>

<span onClick={() => handleDelete(contact.id)} className="float-left ">{<AiFillDelete/>}</span>
<span>
<ContactDetails contact={contact}/>
</span>
</div>
  
</div>
   </div>
   
      ))}



    </div>

  )}

export default ContactList
 
