import contactService from './db/contacts.js';
import yargs from 'yargs';

const invokeAction = async({ action, id, name, email, phone }) => {
    switch (action) {
        case 'list':
            const contactList = await contactService.listContacts();
            console.log(contactList);
      break;

        case 'get':
            const contactItem = await contactService.getContactById(id);
            console.log(contactItem);
      break;

        case 'add':
            const newContact = await contactService.addContact({name, email, phone});
            console.log(newContact);
      break;

        case 'remove':
            const delContact = await contactService.removeContact(id);
            console.log(delContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

const { argv } = yargs(process.argv);
invokeAction(argv);
