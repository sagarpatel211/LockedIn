const nlpModel = (() => {
  const bragKeywords = [
    "achievement", "accomplishment", "proud", "success", "award", "promotion", "celebrate", "milestone"
  ];
  
  function isBragging(text) {
    const lowerText = text.toLowerCase();
    let count = 0;
    bragKeywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        count++;
      }
    });
    return count >= 2;
  }
  
  return {
    isBragging
  };
})();
