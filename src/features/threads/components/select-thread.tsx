'use client';

import { useInfiniteThreads } from "../api/get-threads";
import { Select } from "@/components/ui/form/select";
import { useDebounce } from "@/utils/debounce";
import { useMemo, useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type SelectThreadProps = {
  registeration: Partial<UseFormRegisterReturn>;
  label?: string;
  className?: string;
  error?: FieldError;
  searchBarClassName?: string;
}

export const SelectThread = ({ registeration, label, className, error, searchBarClassName } : SelectThreadProps) => {
  const [searchString, setSearchString] = useState("");
  const debouncedSearch = useDebounce(searchString, 300);
  
  const threadsQuery = useInfiniteThreads({ title: debouncedSearch });
  const threads = threadsQuery?.data?.pages.flatMap((page) => page.data);
  
  const options = useMemo(() => {
    return threads?.map((thread) => ({
      label: thread.title,
      value: thread.id,
    }));
  }, [threads]);
  return (
    <>
      <Select label={label} className={className} options={options} registration={registeration} error={error} />
      <input placeholder="Search for thread?" className={searchBarClassName} type="text" onChange={(e) => {setSearchString(e.target.value)}} />
    </>
  )
}