import { LoadStrategy, Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Logger } from '@nestjs/common';
import { TSMigrationGenerator } from '@mikro-orm/migrations';


const logger = new Logger("MikroORM");
const config = {
  type: 'postgresql',
  host: 'localhost',
  port: 5432,
  user: 'sourabh',
  password: 'Rai@1300',
  dbName: 'presentation',
  entities:['dist/modules/auth/entities','dist/modules/user/entities'],
  entitiesTs: ['./src/modules/user/entities','./src/modules/auth/entities'],
  debug: true,
  allowGlobalContext: true,
  multipleStatements: true,
  highlighter: new SqlHighlighter(),
  loadStrategy: LoadStrategy.JOINED,
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations', 
    glob: '!(*.d).{js,ts}',
    transactional: true,
    disableForeignKeys: false,
    dropTables: true,
    allOrNothing: true,
    snapshot: false,
    emit: 'ts',
    generator: TSMigrationGenerator,
  },
  discovery: {
    warnWhenNoEntities: false, 
    requireEntitiesArray: false,
  },
  logger: logger.log.bind(logger),
} as Options;

export default config;
