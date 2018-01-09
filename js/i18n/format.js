export default function (text, args) {
  if (args && args.length > 0) {
    for (let i = 0; i < args.length; i++) {
      text = text.replace('{' + i + '}', args[i]);
    }
  }

  return text;
};