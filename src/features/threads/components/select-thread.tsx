'use client';

import { useInfiniteThreads } from "../api/get-threads";
import { Select } from "@/components/ui/form/select";
import { UseFormRegisterReturn } from "react-hook-form";

type SelectThreadProps = {
  registeration: Partial<UseFormRegisterReturn>;
}

export const SelectThread = ({ registeration } : SelectThreadProps) => {
  const threadsQuery = useInfiniteThreads();

  if(threadsQuery.isLoading) return <div>loading..</div>;

  const threads = threadsQuery?.data?.pages.flatMap((page) => page.data);
  const options = threads?.map((thread) => (
    {
      label: thread.title, 
      value: thread.id
    }
  ));

  return (
    <>
      <Select options={options} registration={registeration} />
    </>
  )
}