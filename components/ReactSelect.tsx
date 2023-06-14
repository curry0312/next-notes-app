"use client";

import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import { v4 as uuidV4 } from "uuid";
import { Option } from "@/app/note/createNote/page";

type ReactSelectProps = {
  values: Option[];
  setValues: any;
};

const animatedComponents = makeAnimated();

export default function ReactSelect({ values, setValues }: ReactSelectProps) {
  return (
    <CreatableSelect
      components={animatedComponents}
      isMulti
      options={values.map((value: Option) => {
        return { label: value.label, value: value.id };
      })}
      value={values.map((value: Option) => {
        return { label: value.label, value: value.id };
      })}
      onCreateOption={(label: string) => {
        const newTag = { id: uuidV4(), label: label };
        setValues((prev: Option[]) => {
          return [...prev, newTag];
        });
      }}
      onChange={(tags) => {
        setValues(
          tags.map((tag) => {
            return { label: tag.label, id: tag.value };
          })
        );
      }}
    />
  );
}
