function removeSrc(imgs) {
  imgs.forEach(img => {
    if (img.src) {
      img.dataset.src = img.src;
      img.src = '';
    }
  });
}

export { removeSrc };
