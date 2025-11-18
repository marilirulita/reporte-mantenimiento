const shortenText = (text: string | undefined, max: number) => {
  if (!text) return "";
  return text.length > max ? text.substring(0, max) + "..." : text;
};

export default shortenText;