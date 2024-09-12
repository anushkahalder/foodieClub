import React, { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (prompt) => {
  const [ans, SetAns] = useState([]);

  useEffect(() => {
    const savedFoods = JSON.parse(localStorage.getItem('foods'));
    console.log(savedFoods, "localStorage data");

    if (prompt !== "" || !savedFoods) {
      if (prompt === "reset") {
        localStorage.removeItem('foods');
        SetAns([]); // Clear state after reset
      } else {
        getData();
      }
    } else {
      SetAns(savedFoods); // Use cached data if available
    }
  }, [prompt]);

  const getData = async () => {
    try {
      console.log(prompt);

      const res = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDcl1woSS5T4WQTI6XtQgz4SpmQRqlfdvc",
        method: "POST",
        data: { "contents": [{ "parts": [{ "text": prompt }] }] }
      });

      let responseText = res.data.candidates[0].content.parts[0].text;

      // Clean and parse response
      responseText = responseText.replace(/```json|```/g, "").trim();
      responseText = responseText.replace(/\n/g, "");
      const parsedData = JSON.parse(responseText);

      console.log(parsedData, "formatted response");
      
      // Cache data in localStorage and update state
      localStorage.setItem('foods', JSON.stringify(parsedData));
      SetAns(parsedData);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return ans;
};

export default useFetch;
