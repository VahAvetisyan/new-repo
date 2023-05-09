function Responsive() {
  if (window.innerWidth <= 1441) {
    return 3
  } else if (window.innerWidth <= 800) {
    return 2
  }
}
export default Responsive
