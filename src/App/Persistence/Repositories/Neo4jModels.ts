import LemmaCommandsGph from './Neo4j/Commands/LemmaCommandsGph';
import LexemeFormCommandsGph from './Neo4j/Commands/LexemeFormCommandsGph';
import SenseCommandsGph from './Neo4j/Commands/SenseCommandsGph';
import SynsetCommandsGph from './Neo4j/Commands/SynsetCommandsGph';
import DefinitionCommandsGph from './Neo4j/Commands/DefinitionCommandsGph';
import LanguageCommandsGph from './Neo4j/Commands/LanguageCommandsGph';

import LemmaQueriesGph from './Neo4j/Queries/LemmaQueriesGph';
// import LexemeFormQueriesGph from './Neo4j/Queries/LexemeFormQueriesGph';
// import SenseQueriesGph from './Neo4j/Queries/SynsetQueriesGph';
// import SynsetQueriesGph from './Neo4j/Queries/SynsetQueriesGph';
// import DefinitionQueriesGph from './Neo4j/Queries/DefinitionQueriesGph';
// import LanguageQueriesGph from './Neo4j/Queries/LanguageQueriesGph';

const Neo4jModels = {
  LemmaCommandsGph,
  LexemeFormCommandsGph,
  SenseCommandsGph,
  SynsetCommandsGph,
  DefinitionCommandsGph,
  LanguageCommandsGph,

  LemmaQueriesGph
}

export default Neo4jModels;