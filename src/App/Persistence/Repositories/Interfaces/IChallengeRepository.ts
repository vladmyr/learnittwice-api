import {
  IAbstractCommands,
  IAbstractQueries
} from 'src/App/Persistence/Repositories/Interfaces/IAbstractRepository';

export type TuChallengeDAO = IChallengeDAO | undefined;

export interface IChallengeKey {
  id: number
}

export interface IChallengeProps {
  knowledgeUnitId: number,
  challengeType: string   // TODO: set type tChallengeType
}

export interface IChallengeDAO 
  extends IChallengeKey, IChallengeProps {}

export interface IChallengeCommands 
  extends IAbstractCommands<IChallengeProps, IChallengeDAO> {}

export interface IChallengeQueries
  extends IAbstractQueries<TuChallengeDAO> {}