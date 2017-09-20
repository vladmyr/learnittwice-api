import * as Url from 'url';
import config from 'config';

class HttpTestUtil {
  public static ResolveDomain(pathname = ''): string {
    return Url.format({
      protocol: config.server.api.protocol,
      hostname: config.server.api.host,
      port: config.server.api.port,
      pathname
    })
  }
}

export default HttpTestUtil;