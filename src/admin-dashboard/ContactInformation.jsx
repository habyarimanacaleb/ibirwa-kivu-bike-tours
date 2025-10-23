import React, { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../admin-panel/MainLayout";

const ContactInformation = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "https://demo.ibirwakivubiketours.com/api/contacts"
        );
        setContacts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleResponseSubmit = async (e) => {
    e.preventDefault();
    if (!selectedContact || !responseMessage) return;

    try {
      const response = await axios.post(
        "https://demo.ibirwakivubiketours.com/api/respond",
        {
          contactId: selectedContact._id,
          responseMessage,
        }
      );

      if (response.status === 200) {
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact._id === selectedContact._id
              ? { ...contact, responded: true, responseMessage }
              : contact
          )
        );
        setResponseMessage("");
        setSelectedContact(null);
      }
    } catch (error) {
      console.error("Error responding to contact:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching contacts: {error.message}</div>;
  }

  return (
    <MainLayout>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Contact Information</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <div key={contact._id} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">{contact.name}</h2>
            <p className="text-sm text-gray-500">{contact.email}</p>
            <p className="text-sm text-gray-500">{contact.message}</p>
            {contact.responded ? (
              <p className="text-green-500 mt-2">
                Responded: {contact.responseMessage}
              </p>
            ) : (
              <button
                onClick={() => setSelectedContact(contact)}
                className="text-blue-500 mt-2 inline-block"
              >
                Respond
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedContact && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">
            Respond to {selectedContact.name}
          </h2>
          <form onSubmit={handleResponseSubmit}>
            <textarea
              value={responseMessage}
              onChange={(e) => setResponseMessage(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-4"
              placeholder="Type your response here..."
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Send Response
            </button>
          </form>
        </div>
      )}
    </div>
    </MainLayout>
  );
};

export default ContactInformation;
