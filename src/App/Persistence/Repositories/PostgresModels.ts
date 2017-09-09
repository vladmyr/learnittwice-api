// Queries
import LemmaQueries from './Postgres/Queries/LemmaQueries';
import DefinitionQueries from './Postgres/Queries/DefinitionQueries';
import LanguageQueries from './Postgres/Queries/LanguageQueries';
import SenseQueries from './Postgres/Queries/SenseQueries';
import SynsetQueries from './Postgres/Queries/SynsetQueries';
import CourseQueries from './Postgres/Queries/CourseQueries';
import LessonQueries from './Postgres/Queries/LessonQueries';
import KnowledgeUnitQueries from './Postgres/Queries/KnowledgeUnitQueries';
import CustomPropertyQueries from './Postgres/Queries/CustomPropertyQueries';
import SensePropertyQueries from './Postgres/Queries/SensePropertyQueries';
import PropertyRelationQueries from './Postgres/Queries/PropertyRelationQueries';

// Commands
import LemmaCommands from './Postgres/Commands/LemmaCommands';
import DefinitionCommands from './Postgres/Commands/DefinitionCommands';
import LanguageCommands from './Postgres/Commands/LanguageCommands';
import SenseCommands from './Postgres/Commands/SenseCommands';
import SynsetCommands from './Postgres/Commands/SynsetCommands';
import CourseCommands from './Postgres/Commands/CourseCommands';
import LessonCommands from './Postgres/Commands/LessonCommands';
import KnowledgeUnitCommands from './Postgres/Commands/KnowledgeUnitCommands';
import CustomPropertyCommands from './Postgres/Commands/CustomPropertyCommands';
import SensePropertyCommands from './Postgres/Commands/SensePropertyCommands';

const PostgresModels = {
  LemmaQueries,
  DefinitionQueries,
  LanguageQueries,
  SenseQueries,
  SynsetQueries,
  CourseQueries,
  LessonQueries,
  KnowledgeUnitQueries,
  CustomPropertyQueries,
  SensePropertyQueries,
  PropertyRelationQueries,

  LemmaCommands,
  DefinitionCommands,
  LanguageCommands,
  SenseCommands,
  SynsetCommands,
  CourseCommands,
  LessonCommands,
  KnowledgeUnitCommands,
  CustomPropertyCommands,
  SensePropertyCommands,
}

export default PostgresModels;