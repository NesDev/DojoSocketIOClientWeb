export class Utils {
  static sleep(ms = 0) {
    return new Promise((r) => setTimeout(r, ms));
  }

  static randomString(len: number, bits: number = 36) {
    let outStr = '';
    let newStr;
    while (outStr.length < len) {
      newStr = Math.random().toString(bits).slice(2);
      outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
    }
    return outStr;
  }

  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  static getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
  static getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static readableString(length: number) {
    const VOWELS = 'aeiouy'.split('');
    const CONSONANTS = 'bcdfghjklmnprstvwxz'.split('');
    const VOWELS_LENGTH = VOWELS.length;
    const CONSONANTS_LENGTH = CONSONANTS.length;

    let randomstring = '';
    const salt = Math.floor(Math.random() * 2);
    for (let i = length + salt, end = 0 + salt; i > end; i -= 1) {
      if (i % 2 === 0) {
        randomstring += CONSONANTS[Math.floor(Math.random() * CONSONANTS_LENGTH)];
      } else {
        randomstring += VOWELS[Math.floor(Math.random() * VOWELS_LENGTH)];
      }
    }

    return randomstring;
  }

  static insertAt(main: string, index: number, text: string) {
    return main.substr(0, index) + text + main.substr(index);
  }

  static generatePassword(lowercase: number, uppercase: number, numerics: number) {
    const lowers = 'abcdefghijklmnopqrstuvwxyz';
    const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    let generated = '!';
    for (let i = 1; i <= lowercase; i++) {
      generated = Utils.insertAt(generated, Utils.getRandomInt(0, generated.length),
        lowers.charAt(Utils.getRandomInt(0, lowers.length - 1)));
    }

    for (let i = 1; i <= uppercase; i++) {
      generated = Utils.insertAt(generated, Utils.getRandomInt(0, generated.length),
        uppers.charAt(Utils.getRandomInt(0, uppers.length - 1)));
    }

    for (let i = 1; i <= numerics; i++) {
      generated = Utils.insertAt(generated, Utils.getRandomInt(0, generated.length),
        numbers.charAt(Utils.getRandomInt(0, numbers.length - 1)));
    }

    return generated.replace('!', '');
  }

  public static toTimestamp(strDate) {
    const date = new Date(strDate);
    return date.getTime();
  }
}
