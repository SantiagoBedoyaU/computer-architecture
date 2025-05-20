import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import useStore from "../../store/useStore";
import { Container } from "./Container";
import { Item } from "./Item";

export const Program = () => {
  const items = useStore((store) => store.items);
  const activeItem = useStore((store) => store.activeItem);
  const setActiveItem = useStore((store) => store.setActiveItem);
  const moveItem = useStore((store) => store.moveItem);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { id } = event.active;
    const item = items.find((item) => item.id === id);
    if (!item) return;
    setActiveItem(item);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setActiveItem(null);
      return;
    }

    const activeIndex = items.findIndex((item) => item.id === active.id);
    const overIndex = items.findIndex((item) => item.id === over.id);

    if (activeIndex !== overIndex) {
      moveItem(activeIndex, overIndex);
    }

    setActiveItem(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Contenedor con los items arrastrables */}
      <Container />

      {/* Mostrar el item activo durante el arrastre */}
      <DragOverlay>
        {activeItem ? <Item id={activeItem.id} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
