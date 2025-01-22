import { logger } from "@/lib/logger";
import { FlattenUserFetch, UserFetch, UserFormValues } from "@/lib/types";
import { useEffect, useState } from "react";

import { ItemsCard } from "@/components/Common/ItemCard";
import { ListCard } from "@/components/Common/ListCard";
import { userFormSchema } from "@/lib/schema";
import { useUser } from "@/lib/tanstack/getTanstackQueries";
import { flattenObject, transformObject } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { UserForm } from "@/components/User/UserForm";

import { Loading } from "@/components/Common/Loading";
import { NoData } from "@/components/Common/NoData";
import { useDeleteUser } from "@/lib/tanstack/deleteTanstackQueries";
import { useUpdateUser } from "@/lib/tanstack/putTanstackQueries";

export function UserView() {
  const { data: userData, isLoading: userLoading } = useUser();
  const [id, setId] = useState<number | undefined>(undefined);
  const [userList, setUserList] = useState<FlattenUserFetch[]>([]);

  const deleteEmployee = useDeleteUser();
  logger.log("Employee Data", userData);
  const [currentUser, setCurrentUser] = useState<FlattenUserFetch | undefined>(
    undefined,
  );

  const data = currentUser
    ? transformObject<FlattenUserFetch>(
        currentUser,
        // @ts-expect-error 2nd parameter array of string as key  is fine
        ["users.name", "users.email", "users.role"],
        ["Name", "Email", "Role"],
      )
    : undefined;

  logger.log("Current User", currentUser);

  useEffect(() => {
    if (userData) {
      const flattenedData = flattenObject<UserFetch, FlattenUserFetch>(
        userData,
      );

      if (flattenedData && Array.isArray(flattenedData)) {
        setUserList(flattenedData);
        if (flattenedData.length > 0) {
          setCurrentUser(flattenedData[0]);
          if ("users.id" in flattenedData[0]) {
            setId(flattenedData[0]["users.id"]);
          } else {
            logger.error(
              "ID property does not exist in the flattened data",
              flattenedData[0],
            );
          }
        } else {
          setCurrentUser(undefined);
          setId(undefined);
        }
      }
    }
  }, [userData]);

  const handleDelete = () => {
    if (id) {
      logger.log("Delete ID: ", id);
      deleteEmployee.mutate(id);
    }
  };

  //=======================
  const deriveUserFormValues = (
    user: FlattenUserFetch | undefined,
  ): UserFormValues => {
    return {
      name: user && "users.name" in user ? (user["users.name"] as string) : "",
      email:
        user && "users.email" in user ? (user["users.email"] as string) : "",
      password:
        user && "users.password" in user
          ? (user["users.password"] as string)
          : "",
      role: user && "users.role" in user ? (user["users.role"] as string) : "",
    };
  };

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: deriveUserFormValues(currentUser),
  });

  const { reset } = form;

  const PutUser = useUpdateUser(id);

  useEffect(() => {
    if (currentUser) {
      reset(deriveUserFormValues(currentUser));
    }
  }, [currentUser, reset]);
  //=======================

  if (userLoading) return <Loading />;
  if (!userData) return <NoData />;

  return (
    <div className="mt-5 flex p-5 flex-col gap-5 lg:flex-row">
      <ListCard<FlattenUserFetch>
        data={userList}
        keys={["users.id", "users.name", "users.email", "users.role"]}
        setCurrent={setCurrentUser}
        logid="User"
        setId={setId}
        totalPages={2}
      />

      <ItemsCard
        data={data}
        title="User"
        description="User Details"
        handleDelete={handleDelete}
        EditFormComponent={UserForm}
        form={form}
        Mutate={PutUser}
      />
    </div>
  );
}
