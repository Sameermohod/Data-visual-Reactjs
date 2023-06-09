
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editContact } from '../store/contacts';
import { Input,Button,Radio } from '@material-tailwind/react';
import { AiOutlineEdit } from "react-icons/ai";


const ContactDetails = ({ contact }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(contact.name);
  const [lname, setLname] = useState(contact.lname);
  const [status, setStatus] = useState(contact.status);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedContact = {
      ...contact,
      name,
      lname,
      status,
    };
    dispatch(editContact(updatedContact));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(contact.name);
    setLname(contact.lname);
    setStatus(contact.status);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
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
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </>
      ) : (
        <>
          <button onClick={handleEdit}><AiOutlineEdit/></button>
        </>
      )}
    </div>
  );
};

export default ContactDetails;