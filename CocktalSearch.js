import React, { useState } from 'react';

const CocktailSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cocktailSuggestion, setCocktailSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = process.env.OPENAI_API_KEY;

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      alert('Please enter a search query');
      return;
    }

    setIsLoading(true);

    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
          "model": "gpt-3.5-turbo",
          "messages": [{"role": "user", "content": "Say this is a test!"}],
          "temperature": 0.7
      },
      body: JSON.stringify({
        prompt: `Create a cocktail with the following ingredients: ${searchQuery}`,
        max_tokens: 50, // Adjust as needed
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const suggestion = data.choices[0].text;
        setCocktailSuggestion(suggestion);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h1>Cocktail Search</h1>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter cocktail ingredients..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {isLoading && <p>Loading...</p>}
      {cocktailSuggestion && (
        <div>
          <h2>Suggested Cocktail:</h2>
          <p>{cocktailSuggestion}</p>
        </div>
      )}
    </div>
  );
};

export default CocktailSearch;
