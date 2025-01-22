import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countryData, roleData } from "@/lib/constant";
import { logger } from "@/lib/logger";
import { registerSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { LabeledInputWithIcon } from "../ui/LabeledInputWithIcon";

export function RegisterForm() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userid: "",
      username: "",
      userrole: "",
      email: "",
      phone: "",
      country: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    logger.table("Register Form", values);
    form.reset();
  }

  return (
    <div className="">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-2">
              <FormField
                control={form.control}
                name="userid"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <LabeledInputWithIcon
                        {...field}
                        placeholder="Enter ID"
                        iconName="mdi:card"
                        id="userid"
                        label="User ID"
                      />
                    </FormControl>
                    <FormDescription>sample description</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <LabeledInputWithIcon
                        {...field}
                        placeholder="Enter Name"
                        iconName="mdi:user"
                        id="username"
                        label="User Name"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userrole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select User Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roleData.map((userRole) => (
                          <SelectItem
                            key={userRole.value}
                            value={userRole.value}
                          >
                            {userRole.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <LabeledInputWithIcon
                        {...field}
                        placeholder="Enter Email"
                        iconName="mdi:email"
                        id="email"
                        label="Email"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <LabeledInputWithIcon
                        {...field}
                        placeholder="Enter Phone Number"
                        iconName="mdi:phone"
                        id="phone"
                        label="Phone"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countryData.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
