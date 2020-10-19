import UnitMeasure from '../infra/typeorm/entities/UnitMeasure';

/**
 * These are the methods to the units measure repository
 */
export default interface IUnitsMeasureRepository {
  /**
   * Finds all the units measure
   */
  findAll(): Promise<UnitMeasure[]>;

  /**
   * Finds a specific units measure by it's name
   * @param name unit measure name
   */
  findByDescription(description: string): Promise<UnitMeasure[] | undefined>;

  /**
   * Finds units measure by the type number
   * @param type unit measure type
   */
  findByType(type: number): Promise<UnitMeasure[] | undefined>;
}
