"use client";
import { updateFavoriteColor } from "@/actions/user";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { User } from "@/generated/prisma/browser";
import { colorSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

function ColorForm({ user }: { user: User }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof colorSchema>>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      favoriteColor: user.favorittFarge || "",
    },
  });

  async function onSubmit(data: z.infer<typeof colorSchema>) {
    setIsSubmitting(true);
    try {
      await updateFavoriteColor(user.id, data.favoriteColor);
      toast.success("Color updated!");
      router.refresh();
    } catch (error) {
      toast.error("Something weird happend!");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex justify-center">
      <Card className="w-full mt-10 sm:max-w-md">
        <CardHeader>
          <CardTitle>Favorite Color</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="color" onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
              name="favoriteColor"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="color-field">Favorite Color</FieldLabel>
                  <Input
                    {...field}
                    id="color-field"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    placeholder="Rød"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation={"responsive"}>
            <Button type="submit" disabled={isSubmitting} form="color">
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ColorForm;
