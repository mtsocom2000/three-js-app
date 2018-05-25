export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  const color = Array(3);
  for (var i = 0; i < 3; i++) {
    color[i] = letters[Math.floor(Math.random() * 16)];
  }
  return `#${color[0]}${color[0]}${color[1]}${color[1]}${color[2]}${color[2]}`;
}
