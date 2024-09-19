const API_BASE_URL = "http://localhost:5001";

// Save or update tokens for a user
export const saveTokens = async (userId, balance) => {
  try {
    if (!userId || balance === null || isNaN(balance)) {
      throw new Error("Invalid token data"); // Prevents bad requests
    }

    const response = await fetch(`${API_BASE_URL}/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, balance }), // Send correct balance
    });

    if (!response.ok) {
      throw new Error("Failed to save tokens");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error saving tokens:", error);
    throw error;
  }
};

// Save or update bux (allPoints) for the user
export const saveBux = async (userId, allPoints) => {
  try {
    if (!userId || allPoints === null || isNaN(allPoints)) {
      throw new Error("Invalid bux data"); // Prevents invalid requests
    }

    const response = await fetch(`${API_BASE_URL}/bux`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, allPoints }), // Send allPoints correctly
    });

    if (!response.ok) {
      throw new Error("Failed to save bux");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error saving bux:", error);
    throw error;
  }
};
