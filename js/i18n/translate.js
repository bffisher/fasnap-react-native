export default function (langPackage, content) {
  var tid, keys, args, text = '';

  if(!langPackage || !content){
    return text;
  }

  if (typeof content === 'string') {
    keys = content.split('.');
  } else if (typeof content === 'object' && content.tid) {
    keys = content.tid.split('.');
    args = content.args;
  }

  if (keys) {
    text = langPackage;
    for (let i = 0; i < keys.length; i++) {
      if (text[keys[i]]) {
        text = text[keys[i]];
      } else {
        text = '';
        break;
      }
    }
  }

  if (args && args.length > 0) {
    for (let i = 0; i < args.length; i++) {
      text = text.replace('{' + i + '}', args[i]);
    }
  }

  return text;
};