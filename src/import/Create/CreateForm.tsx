import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useCustomMutation, useCustomQuery, UserPayload, useCustomToast, Role, Option } from '../../utils';
import { getRoles, postUsers } from '../../services';
import { FormCard, FormButton, Input, Label, SelectInput } from '../../ui';
import InputPassword from '../../ui/InputPassword';
import { getErrorMessage } from '../../utils/error';

type UserFormProps = {
  title: string;
  className?: string;
  onClose: () => void;
};

const CreateUserForm = ({ title, className, onClose }: UserFormProps) => {
  const { toastSuccess, toastError } = useCustomToast();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<{ value: string; label: string } | null>(null);

  const { data: rolesOptions } = useCustomQuery<Role[], Option[]>(
    ['roles'],
    () => getRoles(),
    {
      select: (roles) =>
        roles.map((role) => ({
          value: role.Name,
          label: role.Name,
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
    if (!selectedRole) {
      toastError('Please select a role');
      return;
    }
    const payload: UserPayload = {
      Firstname: firstName,
      Lastname: lastName,
      Email: email,
      RoleName: selectedRole.value,
      Password: password,
    };
    userMutation.mutate(payload);
  };

  return (
    <FormCard
      className={`${className} bg-light-gray`}
      title={title}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 col-span-3 gap-3 lg:grid-cols-3 lg:gap-11">
        <Input
          label={<Label value="Firstname *" className="text-sm font-medium text-center" align="left" />}
          placeholder="Enter your firstname"
          className="mt-1 lg:mt-3"
          value={firstName}
          required
          onChange={(event: ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value)}
          autoComplete='off'
        />
        <Input
          label={<Label value="Lastname *" className="text-sm font-medium text-center" align="left" />}
          placeholder="Enter your lastname"
          className="mt-1 lg:mt-3"
          value={lastName}
          required
          onChange={(event: ChangeEvent<HTMLInputElement>) => setLastName(event.target.value)}
          autoComplete='off'
        />
        <InputPassword
          label={<Label value="Password *" className="text-sm font-medium text-center" align="left" />}
          placeholder="Enter your password"
          className="mt-1 lg:mt-3 rounded-xl"
          value={password}
          required
          onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 col-span-3 gap-3 lg:grid-cols-2 lg:gap-11">
        <Input
          label={<Label value="Email *" className="text-sm font-medium text-center" align="left" />}
          type="email"
          placeholder="example@example.com"
          className="mt-1 lg:mt-3 rounded-xl"
          value={email}
          required
          onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
          autoComplete='off'
        />
        <label className="flex flex-col">
          <span className="mt-1 mb-2 text-sm font-bold lg:mt-3"> Rôles *</span>
          <SelectInput
            options={rolesOptions ?? []}
            placeholder="Select a Rôle"
            onChange={(event) => setSelectedRole({ value: event.value, label: event.value })}
            value={selectedRole}
          />
        </label>
      </div>
      <div className="grid grid-cols-1 col-span-3 mt-3">
        <FormButton
          text="Send" icon={undefined}      />
      </div>
    </FormCard>
  );
};

export default CreateUserForm;
