const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const writeDataToFile = data => fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

const getContactById = async (id) => {
    const books = await listContacts();
    const result = books.find(item => item.id === id);
    return result || null;
}

const addContact = async (data) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,
    }
    contacts.push(newContact);
    await writeDataToFile(contacts);
    return newContact;
}

const updateContact = async (id, data) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);    
    if(idx === -1) return null;

    contacts[idx] = {id, ...data};
    await writeDataToFile(contacts);
    return contacts[idx];
}

const removeContact = async (id) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);    
    if(idx === -1) return null;

    const [result] = contacts.splice(idx, 1);
    await writeDataToFile(contacts);
    return result;
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact,
}
