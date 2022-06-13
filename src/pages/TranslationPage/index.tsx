import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';

const TranslationPage: React.FC = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div>
            <Button onClick={() => changeLanguage('en')}>EN</Button>
            <Button onClick={() => changeLanguage('de')}>DE</Button>
            TranslationPage !!
            {t('title')}
        </div>
    );
};

export default TranslationPage;
