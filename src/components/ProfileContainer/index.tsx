import React from 'react';

export type ProfileContainerObject = {
    name: string;
    ids: Array<number>;
};

export interface ProfileContainerProps {
    value: number;
    object?: ProfileContainerObject;
}

const ProfileContainer: React.FC<ProfileContainerProps> = ({ value, children, object }) => {
    return (
        <div>
            <div>name: {object?.name}</div>
            <div>ids: {object?.ids.toString()}</div>
            <div>value: {value}</div>
            <div>{children}</div>
        </div>
    );
};
export default ProfileContainer;
