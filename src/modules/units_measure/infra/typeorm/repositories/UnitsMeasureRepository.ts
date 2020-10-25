import IUnitsMeasureRepository from '@modules/units_measure/repositories/IUnitsMeasureRepository';
import { getRepository, Repository } from 'typeorm';
import UnitMeasure from '../entities/UnitMeasure';

class UnitsMeasureRepository implements IUnitsMeasureRepository {
  private ormRepository: Repository<UnitMeasure>;

  constructor() {
    this.ormRepository = getRepository(UnitMeasure);
  }

  public async findAll(): Promise<UnitMeasure[]> {
    const unitsMeasure = await this.ormRepository.find();

    return unitsMeasure;
  }

  public async findByDescription(
    description: string,
  ): Promise<UnitMeasure[] | undefined> {
    // const unitsMeasure = await this.ormRepository.find({
    //   where: { description: Like(`%${description}%`) },
    // });

    const unitsMeasure = await this.ormRepository.find({
      where: `UNACCENT(description) ILIKE UNACCENT('%${description}%')`,
    });

    return unitsMeasure;
  }

  public async findByType(type: number): Promise<UnitMeasure[] | undefined> {
    const unitsMeasure = await this.ormRepository.find({
      where: { type },
    });

    return unitsMeasure;
  }
}

export default UnitsMeasureRepository;
