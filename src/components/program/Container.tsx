import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import useStore from "../../store/useStore";
import { SortableItem } from "./SortableItem";
import "./customScrollbar.css";

export const Container = () => {
  const id = "container1";
  const { setNodeRef } = useDroppable({
    id,
  });
  const items = useStore((store) => store.items);

  return (
    <SortableContext
      id={id}
      items={items.map((item) => item.id)}
      strategy={verticalListSortingStrategy}
    >
      <div className="flex h-[90vh] flex-col">
        <div className="p-2 rounded-t-lg w-fit bg-stone-500">
          <h1 className="text-xl font-bold">Programa a ejecutar</h1>
        </div>
        <div
          ref={setNodeRef}
          className="custom-scrollbar flex h-full min-w-[280px] flex-col overflow-y-auto rounded-b-lg rounded-tr-lg bg-stone-500 p-2"
        >
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
};
