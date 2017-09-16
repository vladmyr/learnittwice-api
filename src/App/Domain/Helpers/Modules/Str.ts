import * as Slug from 'slug';

Slug.defaults.mode = 'rfc3986';
Slug.defaults.modes.rfc3986.replacement = '_';

class Str {
  // /**
  //  * Match all regex occurrences in string
  //  * @param string
  //  * @param regexp
  //  */
  // static MatchAll (str: string, regexp: RegExp) {
  //   let matches = [];

  //   str.replace(regexp, () => {
  //     let arr = [].slice.call(arguments, 0);
  //     let extras = arr.slice(-2);
  //     arr.index = extras[0];
  //     arr.input = extras[1];
  //     matches.push(arr);
  //   });

  //   return matches;
  // }

  public static * SplitIterable(str = '', char = ';') {
    let index = str.indexOf(char) + 1;

    if (index == 0) {
      yield str;
    }

    while (index != 0) {
      yield str.substr(0, index);
      str = str.slice(index);
      index = str.indexOf(char) + 1;
    }
  }

  public static Slugify (str = ''): string {
    return Slug(str);
  }
}

export default Str;