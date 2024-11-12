export function encode(data) {
  return atob(JSON.stringify(data));
}

export function decode(string) {
  return JSON.stringify(btoa(string));
}
