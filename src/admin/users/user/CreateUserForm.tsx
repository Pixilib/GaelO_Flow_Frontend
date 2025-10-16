import { ChangeEvent, useState, FormEvent } from 'react';
import { getRoles, postUsers } from '../../../services';
import {
  useCustomMutation,
  useCustomQuery,
  UserPayload,
  useCustomToast,
  Role,
  Option,
} from '../../../utils';
import {
  FormCard,
  FormButton,
  Input,
  Label,
  SelectInput,
} from '../../../ui';
import { getErrorMessage } from '../../../utils/error';
import InputPassword from '../../../ui/InputPassword';
import { SubmitUser } from '../../../icons';
import { useTranslation } from "react-i18next";

type UserFormProps = {
  onClose : () => void;
  className?: string;
};

const CreateUserForm = ({ onClose, className }: UserFormProps) => {
  const { toastSuccess, toastError } = useCustomToast();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<{ value: string; label: string } | null>(null);
  const {t} = useTranslation()

  const { data: rolesOptions } = useCustomQuery<Role[], Option[]>(
    ['roles'],
    () => getRoles(),
    {
      select: (roles) =>
        roles.map((role) => ({
          value: role.name,
          label: role.name,
        }))
    });

  const userMutation = useCustomMutation<number, UserPayload>(
    (user) => postUsers(user),
    [['users']],
    {
      onSuccess: () => {
        setFirstName('');
        setLastName('');
        setPassword('');
        setEmail('');
        setSelectedRole(null);
        toastSuccess('User created with success');
      },
      onError: (error: any) => {
        toastError('An error occurred during user creation. ' + getErrorMessage(error) || '');
      },
    }
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: UserPayload = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      roleName: selectedRole?.value ?? null,
      password: password,
    };
    userMutation.mutate(payload);
  };

  return (
    <div data-gaelo-flow="users-formUser" className="w-full" >
    <FormCard
      className={`${className} bg-light-gray dark:bg-neutral-500 `}
      title={t("admin.user.create-user")}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 col-span-3 gap-3 lg:grid-cols-3 lg:gap-11">
        <Input
          label={
            <Label
              value="Firstname *"
              className="text-sm font-medium text-center" align="left"
            />}
          placeholder="Enter your firstname"
          className="mt-1 lg:mt-3"
          value={firstName}
          required
          onChange={(event: ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value)}
          autoComplete='off'
        />
        <Input
          label={
            <Label
              value="Lastname *"
              className="text-sm font-medium text-center" align="left"
            />}
          placeholder="Enter your lastname"
          className="mt-1 lg:mt-3"
          value={lastName}
          required
          onChange={(event: ChangeEvent<HTMLInputElement>) => setLastName(event.target.value)}
          autoComplete='off'
        />
        <InputPassword
          label={
            <Label
              value="Password *"
              className="text-sm font-medium text-center" align="left"
            />}
          placeholder="Enter your password"
          className="mt-1 lg:mt-3 rounded-xl"
          value={password}
          required
          onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 col-span-3 gap-3 lg:grid-cols-2 lg:gap-11">
        <Input
          label={
            <Label
              value="Email *" className="text-sm font-medium text-center" align="left"
            />}
          type="email"
          placeholder="example@example.com"
          className="mt-1 lg:mt-3 rounded-xl"
          value={email}
          required
          onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
          autoComplete='off'
        />
        <label className="flex flex-col">
          <span className="mt-1 mb-2 text-sm font-bold lg:mt-3"> Roles *</span>
          <SelectInput
            options={rolesOptions ?? []}
            placeholder="Select a Role"
            menuPosition='fixed'
            isClearable
            onChange={(option) => setSelectedRole({ value: option.value, label: option.value })}
            value={selectedRole?.value ?? null}
          />
        </label>
      </div>
      <div data-gaelo-flow="users-buttonCreateUser" className="grid grid-cols-1 col-span-3 ">
        <FormButton
          text={t("admin.user.create-user")}
          className='w-40'
          icon={<SubmitUser size="1.3rem" />}
        />
      </div>
    </FormCard>
  </div>
  );
};

export default CreateUserForm;
