function shortenHex(hex?: string | null, length = 4) {
  if (!hex) return;
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

export default shortenHex;
