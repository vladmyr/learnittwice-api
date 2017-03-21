import { CommandQueryBase } from '../CommandQueryBase';

export abstract class CommandsBase extends CommandQueryBase {
  protected readonly _INSERT_CHUNK_SIZE = 50;
}