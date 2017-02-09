class ArrayUtil {
  /**
   * Slice array into array of chunks
   * @param   {Array}   arr
   * @param   {Number}  chunkSize
   * @returns {Array}
   */
  static Chunk<T>(arr: T[], chunkSize: number = 1): T[][] {
    let chunks: T[][] = [];
    let chunkIndex = 0;
    const totalChunks = Math.ceil(arr.length / chunkSize);

    if (chunkSize < 1) {
      chunkSize = arr.length;
    }

    for (; chunkIndex < totalChunks; chunkIndex++) {
      chunks.push(
        arr.slice(chunkIndex * chunkSize, chunkIndex * chunkSize + chunkSize)
      );
    }

    return chunks;
  }
}

export default ArrayUtil;