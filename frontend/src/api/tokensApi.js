const API_BASE_URL = "http://localhost:5001"; // Your backend should be running here

/**
 * Function to save or update user's tokens
 * @param {number} userId - The ID of the user
 * @param {number} balance - The number of tokens to save
 * @returns {Promise<object>} - The saved token data or an error object
 */
export const saveTokens = async (userId, balance) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON data format
      },
      body: JSON.stringify({ userId, balance }), // Convert body data to JSON
    });

    if (!response.ok) {
      // Check for HTTP errors
      throw new Error("Failed to save tokens");
    }

    // Return the response parsed as JSON
    return await response.json();
  } catch (error) {
    console.error("Error saving tokens:", error);
    throw error;
  }
};

// Add this function below saveTokens
export const saveBux = async (userId, balance) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bux`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, balance }), // Send userId and balance (Bux)
    });

    if (!response.ok) {
      throw new Error("Failed to save bux");
    }

    // Return the parsed response in JSON
    return await response.json();
  } catch (error) {
    console.error("Error saving bux:", error);
    throw error;
  }
};
