import { useState, ChangeEvent, FormEvent } from 'react';
import { useCustomToast } from '../../utils';
import { FormCard, Input, Label, Button } from '../../ui';
import { Colors } from "../../utils/enums";
import { Add } from '../../icons';

interface TagFormProps {
  title: string;
  className?: string;
  onAddTag: (tag: { name: string; value: string }) => void;
}

const CreateForm = ({ title, className, onAddTag }: TagFormProps) => {
  const { toastSuccess } = useCustomToast();
  const [tag, setTag] = useState('');
  const [value, setValue] = useState('');

  const handleAddTag = () => {
    if (tag && value) {
      onAddTag({ name: tag, value: value });
      setTag('');
      setValue('');
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toastSuccess('Tag Add');
  };

  return (
    <FormCard
      className={`${className} w-full bg-light-gray dark:bg-neutral-500`}
      title={title}
      onSubmit={handleSubmit}
    >
      <div className="flex items-end w-full gap-3 mt-3">
        <div className="flex-1">
          <Input
            label={<Label value="Tag" className="text-sm font-medium" />}
            placeholder="tag"
            value={tag}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setTag(event.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex-1">
          <Input
            label={<Label value="Value" className="text-sm font-medium" />}
            placeholder="value"
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
            <Add />
            Add Tag
          </Button>
        </div>
      </div>
    </FormCard>
  );
};

export default CreateForm;