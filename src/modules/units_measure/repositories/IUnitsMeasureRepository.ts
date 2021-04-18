import UnitMeasure from '../infra/typeorm/entities/UnitMeasure';

export default interface IUnitsMeasureRepository {
  findAll(): Promise<UnitMeasure[]>;
  findByDescription(description: string): Promise<UnitMeasure[] | undefined>;
  findByType(type: number): Promise<UnitMeasure[] | undefined>;
}
