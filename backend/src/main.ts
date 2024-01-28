import fastifySwagger from '@fastify/swagger';
import { globalContainer } from './container/global-container';
import { TOKENS } from './container/tokens';
import { swaggerOptions, swaggerUiOptions } from './common/configurations/swagger.configuration';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import cors from '@fastify/cors';
import { corsOptions } from './common/configurations/cors.configuration';

async function main() {
  const application = globalContainer.get(TOKENS.application);

  //cors plugin
  application.registerPlugins(cors, corsOptions);

  //swager plugin
  application.registerPlugins(fastifySwagger, swaggerOptions);
  application.registerPlugins(fastifySwaggerUi, swaggerUiOptions);

  //start
  application.bindRouts();
  await application.app.ready();
  application.app.swagger();

  await application.init();
}

try {
  main();
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
