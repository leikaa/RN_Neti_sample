export default function hexToRGBA(hex: string, alpha: number) {
  let c = hex;

  if (c.length === 4) {
    c = `#${c[1]}${c[1]}${c[2]}${c[2]}${c[3]}${c[3]}`;
  }

  if (c.length !== 7) {
    return hex;
  }

  const r = parseInt(c.slice(1, 3), 16);
  const g = parseInt(c.slice(3, 5), 16);
  const b = parseInt(c.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
