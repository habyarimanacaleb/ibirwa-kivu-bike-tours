export const limitByWords = (text, maxWords = 8) => {
  const words = text.split(/\s+/); // Splits by any whitespace
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '';
};