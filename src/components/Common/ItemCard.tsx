import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "../ui/card";

import { Separator } from "@/components/ui/separator";
import { Label } from "../ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useModalStore } from "@/store/modal/modalStore";
import { UseMutationResult } from "@tanstack/react-query";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface ItemsCardProps<T extends FieldValues> {
  data: { label: string; value: string | number }[] | undefined;
  title: string;
  description: string;
  handleDelete?: () => void;
  EditFormComponent?: (props: {
    form: UseFormReturn<T>;
    Mutate: UseMutationResult<T, Error, T, unknown>;
    editForm: boolean;
  }) => JSX.Element;
  form?: UseFormReturn<T>;
  Mutate?: UseMutationResult<T, Error, T, unknown>;
  enableForm?: boolean;
  enableDelete?: boolean;
}

export function ItemsCard<T extends FieldValues>(props: ItemsCardProps<T>) {
  const { open, setOpen } = useModalStore();

  const {
    enableForm = true,
    enableDelete = true,
    data,
    title,
    description,
    handleDelete,
    EditFormComponent,
    form,
    Mutate,
  } = props;
  const isEven = data && data.length % 2 === 0;
  return (
    <Card className="w-full p-5">
      <div className="flex justify-between">
        <div>
          <div className="text-2xl">{title}</div>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex gap-2">
          {enableForm && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant={"secondary"} onClick={() => setOpen(true)}>
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit {title}</DialogTitle>
                  <DialogDescription>{description}</DialogDescription>
                  <Separator className="my-4" />

                  {EditFormComponent && form && Mutate && (
                    <EditFormComponent
                      form={form}
                      Mutate={Mutate}
                      editForm={true}
                    />
                  )}
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}

          {enableDelete && <Button onClick={handleDelete}>Delete</Button>}
        </div>
      </div>
      <Separator className="my-4" />
      <CardContent>
        <div className="mt-10 grid grid-cols-2 gap-y-5">
          {data &&
            data.map((item, index) => (
              <div key={index}>
                <div className="mb-5 flex flex-col">
                  <Label className="text-md text-nowrap font-bold lg:text-lg">
                    {item.label}{" "}
                  </Label>
                  <span className="lg:text-md text-wrap text-sm">
                    {item.value}
                  </span>
                </div>
                {index < (isEven ? data.length - 2 : data.length - 1) ? (
                  <Separator className="my-2" />
                ) : null}
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
