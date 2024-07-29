import { useState, ChangeEvent, FormEvent } from 'react';
import { useCustomToast } from '../../utils';
import { FormCard, Input, Label, Button } from '../../ui';
import { FaPlus as AddIcon } from 'react-icons/fa';
import { Colors } from "../../utils/enums";

interface TagFormProps {
  title: string;
  className?: string;
  onClose: () => void;
  onAddTag: (tag: { TagName: string; Value: string }) => void;
}

const CreateForm = ({ title, className, onClose, onAddTag }: TagFormProps) => {
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

  const isFormValid = () => {
    return tag.trim() !== '' && value.trim() !== '';
  };

  return (
    <FormCard
      className={`${className} w-full bg-light-gray`}
      title={title}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="flex items-end w-full mt-3 space-x-3">
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
        <Button
          color={Colors.secondary}
          onClick={handleAddTag}
          className="flex items-center h-10 px-4 space-x-2"
        >
          <AddIcon />
          Ajouter Tag
        </Button>
      </div>
      <div className="flex justify-center mt-3">
        <Button
          type="submit"
          disabled={!isFormValid()}
          className={`
            ${isFormValid() ? 'bg-primary' : 'bg-gray-300'}
            text-white
            font-medium
            py-2
            px-4
            rounded
          `}
        >
          Create Dicom
        </Button>
      </div>
    </FormCard>
  );
};

export default CreateForm;