export function getQueryProps(location = window.location.href) {
  return location
    .split("?")
    .pop()
    .split("&")
    .reduce((acc, e) => {
      const key = e.slice(0, e.indexOf("="));
      const value = e.slice(e.indexOf("=") + 1);
      if (key in acc) {
        return {
          ...acc,
          [key]:
            typeof acc[key] === "string"
              ? [acc[key], value]
              : [...acc[key], value],
        };
      }
      return {
        ...acc,
        [key]: value,
      };
    }, {});
}
