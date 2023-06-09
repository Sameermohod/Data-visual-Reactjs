import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../store/contacts';
import { Input,Radio,Button } from '@material-tailwind/react';
import ContactList from './ContactList';

const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [lname, setLname] = useState('');
  const [status, setStatus] = useState('active');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      id: Date.now(),
      name,
      lname,
      status
    };
    dispatch(addContact(newContact));
    setName('');
    setLname('');
    setStatus('active');
  };

  return (
    <>


    <div className='lg:ms-[450px] lg:mt-[80px] lg:max-w-[300px] '>
    <h1 className='mb-[20px] text-center font-bold'>Create Contacts</h1>
    <center>
    <form onSubmit={handleSubmit}>
    <div className='flex'>

      <Input
        type="text"
        label='firstName'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="text"
        label='LastName'
        
        value={lname}
        onChange={(e) => setLname(e.target.value)}
        required
      />
    </div>
         <div>
        <label>
          <Radio
            type="radio"
            value="active"
            checked={status === 'active'}
            onChange={() => setStatus('active')}
          />
          Active
        </label>
        <label>
          <Radio
            type="radio"
            value="inactive"
            checked={status === 'inactive'}
            onChange={() => setStatus('inactive')}
          />
          Inactive
        </label>
      </div>
      <Button type="submit">Add Contact</Button>      
    </form>    
</center>
</div>
    <ContactList/>
    </>
  );
};

export default ContactForm;
