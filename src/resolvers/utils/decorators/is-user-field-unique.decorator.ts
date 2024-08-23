import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import { userRepo } from "../../user/user.repo";

export const IsUserFieldUnique = (property: string, validationOptions?: ValidationOptions) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsUserFieldUnique",
      propertyName: propertyName,
      target: object.constructor,
      constraints: [property],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          let where: { email?: string; username?: string } = {};

          if (propertyName === "email") where.email = value;
          else if (propertyName === "username") where.username = value;

          const userToValidate = await userRepo.findOne({ where });

          return !!!userToValidate;
        },
      },
    });
  };
};
