"use client";

import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import { v4 as uuidV4 } from "uuid";
import { tag } from "@/app/page";

type ReactSelectProps = {
  tags: tag[];
  setTags: any;
};

const animatedComponents = makeAnimated();

export default function ReactSelect({ tags, setTags }: ReactSelectProps) {
  return (
    <CreatableSelect
      className="z-0"
      components={animatedComponents}
      isMulti
      options={tags.map((value: tag) => {
        return { label: value.label, value: value.id };
      })}
      value={tags.map((value: tag) => {
        return { label: value.label, value: value.id };
      })}
      onCreateOption={(label: string) => {
        const newTag = { id: uuidV4(), label: label };
        setTags((prev: tag[]) => {
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
