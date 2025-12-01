export const createMessage = (type, text, username = null) => {
  const message = {
    type,
    text,
    timestamp: new Date().toISOString(),
  };

  if (username) {
    message.username = username;
  }

  return message;
};

export const parseClientMessage = (rawData) => {
  try {
    const data = JSON.parse(rawData);
    if (!data.type) return null;
    return data;
  } catch (error) {
    console.error("Invalid JSON received:", rawData);
    return null;
  }
};
