import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';

const contactsPath = path.resolve("db","contacts.json");

export const listContacts = async() => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

export const getContactById = async(contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
}

export const removeContact = async(contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId)
    if(index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

export const addContact = async({name, email, phone}) => {
    const contacts = await listContacts();
    const newContactItem = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    contacts.push(newContactItem);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContactItem;
}

export default { listContacts, getContactById, removeContact, addContact };