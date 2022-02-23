function CheckImage(file) {
  if (file.size > 1024 * 1024) {
    alert('Välj en mindre fil');
    return false;
  }
  else {
    return true;
  }
}

export { CheckImage as C };
