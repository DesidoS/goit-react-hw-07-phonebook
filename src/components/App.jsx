// import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Section from './Section';
import { Container } from './App.styled';
import { fetchContacts } from 'redux/operations';
import { getError, getIsLoading, getContacts } from 'redux/selectors';

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const contacts = useSelector(getContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <Section title="" header="Phonebook">
        <ContactForm />
      </Section>
      {isLoading && !error && <b>Request in progress...</b>}
      {contacts.length > 0 && (
        <Section header="" title="Contacts">
          <Filter />
          <ContactList />
        </Section>
      )}
    </Container>
  );
};

export default App;
