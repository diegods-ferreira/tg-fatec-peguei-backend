import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import UnitMeasure from '../infra/typeorm/entities/UnitMeasure';
import IUnitsMeasureRepository from '../repositories/IUnitsMeasureRepository';

interface IRequest {
  unit_measure_description: string;
}

@injectable()
class ListUnitsMeasureByDescriptionService {
  constructor(
    @inject('UnitsMeasureRepository')
    private unitsMeasureRepository: IUnitsMeasureRepository,
  ) {}

  public async execute({
    unit_measure_description,
  }: IRequest): Promise<UnitMeasure[] | undefined> {
    if (!unit_measure_description) {
      throw new AppError(
        'You must inform the unit_measure_description query param',
      );
    }

    const unitsMeasure = await this.unitsMeasureRepository.findByDescription(
      unit_measure_description,
    );

    return unitsMeasure;
  }
}

export default ListUnitsMeasureByDescriptionService;
