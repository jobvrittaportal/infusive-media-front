import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import UserDiv from './users.style';
import { IUser, defaultUser, schema, GetAllUsersData } from './model';
import FormInput from '../../common/components/formElements/Input/Input';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client/react';
import MultiSelectTypeahead from '../../common/components/formElements/multiselecttypeahead/MultiSelectTypeahead';
import { IRole } from '../role/helpers';
import { GET_ALL_USERS, GET_ROLES } from './graphql/query';
import { CREATE_USER_MUTATION } from './graphql/mutation';

const Users = () => {
  const { data, loading, refetch } = useQuery<GetAllUsersData>(GET_ALL_USERS);
  const [search, setSearch] = useState('');
  const [rolesText, setRolesText] = useState('');
  const [showForm, setShowForm] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: defaultUser,
    resolver: yupResolver(schema),
  });

  const [createUser, { loading: creating }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: () => {
      refetch();
      setShowForm(false);
      reset(defaultUser);
    },
    onError: (err) => alert(err.message),
  });

  const [getRoles, { data: rolesData, loading: rolesLoading }] = useLazyQuery<{ roles: IRole[] }>(
    GET_ROLES,
    {
      fetchPolicy: 'network-only',
    }
  );

  useEffect(() => {
    if (showForm) {
      getRoles({ variables: { query: rolesText } });
    }
  }, [rolesText, showForm, getRoles]);

  const onSubmit = (formData: IUser) => {
    const roleIds = (formData.roles || []).map((r: any) => r.id);
    const payload = {
      ...formData,
      roleIds, // only IDs
    };
    delete payload.roles;
    createUser({ variables: { input: payload } });
  };

  if (loading) return <div>Loading users...</div>;

  const users = data?.users || [];

  const filteredUsers = users.filter((u: any) =>
    `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  );

  // Extract roles from the query response
  const roles: IRole[] = rolesData?.roles || [];
  console.log('Roles:', roles);

  return (
    <UserDiv>
      <div className="top-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Close Form' : 'Add New User'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-grid">
              <FormInput
                isRequired
                control={control}
                name="firstName"
                type="string"
                label="First Name"
                placeholder="Enter your First Name"
                errors={errors}
              />
              <FormInput
                isRequired
                control={control}
                name="lastName"
                type="string"
                label="Last Name"
                placeholder="Enter your Last Name"
                errors={errors}
              />
              <FormInput
                isRequired
                control={control}
                name="email"
                type="string"
                label="Email"
                placeholder="Enter your email"
                errors={errors}
              />
              <FormInput
                isRequired
                control={control}
                name="password"
                type="string"
                label="Password"
                placeholder="Enter your password"
                errors={errors}
              />
              <FormInput
                isRequired
                control={control}
                name="mobile"
                type="string"
                label="Mobile"
                placeholder="Enter your mobile number"
                errors={errors}
              />
              <FormInput
                control={control}
                name="altEmail"
                type="string"
                label="Alternate Email"
                placeholder="Enter your alternate email"
                errors={errors}
              />
              <FormInput
                control={control}
                name="altMobile"
                type="string"
                label="Alternate Mobile"
                placeholder="Enter your alternate mobile number"
                errors={errors}
              />

              <MultiSelectTypeahead
                name="roles"
                control={control}
                options={roles}
                onCompletion={(query) => {
                  setRolesText(query || '');
                }}
                loading={rolesLoading}
                optionValue="id"
                optionLabel="name"
                placeholder="Search Roles..."
              />
            </div>
            <button className="submit-btn" type="submit" disabled={creating}>
              {creating ? 'Saving...' : 'Save User'}
            </button>
          </form>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Alt Email</th>
            <th>Alt Mobile</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index: any) => (
              <tr key={index}>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.altEmail || '-'}</td>
                <td>{user.altMobile || '-'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', color: '#888' }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </UserDiv>
  );
};

export default Users;
