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
  [key: string]: any;
};


const handleClick = (e: React.MouseEvent) => {
  e.stopPropagation();
}
function EntityActions<T>({ entity, options }: EntityActionsProps<T>) {
  return (
    <div onClick={handleClick} className="">

      <DropdownButton
        options={options}
        buttonText="Actions"
        row={entity}
      />

    </div>
  );
}
export default EntityActions;