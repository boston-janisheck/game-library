const API_BASE_URL = "http://localhost:5001"; // Backend API

// Save or update user's tokens (validated and corrected payload)
export const saveTokens = async (userId, balance) => {
  // Log initial payload data
  console.log("Sending Tokens Payload:", { userId, balance });

  if (!userId || balance === null || isNaN(balance)) {
    console.error("Invalid token data:", { userId, balance });
    throw new Error("Invalid token data");
  }

  const payload = { userId, balance };
  // Log payload before sending API request
  console.log("Sending (Tokens API call):", payload);

  try {
    const response = await fetch(`${API_BASE_URL}/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // Ensure proper balance is sent
    });

    if (!response.ok) {
      console.error("Failed to save tokens. Status:", response.status);
      throw new Error("Failed to save tokens");
    }

    const data = await response.json();
    console.log("Tokens save success response:", data);
    return data;
  } catch (error) {
    console.error("Error saving tokens:", error);
    throw error;
  }
};

// Save or update user's bux (ensure valid allPoints)
export const saveBux = async (userId, allPoints) => {
  // Log initial payload data
  console.log("Sending Bux Payload:", { userId, allPoints });

  if (!userId || allPoints === null || isNaN(allPoints)) {
    console.error("Invalid bux data:", { userId, allPoints });
    throw new Error("Invalid bux data");
  }

  const payload = { userId, allPoints };
  // Log payload before sending API request
  console.log("Sending (Bux API call):", payload);

  try {
    const response = await fetch(`${API_BASE_URL}/bux`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // Properly structured payload
    });

    if (!response.ok) {
      console.error("Failed to save bux. Status:", response.status);
      throw new Error("Failed to save bux");
    }

    const data = await response.json();
    console.log("Bux save success response:", data);
    return data;
  } catch (error) {
    console.error("Error saving bux:", error);
    throw error;
  }
};
