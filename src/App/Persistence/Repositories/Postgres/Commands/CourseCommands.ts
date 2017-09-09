import { IDatabase } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { ICourseProps, TuCourseDAO, ICourseCommands } 
  from 'src/App/Persistence/Repositories/Interfaces/ICourseRepository';
import AbstractCommands from './AbstractCommands';

class CourseCommands 
  extends AbstractCommands<ICourseProps, TuCourseDAO> {
    protected static readonly TableName = TableName.COURSE;
    protected static Instance: ICourseCommands;

    public static GetInstance(db?: IDatabase<{}>): ICourseCommands {
      return super.GetInstance(db, CourseCommands);
    }
}

export default CourseCommands;