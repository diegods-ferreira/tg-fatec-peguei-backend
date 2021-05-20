import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      name,
      username,
      email,
      old_password,
      password,
      presentation,
      address,
      city,
      state,
      phone,
      whatsapp,
      telegram,
      show_email,
      show_whatsapp,
      show_telegram,
      show_phone,
    } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      username,
      email,
      presentation,
      address,
      city,
      state,
      phone,
      whatsapp,
      telegram,
      show_email,
      show_whatsapp,
      show_telegram,
      show_phone,
      old_password,
      password,
    });

    return response.json(classToClass(user));
  }
}
