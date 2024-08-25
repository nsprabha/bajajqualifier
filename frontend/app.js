import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [apiInput, setApiInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const data = JSON.parse(apiInput);
            const apiUrl = 'https://your-backend-api-url.herokuapp.com/bfhl'; // Replace with your backend API URL
            const response = await axios.post(apiUrl, { data });
            setResponse(response.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOptionChange = (event) => {
        setSelectedOptions(Array.from(event.target.selectedOptions, option => option.value));
    };

    return (
        <div className="container">
            <h1>Frontend Application</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="apiInput">JSON Input:</label>
                    <textarea 
                        id="apiInput" 
                        value={apiInput} 
                        onChange={(e) => setApiInput(e.target.value)} 
                        className="form-control" 
                        rows="5" 
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
            </form>
            {response && (
                <div className="response">
                    <h2>Response:</h2>
                    {response.is_success ? (
                        <>
                            <p>Status: Success</p>
                            <p>User ID: {response.user_id}</p>
                            <p>Email: {response.email}</p>
                            <p>Roll Number: {response.roll_number}</p>
                            <div className="options">
                                <label htmlFor="options">Select Options:</label>
                                <select multiple id="options" value={selectedOptions} onChange={handleOptionChange}>
                                    {response.numbers.length > 0 && <option value="numbers">Numbers</option>}
                                    {response.alphabets.length > 0 && <option value="alphabets">Alphabets</option>}
                                    {response.highest_lowercase_alphabet.length > 0 && <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>}
                                </select>
                            </div>
                            <div className="output">
                                {selectedOptions.includes('numbers') && (
                                    <p>Numbers: {response.numbers.join(', ')}</p>
                                )}
                                {selectedOptions.includes('alphabets') && (
                                    <p>Alphabets: {response.alphabets.join(', ')}</p>
                                )}
                                {selectedOptions.includes('highest_lowercase_alphabet') && (
                                    <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>
                                )}
                            </div>
                        </>
                    ) : (
                        <p>Status: Failed</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;