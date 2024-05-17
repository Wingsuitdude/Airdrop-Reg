import React, { useState, useEffect } from 'react';

interface AddressEntry {
  address: string;
  ip: string;
}

const AddressBook: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [addressBook, setAddressBook] = useState<AddressEntry[]>([]);

  useEffect(() => {
    const storedAddresses = localStorage.getItem('addressBook');
    if (storedAddresses) {
      const parsedAddresses = JSON.parse(storedAddresses);
      setAddressBook(parsedAddresses);
      console.log('Address Book:', parsedAddresses); // Log to console for testing
    }
  }, []);

  const handleAddAddress = () => {
    const userIP = getUserIP();
    if (addressBook.some(entry => entry.ip === userIP)) {
      setMessage('You may only claim airdrop once per IP');
      return;
    }

    const newAddressBook = [...addressBook, { address, ip: userIP }];
    setAddressBook(newAddressBook);
    localStorage.setItem('addressBook', JSON.stringify(newAddressBook));
    setMessage('Address added successfully');
    setAddress('');
  };

  const getUserIP = (): string => {
    // Simulating getting the user's IP. In a real scenario, you'd use a service to get the user's IP address.
    return 'user-simulated-ip'; // This should be replaced with the actual IP address fetching logic.
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/10 h-1/10 bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-xl font-bold mb-4">$DRIPPY Airdrop Registration</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Recieving BASE Wallet</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border border-black rounded placeholder-gray-400"
            placeholder="Input your address here"
          />
        </div>
        <button
          onClick={handleAddAddress}
          className="px-4 py-2 bg-yellow-500 text-black border border-black rounded"
        >
          Register
        </button>
        {message && (
          <p className="mt-4 text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AddressBook;
