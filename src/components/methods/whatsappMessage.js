const whatsappMessage = (venue) => {
  return `https://api.whatsapp.com/send?text=Hey! Let's meet at ${venue.name} on ${venue.vicinity}`
};

export { whatsappMessage };
