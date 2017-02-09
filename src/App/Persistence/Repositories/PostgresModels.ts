import LemmaQueries from './Postgres/Queries/LemmaQueries';
import DefinitionQueries from './Postgres/Queries/DefinitionQueries';
import LanguageQueries from './Postgres/Queries/LanguageQueries';
import SenseQueries from './Postgres/Queries/SenseQueries';
import SynsetQueries from './Postgres/Queries/SynsetQueries';

import LemmaCommands from './Postgres/Commands/LemmaCommands';
import DefinitionCommands from './Postgres/Commands/DefinitionCommands';
import LanguageCommands from './Postgres/Commands/LanguageCommands';
import SenseCommands from './Postgres/Commands/SenseCommands';
import SynsetCommands from './Postgres/Commands/SynsetCommands';


const PostgresModels = {
  LemmaQueries,
  DefinitionQueries,
  LanguageQueries,
  SenseQueries,
  SynsetQueries,

  LemmaCommands,
  DefinitionCommands,
  LanguageCommands,
  SenseCommands,
  SynsetCommands
}

export default PostgresModels;