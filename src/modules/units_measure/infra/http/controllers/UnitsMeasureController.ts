import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListAllUnitsMeasureService from '@modules/units_measure/services/ListAllUnitsMeasureService';
import ListUnitsMeasureByDescriptionService from '@modules/units_measure/services/ListUnitsMeasureByDescriptionService';
import ListUnitsMeasureByTypeService from '@modules/units_measure/services/ListUnitsMeasureByTypeService';

export default class UnitsMeasureController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUnitsMeasure = container.resolve(ListAllUnitsMeasureService);

    const unitsMeasure = await listUnitsMeasure.execute();

    return response.json(unitsMeasure);
  }

  public async showByDescription(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { unit_measure_description } = request.params;

    const listUnitsMeasureByDescription = container.resolve(
      ListUnitsMeasureByDescriptionService,
    );

    const unitsMeasure = await listUnitsMeasureByDescription.execute({
      unit_measure_description,
    });

    return response.json(unitsMeasure);
  }

  public async showByType(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { unit_measure_type } = request.params;

    const listUnitsMeasureByType = container.resolve(
      ListUnitsMeasureByTypeService,
    );

    const unitsMeasure = await listUnitsMeasureByType.execute({
      unit_measure_type: Number(unit_measure_type),
    });

    return response.json(unitsMeasure);
  }
}
