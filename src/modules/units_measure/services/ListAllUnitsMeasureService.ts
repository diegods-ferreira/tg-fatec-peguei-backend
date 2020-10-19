import { inject, injectable } from 'tsyringe';
import UnitMeasure from '../infra/typeorm/entities/UnitMeasure';
import IUnitsMeasureRepository from '../repositories/IUnitsMeasureRepository';

@injectable()
class ListAllUnitsMeasureService {
  constructor(
    @inject('UnitsMeasureRepository')
    private unitsMeasureRepository: IUnitsMeasureRepository,
  ) {}

  public async execute(): Promise<UnitMeasure[]> {
    const unitsMeasure = await this.unitsMeasureRepository.findAll();

    return unitsMeasure;
  }
}

export default ListAllUnitsMeasureService;
