import DropdownButton from "../ui/menu/DropDownButton";

type ActionOption = {
  label: string;
  icon: React.ReactNode;
  color: string;
  action: () => void;
};

type EntityActionsProps<T> = {
  entity: T;
  options: ActionOption[];
};


const handleClick = (e: React.MouseEvent) => {
  e.stopPropagation();
}
function EntityActions<T>({ entity, options }: EntityActionsProps<T>) {
  return (
    <div onClick={handleClick} className="z-50">

      <DropdownButton
        options={options}
        buttonText="Actions"
        row={entity}
      />

    </div>
  );
}
export default EntityActions;