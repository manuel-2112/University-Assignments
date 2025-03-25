const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

const app = new Koa();
const router = new Router();

// Middleware
app.use(cors()); 
app.use(bodyParser());
app.use(async (ctx, next) => {
  ctx.response.set('Access-Control-Allow-Origin', '*');
  ctx.response.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  ctx.response.set('Access-Control-Allow-Headers', 'Content-Type');
  ctx.response.set('Access-Control-Max-Age', '3600');
  await next();
});

// Ruta de suma
router.get('/suma/:num1/:num2', (ctx) => {
  const num1 = parseInt(ctx.params.num1);
  const num2 = parseInt(ctx.params.num2);

  // Validar si los números son válidos
  if (isNaN(num1) || isNaN(num2)) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      result: 'Los parámetros deben ser números válidos'
    };
  } else {
    const resultado = num1 + num2;
    ctx.body = {
      status: 200,
      result: resultado.toString()
    };
  }
});

// Ruta de multiplicacion
router.get('/multiplicacion/:num1/:num2', (ctx) => {
  const num1 = parseInt(ctx.params.num1);
  const num2 = parseInt(ctx.params.num2);

  if (isNaN(num1) || isNaN(num2)) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      result: 'Los parámetros deben ser números válidos'
    };
  } else {
    const resultado = num1 * num2;
    ctx.body = {
      status: 200,
      result: resultado.toString()
    };
  }
});

// Ruta de division
router.post('/division', (ctx) => {
    const { num1, num2 } = ctx.request.body;
  
    if (isNaN(num1) || isNaN(num2) || num2 === 0) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        result: isNaN(num1) || isNaN(num2) ? 'Los parámetros deben ser números válidos' : 'No se puede realizar una división por 0'
      };
    } else {
      const resultado = num1 / num2;
      ctx.body = {
        status: 200,
        num1,
        num2,
        result: resultado.toString()
      };
    }
  }); 
    

// Ruta de resta
router.post('/resta', (ctx) => {
    const { num1, num2 } = ctx.request.body;
  
    // Validar si los números son válidos
    if (isNaN(num1) || isNaN(num2)) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        result: 'Los parámetros deben ser números válidos'
      };
    } else {
      const resultado = num1 - num2;
      ctx.body = {
        status: 200,
        num1,
        num2,
        result: resultado.toString()
      };
    }
  });  


// Rutas de app
app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (err, ctx) => {
  console.error('Error:', err);
  ctx.status = err.status || 500;
  ctx.body = {
    status: ctx.status,
    result: err.message
  };
});

// Iniciar el servidor en puerto 80
app.listen(80, () => {
  console.log('API en funcionamiento');
});
