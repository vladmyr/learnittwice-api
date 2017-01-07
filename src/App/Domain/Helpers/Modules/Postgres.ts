class Postgres {
  public static FormatName(tableName: string | string[]):string {
    const arrTableName = Array.isArray(tableName)
      ? tableName
      : [tableName] 

    return arrTableName.map((tableName) => {
      return `"${tableName}"`;
    }).join(',')
  }

  public static FormatArray(arr: any[] = []) {
    if (!arr.length) { return ''; }

    const isStringType = typeof arr[0] == 'string';

    return arr.map((item) => {
      return isStringType ? `'${item}'` : item;
    }).join(',');
  }
}

export default Postgres;