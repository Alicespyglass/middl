const whatsappMessage = (venueName, venueVicinity) => {
  return `https://api.whatsapp.com/send?text=Hey! Let's meet at ${venueName} on ${venueVicinity}`
};

export { whatsappMessage };
