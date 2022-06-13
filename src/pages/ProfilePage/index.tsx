import React from 'react';

import { ProfileContainerProps } from 'components/ProfileContainer';

const ProfilePage: React.FC = () => {
    const _containerVariables: ProfileContainerProps = {
        value: 2,
        object: {
            name: 'abc',
            ids: [1, 2, 3, 4],
        },
    };
    return <div></div>;
};

export default ProfilePage;
