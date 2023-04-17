import Contact from '../models/contact.js';

export const getContactList = async () => {
    const contacts = await Contact.find({});

    if (contacts) {
        return contacts;
    } else {
        return null;
    }
}

export const createNewContact = (param) => {
    try {
        const contact = new Contact({
            name: param.name,
            email: param.email,
            phone: param.phone,
            address: param.address,
            created: Date.now
        });
    
        contact.save();
    
        return contact;   
    } catch (error) {
        return error;
    }
}

export const getContact = async (id) => {
    const contact = await Contact.findById(id);

    if (contact) {
        return contact;
    } else {
        return null;
    }
}

export const updateContact = async (id, param) => {
    try {
        const contact = await Contact.findByIdAndUpdate(id, {
            name: param.name,
            email: param.email,
            phone: param.phone,
            address: param.address
        });

        return contact;
    } catch (error) {
        return error;
    }
}

export const deleteContact = async (id) => {
    try {
        const contact = await Contact.findByIdAndRemove(id);

        return contact;
    } catch (error) {
        return error;
    }
}