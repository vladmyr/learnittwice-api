import { IDatabase } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TuCourseDAO, ICourseQueries } 
  from 'src/App/Persistence/Repositories/Interfaces/ICourseRepository';
import AbstractQueries from './AbstractQueries';

class CourseQueries extends AbstractQueries<TuCourseDAO> {
  protected static readonly TableName = TableName.COURSE;
  protected static Instacne: ICourseQueries

  public static GetInstance(db?: IDatabase<{}>): ICourseQueries {
    return super.GetInstance(db, CourseQueries);
  }
}

export default CourseQueries;