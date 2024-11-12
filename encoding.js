export function encode(data) {
  return btoa(JSON.stringify(data));
}

export function decode(string) {
  return JSON.parse(atob(string));
}
