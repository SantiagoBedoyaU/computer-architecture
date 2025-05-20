import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiDeleteBin2Line, RiDragMove2Line } from "react-icons/ri";
import useStore from "../../store/useStore";
import { Item } from "./Item";

interface SortableItemProps {
  id: string;
}

export const SortableItem = ({ id }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const handleRemove = useStore((store) => store.handleRemove);
  const isProgamRunning = useStore((store) => store.isProgamRunning);

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const baseClasses =
    "group rounded-md p-1 transition-all duration-200 ease-in-out hover:bg-gray-900/30 text-white";

  return (
    <div ref={setNodeRef} className="flex p-2" style={style}>
      <Item id={id}>
        {/* Botón de arrastre */}
        <button className={baseClasses} {...listeners} {...attributes}>
          <RiDragMove2Line />
        </button>

        {/* Botón de eliminar */}
        <button
          className={`${baseClasses} hover:text-red-400`}
          onClick={() => handleRemove(id)}
          disabled={isProgamRunning}
        >
          <RiDeleteBin2Line />
        </button>
      </Item>
    </div>
  );
};
