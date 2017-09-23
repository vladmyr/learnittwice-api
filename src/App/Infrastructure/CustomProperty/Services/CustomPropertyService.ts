import * as _ from 'lodash';
import Str from 'src/App/Domain/Helpers/Modules/Str';

import { ICustomPropertyProps } 
  from 'src/App/Persistence/Repositories/Interfaces/ICustomPropertyRepository';

import CustomPropertyCommands 
  from 'src/App/Persistence/Repositories/Postgres/Commands/CustomPropertyCommands';
import CustomPropertyQueries 
  from 'src/App/Persistence/Repositories/Postgres/Queries/CustomPropertyQueries';

interface IProps {
  knowledgeUnitId: ICustomPropertyProps['knowledgeUnitId'],
  propertyRelationId: ICustomPropertyProps['propertyRelationId'],
  dataType: ICustomPropertyProps['dataType'],
  name: ICustomPropertyProps['name'],
  value: ICustomPropertyProps['value'],
}

class CustomPropertyService {
  public static async CreateOne(props: IProps) {
    const commandProps: ICustomPropertyProps = _.extend({
      slug: Str.Slugify(props.name)
    }, props);

    return await CustomPropertyCommands.GetInstance().createOne(commandProps);
  }

  public static async UpdateOne(id: number, props: IProps) {

  }

  public static async FindOne(id: number) {
    return await CustomPropertyQueries.GetInstance().findOne(id);
  }

  public static async DeleteOne(id: number) {

  }

  private constructor() {};
}

export default CustomPropertyService;