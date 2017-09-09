import { IDatabase } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TuLessonDAO, ILessonQueries } 
  from 'src/App/Persistence/Repositories/Interfaces/ILessonRepository';
import AbstractQueries from './AbstractQueries';

class LessonQueries extends AbstractQueries<TuLessonDAO> {
  protected static readonly TableName = TableName.LESSON;
  protected static Instacne: ILessonQueries

  public static GetInstance(db?: IDatabase<{}>): ILessonQueries {
    return super.GetInstance(db, LessonQueries);
  }
}

export default LessonQueries;