"use client";

import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import { v4 as uuidV4 } from "uuid";
import { Tag } from "@/app/note/createNote/page";

type ReactSelectProps = {
  tags: Tag[];
  setTags: any;
};

const animatedComponents = makeAnimated();

export default function ReactSelect({ tags, setTags }: ReactSelectProps) {
  return (
    <CreatableSelect
      components={animatedComponents}
      isMulti
      options={tags.map((value: Tag) => {
        return { label: value.label, value: value.id };
      })}
      value={tags.map((value: Tag) => {
        return { label: value.label, value: value.id };
      })}
      onCreateOption={(label: string) => {
        const newTag = { id: uuidV4(), label: label };
        setTags((prev: Tag[]) => {
          return [...prev, newTag];
        });
      }}
      onChange={(tags) => {
        setTags(
          tags.map((tag) => {
            return { label: tag.label, id: tag.value };
          })
        );
      }}
    />
  );
}
