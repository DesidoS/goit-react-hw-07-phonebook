import { Delete, List, Item } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { GiFactory, GiSmartphone, GiFamilyHouse } from 'react-icons/gi';
import { TiDelete } from 'react-icons/ti';
import { deleteContact } from 'redux/operations';
import { selectFilter, selectContacts } from 'redux/selectors';

const ContactList = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);
  const handleDelete = id => {
    return dispatch(deleteContact(id));
  };
  const getVisibleContacts = (contacts, filters) => {
    if (filters === '') return contacts;
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filters?.toLowerCase());
    });
  };
  const visibleContacts = getVisibleContacts(contacts, filters);
  if (!visibleContacts) return;
  return (
    <List>
      {visibleContacts.map(({ id, name, number, type }) => (
        <Item key={id}>
          <Delete
            onClick={() => {
              handleDelete(id);
            }}
          >
            <TiDelete
              style={{
                color: 'tomato',
                fontSize: '36px',
                marginBottom: '-4px',
              }}
            />
          </Delete>
          {type === 'mobile' && <GiSmartphone />}
          {type === 'work' && <GiFactory />}
          {type === 'home' && <GiFamilyHouse />}
          {name}: {number}
        </Item>
      ))}
    </List>
  );
};
export default ContactList;
