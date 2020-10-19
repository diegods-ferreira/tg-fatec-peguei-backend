import { inject, injectable } from 'tsyringe';
import UnitMeasure from '../infra/typeorm/entities/UnitMeasure';
import IUnitsMeasureRepository from '../repositories/IUnitsMeasureRepository';

interface IRequest {
  unit_measure_type: number;
}

@injectable()
class ListUnitsMeasureByTypeService {
  constructor(
    @inject('UnitsMeasureRepository')
    private unitsMeasureRepository: IUnitsMeasureRepository,
  ) {}

  public async execute({
    unit_measure_type,
  }: IRequest): Promise<UnitMeasure[] | undefined> {
    const unitsMeasure = await this.unitsMeasureRepository.findByType(
      unit_measure_type,
    );

    return unitsMeasure;
  }
}

export default ListUnitsMeasureByTypeService;
