import { useState, ChangeEvent, FormEvent } from 'react';
import { useCustomToast } from '../../utils';
import { FormCard, Input, Label, Button } from '../../ui';
import { FaPlus as AddIcon } from 'react-icons/fa';
import { Colors } from "../../utils/enums";

interface TagFormProps {
  title: string;
  className?: string;
  onAddTag: (tag: { TagName: string; Value: string }) => void;
}

const CreateForm = ({ title, className, onAddTag }: TagFormProps) => {
  const { toastSuccess } = useCustomToast();
  const [tag, setTag] = useState('');
  const [value, setValue] = useState('');

  const handleAddTag = () => {
    if (tag && value) {
      onAddTag({ TagName: tag, Value: value });
      console.log(`Tag: ${tag}, Value: ${value}`);
      setTag('');
      setValue('');
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toastSuccess('Tags envoyés avec succès');
  };

  return (
    <FormCard
      className={`${className} w-full bg-light-gray`}
      title={title}
      onSubmit={handleSubmit}
    >
      <div className="flex items-end w-full mt-3 gap-3">
        <div className="flex-1">
          <Input
            label={<Label value="Tag" className="text-sm font-medium" />}
            placeholder="Entrer le tag"
            value={tag}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setTag(event.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex-1">
          <Input
            label={<Label value="Valeur" className="text-sm font-medium" />}
            placeholder="Entrer la valeur"
            value={value}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex justify-end">
          <Button
            color={Colors.secondary}
            onClick={handleAddTag}
            className="flex items-center h-10 px-4 space-x-2"
          >
            <AddIcon />
            Add Tag
          </Button>
        </div>
      </div>
    </FormCard>
  );
};

export default CreateForm;