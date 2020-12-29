function checkDOMChanges(callback) {
  const observer = new MutationObserver(callback)
  const body = document.querySelector('body')
  const observerOptions = {
    childList: true,
    subtree: true
  }

  observer.observe(body, observerOptions)
}

export { checkDOMChanges }
