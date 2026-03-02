"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { loginSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

function LoginPage() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    const result = await signIn.username({
      username: data.username,
      password: data.password,
    });

    if (result.error) {
      toast.error("Login failed", {
        description: result.error.message || "Unable to login",
      });
      return;
    }
    toast.success("Login successful!");
    form.reset();
    redirect("/dashboard");
  }

  return (
    <div className="flex justify-center">
      <Card className="w-full mt-10 sm:max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to an existing user</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-username">Username</FieldLabel>
                    <Input
                      {...field}
                      id="login-username"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      placeholder="Ola123"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="login-password"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      type="password"
                      placeholder="********"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation={"responsive"}>
            <Button type="submit" form="login">
              Login
            </Button>

            <Button variant={"ghost"}>
              <Link href={"/register"}>Don't have an account?</Link>
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;
