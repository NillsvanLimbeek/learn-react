import React from 'react';
import './Users.css';

import UserItem from './UserItem';
import { Spinner } from '../spinner/Spinner';

const Users = ({ users, loading }) => {
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
