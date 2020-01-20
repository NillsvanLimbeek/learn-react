import React, { useContext } from 'react';
import './Users.css';

import GithubContext from '../../context/github/githubContext';

import UserItem from './UserItem';
import { Spinner } from '../spinner/Spinner';

const Users = () => {
    const { loading, users } = useContext(GithubContext);

    if (loading) {
        return <Spinner />;
    } else {
        return (
            <div className="user-style">
                {users.map((user) => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        );
    }
};

export default Users;
