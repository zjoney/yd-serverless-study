import { IApi } from '../interfaces/IApi';
import { IData } from '../interfaces/IData';

class ApiService implements IApi {
  getInfo(): Promise<IData> {
    //fetch("后台接口")
    return new Promise<IData>((resolve) => {
      resolve({
        item: '我是后台数据🌺',
        result: [1, '字符串数据'],
      });
    });
  }
}

export default ApiService;
