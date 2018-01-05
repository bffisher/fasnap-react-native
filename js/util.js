export class Util{

  static str2date(text) {
    return new Date(text);
  }

  static date2str(date) {
    return date.toISOString().substr(0, 10);
  }
}