// awilix
import Koa from 'koa';
import { createContainer, Lifetime } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-koa';
import render from 'koa-swig';
import co from 'co';
import serve from 'koa-static';
import { historyApiFallback } from 'koa2-connect-history-api-fallback';

const app = new Koa();
app.use(serve('./assets'));
const container = createContainer();

app.context.render = co.wrap(
  render({
    root: './views',
    autoescape: true,
    cache: 'memory',
    writeBody: false,
    ext: 'html',
  })
);

container.loadModules([`${__dirname}/services/*.ts`], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
});
app.use(scopePerRequest(container));
app.use(historyApiFallback({ index: '/', whiteList: ['/api'] }));
app.use(loadControllers(`${__dirname}/routers/*.ts`));

app.listen(8080, () => {
  console.log('京程一灯Server BFF启动成功');
});
