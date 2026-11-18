import Heading from "@/components/Heading";
import PasswordToggle from "@/components/PasswordToggle";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { validatePassword } from "@/lib/utils";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import PasswordIcon from "@iconify-react/mdi/password";
import { ArrowRightCircle, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordMutation } from "@/actions/user/user.mutation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "@/validations/auth.validation";
import { ChangePasswordType } from "@/types/user.type";

const Security = () => {
  const { mutate: updatePassword, isPending } = useMutation(
    updatePasswordMutation,
  );
  const [passwordInputType, setPasswordInputType] = useState<
    "text" | "password"
  >("password");
  const [confirmPasswordInputType, setConfirmPasswordInputType] = useState<
    "text" | "password"
  >("password");
  const [oldPasswordInputType, setOldPasswordInputType] = useState<
    "text" | "password"
  >("password");
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const password = useWatch({ control: form.control, name: "newPassword" });

  const ValidPassword = validatePassword(password);

  const handleSubmit = (data: ChangePasswordType) => {
    updatePassword(data, {
      onSuccess: () => toast.success("Passowrd updated"),
      onError: (error) => toast.error(error.message || "Failed to update"),
    });
  };

  return (
    <div className="flex flex-col gap-10 flex-1">
      <Heading
        title="Security"
        subtitle="Manage security to protect your account. Change your password periodically to increase security of your account"
      />
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-16"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-6">
            <Controller
              control={form.control}
              name="currentPassword"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-m-medium text-brand-800"
                  >
                    Current Password
                  </FieldLabel>

                  <InputGroup className="h-14">
                    <InputGroupAddon>
                      <PasswordIcon className="size-6" />
                    </InputGroupAddon>
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type={oldPasswordInputType}
                      placeholder="Create your password"
                      disabled={isPending}
                    />
                    <InputGroupAddon align="inline-end">
                      <PasswordToggle
                        inputType={oldPasswordInputType}
                        onAction={() =>
                          setOldPasswordInputType((prev) =>
                            prev === "password" ? "text" : "password",
                          )
                        }
                      />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="newPassword"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-m-medium text-brand-800"
                  >
                    New Password
                  </FieldLabel>

                  <InputGroup className="h-14">
                    <InputGroupAddon>
                      <PasswordIcon className="size-6" />
                    </InputGroupAddon>
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type={passwordInputType}
                      placeholder="Create your password"
                      disabled={isPending}
                    />
                    <InputGroupAddon align="inline-end">
                      <PasswordToggle
                        inputType={passwordInputType}
                        onAction={() =>
                          setPasswordInputType((prev) =>
                            prev === "password" ? "text" : "password",
                          )
                        }
                      />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="confirmNewPassword"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-m-medium text-brand-800"
                  >
                    Confirm Password
                  </FieldLabel>

                  <InputGroup className="h-14">
                    <InputGroupAddon>
                      <PasswordIcon className="size-6" />
                    </InputGroupAddon>
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type={confirmPasswordInputType}
                      placeholder="Confirm your password"
                      disabled={isPending}
                    />
                    <InputGroupAddon align="inline-end">
                      <PasswordToggle
                        inputType={confirmPasswordInputType}
                        onAction={() =>
                          setConfirmPasswordInputType((prev) =>
                            prev === "password" ? "text" : "password",
                          )
                        }
                      />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-black-500 text-heading-xs-semibold">
              Your Password must contain
            </p>
            <div className="flex flex-col gap-1">
              {ValidPassword.map((criteria, index) => (
                <div key={index} className={`flex gap-2 items-center`}>
                  <ArrowRightCircle
                    className={`size-4 ${form.getValues("newPassword") ? (criteria.isValid ? "text-brand-400" : "text-danger-400") : "text-black-200 "} `}
                  />
                  <p
                    className={`text-2s-medium  ${form.getValues("newPassword") ? (criteria.isValid ? "text-brand-500" : "text-danger-500") : "text-black-300"} `}
                  >
                    {criteria.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button
          disabled={isPending}
          type="submit"
          className="h-14 m-auto w-full max-w-xl"
        >
          {isPending && <Loader2 className="animate-spin" />}Save
        </Button>
      </form>
    </div>
  );
};

export default Security;
