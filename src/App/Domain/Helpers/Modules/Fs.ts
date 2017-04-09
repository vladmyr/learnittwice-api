import * as _ from 'underscore';
import * as Promise from 'bluebird';
import * as fs from 'fs';
import * as path from 'path';
// import * as stream from 'stream';

// interface IScanDirOptions {
//   includes?: Array<string>
//   excludes?: Array<string>
// }

class Fs {
  /**
   * Read whole file
   * @param {String}  filePath
   * @param {Object}  [options]
   * @returns {Promise}
   */
  public static ReadFile(filePath: string, options: Object = {}): Promise<string> {
    options = _.extend({
      encoding: 'utf8'
    }, options);

    return Promise.fromCallback((callback) => {
      fs.readFile(filePath, options, callback);
    })
  }

  // /**
  //  * Scan each file in a directory
  //  * @param   {String}    pathDir       directory to scan
  //  * @param   {Function}  iterator      function to be executed for each file
  //  * @param   {Object}    [options]
  //  *                        [includes]
  //  *                        [excludes]
  //  * @returns {Promise}
  //  */
  // static ScanDir(pathDir:string, iterator:Function, options:IScanDirOptions): Promise<Object> {
  //   const include = function include(includes:Array<string>, file:string): boolean {
  //     return includes.indexOf(file) !== -1
  //   };
  //   const exclude = function exclude(excludes:Array<string>, file:string): boolean {
  //     return excludes.indexOf(file) === -1;
  //   };

  //   options.excludes = _.map(options.excludes || [], (exclude) => {
  //     return path.basename(exclude, path.extname(exclude));
  //   });

  //   options.includes = _.map(options.includes || [], (exclude) => {
  //     return path.basename(exclude, path.extname(exclude));
  //   });

  //   return new Promise((fulfill, reject) => {
  //     fs.readdir(pathDir, (err, files) => {
  //       if (err) {
  //         return reject(err);
  //       }

  //       return Promise.each(files.filter((file: string) => {
  //         let filter: boolean = true;

  //         file = path.basename(file, path.extname(file));

  //         if (options.includes.length && options.excludes.length) {
  //           filter = include(options.includes, file) && exclude(options.excludes, file);
  //         } else if(options.includes.length) {
  //           filter = include(options.includes, file);
  //         } else if(options.excludes.length) {
  //           filter = exclude(options.excludes, file);
  //         }

  //         return filter;
  //       }), (file: string) => {
  //         const basename = path.basename(file, path.extname(file));
  //         return iterator(file, basename);
  //       }).then(fulfill);
  //     })
  //   });
  // }

  /**
   * Create directory. Method is fulfilled if directory already exists
   * @param   {String}  dir
   * @returns {Promise}
   */
  public static Mkdir (dir:string): Promise<Object>{
    return new Promise((fulfill, reject) => {
      fs.mkdir(dir, function(err){
        if(!err || err.code === "EEXIST"){
          return fulfill();
        }else{
          return reject();
        }
      });
    });
  }

  public static ReaddirRecursively(dir: string) /*: Promise<string[]> */ {
    return Promise.fromCallback((resolver) => {
      return fs.readdir(dir, resolver);
    })
    .then((list: string[]) => {
      if (!list.length) {
        return [];
      }

      return Promise.reduce(list, (accumulator, listItem) => {
        const pathItem = path.resolve(dir, listItem);
        return Promise.fromCallback((resolver) => {
          return fs.stat(pathItem, resolver);
        })
        .then((stat) => {
          if (!stat) {
            // stats were not obtained
            return accumulator;
          } else if (stat.isDirectory()) {
            // pathItem is a directory
            return Fs
              .ReaddirRecursively(pathItem)
              .then((arrDir) => {
                return accumulator.concat(arrDir);
              })
          } else {
            // pathItem is a file
            accumulator.push(pathItem);
            return accumulator
          }
        });
      }, []);
    });
  }
}

export default Fs;