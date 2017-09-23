import * as _ from 'lodash';
import Str from 'src/App/Domain/Helpers/Modules/Str';

import { ICustomPropertyProps } 
  from 'src/App/Persistence/Repositories/Interfaces/ICustomPropertyRepository';

import { Tx } 
  from 'src/App/Persistence/Repositories/Interfaces/IAbstractRepository';
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
  public static async CreateOne(props: IProps, t?: Tx) {
    const commandProps: ICustomPropertyProps = _.extend({
      slug: Str.Slugify(props.name)
    }, props);

    return await CustomPropertyCommands.GetInstance().createOne(commandProps, t);
  }

  public static async UpdateOne(id: number, props: IProps, t?: Tx) {

  }

  public static async FindOne(id: number, t?: Tx) {
    return await CustomPropertyQueries.GetInstance().findOne(id, t);
  }

  public static async DeleteOne(id: number, t?: Tx) {

  }

  private constructor() {};
}

export default CustomPropertyService;