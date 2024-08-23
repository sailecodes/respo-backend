import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import { artistRepo } from "../../artist/artist.repo";

export const IsArtistFieldUnique = (property: string, validationOptions?: ValidationOptions) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsArtistFieldUnique",
      propertyName: propertyName,
      target: object.constructor,
      constraints: [property],
      options: validationOptions,
      validator: {
        async validate(name: string, args: ValidationArguments) {
          return !!!(await artistRepo.findOneBy({ name }));
        },
      },
    });
  };
};
