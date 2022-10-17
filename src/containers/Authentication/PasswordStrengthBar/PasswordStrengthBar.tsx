import useTranslation from 'next-translate/useTranslation';
import { FC } from 'react';
import PasswordStrengthBarComp from 'react-password-strength-bar';

interface PasswordStrengthBarProps {
  value: string;
}

const PasswordStrengthBar: FC<PasswordStrengthBarProps> = ({ value }) => {
  const { t: translate } = useTranslation('common');
  return (
    <PasswordStrengthBarComp
      password={value}
      minLength={8}
      scoreWords={[
        translate('PASSWORD_STRENGTH_WEAK'),
        translate('PASSWORD_STRENGTH_WEAK'),
        translate('PASSWORD_STRENGTH_OKAY'),
        translate('PASSWORD_STRENGTH_GOOD'),
        translate('PASSWORD_STRENGTH_STRONG'),
      ]}
      shortScoreWord={translate('PASSWORD_STRENGTH_TOO_SHORT')}
      data-testid="password-strength-bar-id"
    />
  );
};

export default PasswordStrengthBar;
