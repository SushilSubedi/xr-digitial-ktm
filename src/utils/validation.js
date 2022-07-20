export const required =
  (text = 'required') =>
  (value) =>
    value ? undefined : text;
