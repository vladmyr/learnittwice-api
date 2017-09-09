import { IDatabase } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { ILessonProps, TuLessonDAO, ILessonCommands } 
  from 'src/App/Persistence/Repositories/Interfaces/ILessonRepository';
import AbstractCommands from './AbstractCommands';

class LessonCommands 
  extends AbstractCommands<ILessonProps, TuLessonDAO> {
    protected static readonly TableName = TableName.LESSON;
    protected static Instance: ILessonCommands;

    public static GetInstance(db?: IDatabase<{}>): ILessonCommands {
      return super.GetInstance(db, LessonCommands);
    }
}

export default LessonCommands;