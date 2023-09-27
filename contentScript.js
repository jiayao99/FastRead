function makeFirstHalfBold(text) {
    const words = text.split(/\s+/);
    return words
      .map((word) => {
        const subWords = word.split('-');
        return subWords
          .map((subWord) => {
            const cleanSubWord = subWord.replace(/<[^>]*>?/gm, '').replace(/[^\w\s]/gi, '');
            const half = Math.ceil(cleanSubWord.length / 2);
            const bold = cleanSubWord.slice(0, half);
            const normal = cleanSubWord.slice(half);
            return subWord.replace(cleanSubWord, `<b>${bold}</b>${normal}`);
          })
          .join('-');
      })
      .join(' ');
  }
  
  function shouldProcessNode(node) {
    if (node.nodeType !== Node.TEXT_NODE) return false;
    if (!node.parentNode) return false;
    const parentNodeName = node.parentNode.nodeName.toLowerCase();
    return parentNodeName !== 'script' && parentNodeName !== 'style';
  }
  
  function processNode(node) {
    if (shouldProcessNode(node)) {
      const newElement = document.createElement('span');
      newElement.innerHTML = makeFirstHalfBold(node.textContent);
      node.parentNode.replaceChild(newElement, node);
    } else {
      Array.from(node.childNodes).forEach(processNode);
    }
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "applyEffect") {
      processNode(document.body);
    }
  });
  