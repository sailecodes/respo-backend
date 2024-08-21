import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import userRepo from "../../resolvers/user/userRepo";

export function IsFieldUnique(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsFieldUnique",
      propertyName: propertyName,
      target: object.constructor,
      constraints: [property],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          console.log(propertyName);

          let where: { email?: string; username?: string } = {};

          if (propertyName === "email") where.email = value;
          else if (propertyName === "username") where.username = value;

          console.log(where);

          const userToValidate = await userRepo.findOne({ where });

          return !!!userToValidate;
        },
      },
    });
  };
}
