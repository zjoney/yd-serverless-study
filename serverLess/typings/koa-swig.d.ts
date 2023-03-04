declare module 'koa-swig' {
  function redner(value: renderer.DefaultSettings): any;

  namespace renderer {
    interface DefaultSettings {
      autoescape: boolean;
      root: string;
      cache: string | boolean;
      ext: string;
      writeBody: boolean;
      memory?: string | boolean;
    }
  }
  export default redner;
}
