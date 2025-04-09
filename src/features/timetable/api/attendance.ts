"use server";

import { fetchApi } from "@/lib/api/client";
import { auth } from "@/lib/auth";
import { revalidateTag } from "next/cache";
import type { Registration } from "../types";

export const incrementAttendance = async (registrationId: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthorized");
  }

  const response = fetchApi<Registration>(
    `/api/v1/academics/registrations/${registrationId}/attendance/`,
    {
      method: "POST",
    },
  );

  revalidateTag(`registrations-${user.profile.profile_id}`);

  return response;
};

export const decrementAttendance = async (registrationId: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthorized");
  }

  const response = fetchApi<Registration>(
    `/api/v1/academics/registrations/${registrationId}/attendance/`,
    {
      method: "DELETE",
    },
  );

  revalidateTag(`registrations-${user.profile.profile_id}`);

  return response;
};
