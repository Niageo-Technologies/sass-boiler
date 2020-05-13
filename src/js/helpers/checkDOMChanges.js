function checkDOMChanges(callback) {
  const observer = new MutationObserver(callback);
  const body = document.body;
  const observerOptions = {
    // attributes: true,
    // characterData: true
    childList: true,
    subtree: true
  };

  observer.observe(body, observerOptions);
}

export { checkDOMChanges };
