"use client";

import Image from "next/image";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Checkbox, Input } from "@/components/ui";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export interface LoginFormProps {
  onValidSubmit?: (values: LoginFormValues) => void;
}

export function LoginForm({ onValidSubmit }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  return (
    <section className="flex min-h-[812px] w-full justify-center bg-surface-page px-8 pt-[184px] tablet:min-h-[1024px] tablet:px-12 tablet:pt-[160px] lg:h-screen lg:min-h-[1024px] lg:w-1/2 lg:items-center lg:px-0 lg:pt-0">
      <div className="w-full max-w-login-form text-center">
        <Image
          src="/logo-symbol.svg"
          alt="ShipNow"
          width={47}
          height={47}
          className="mx-auto size-[47px]"
        />

        <h2 className="mt-10 text-[32px] font-bold leading-tight text-text-primary">
          Welcome Back
        </h2>
        <p className="mx-auto mt-3 max-w-login-form text-[16px] leading-normal text-text-secondary">
          Log in to continue managing your logistics with ShipNow
        </p>

        <form
          className="mt-14 space-y-5 text-left"
          noValidate
          onSubmit={handleSubmit((values) => onValidSubmit?.(values))}
        >
          <Input
            label="Email Address"
            type="email"
            autoComplete="email"
            placeholder="Enter a valid email address"
            error={errors.email?.message}
            className="h-login-input-height border-transparent"
            {...register("email")}
          />

          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Create a strong password"
            error={errors.password?.message}
            className="h-login-input-height border-transparent"
            rightAdornment={
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((visible) => !visible)}
                className="rounded-control p-1 text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                {showPassword ? (
                  <Eye className="size-5" aria-hidden="true" />
                ) : (
                  <EyeOff className="size-5" aria-hidden="true" />
                )}
              </button>
            }
            {...register("password")}
          />

          <div className="flex items-center justify-between gap-4 pt-1">
            <Checkbox
              label="Remember Me"
              className="text-text-secondary"
              {...register("rememberMe")}
            />
            <button
              type="button"
              className="shrink-0 rounded-control text-[14px] font-semibold text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
            >
              Forgot Password?
            </button>
          </div>

          <Button
            type="submit"
            loading={isSubmitting}
            className="mt-8 h-login-button-height w-full bg-action-dark text-[16px] text-surface-card"
          >
            Login
          </Button>

          <p className="pt-3 text-center text-[14px] text-text-secondary">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="rounded-control font-semibold text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </section>
  );
}
