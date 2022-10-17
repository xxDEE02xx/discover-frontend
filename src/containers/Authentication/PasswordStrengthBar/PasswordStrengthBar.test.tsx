import { customRender, screen } from 'common/test';

import PasswordStrengthBar from '.';

const elements = {
  wrapper: 'password-strength-bar-id',
  messageTooShort: 'PASSWORD_STRENGTH_TOO_SHORT',
  messageWeak: 'PASSWORD_STRENGTH_WEAK',
  messageOkay: 'PASSWORD_STRENGTH_OKAY',
  messageGood: 'PASSWORD_STRENGTH_GOOD',
  messageStrong: 'PASSWORD_STRENGTH_STRONG',
} as const;

describe('PasswordStrengthBar', () => {
  it.each`
    message                     | value
    ${elements.messageTooShort} | ${''}
    ${elements.messageWeak}     | ${'Test1234'}
    ${elements.messageOkay}     | ${'Test1234!02'}
    ${elements.messageGood}     | ${'Test1234!02@'}
    ${elements.messageStrong}   | ${'Test1234!02@321'}
  `('should return message=$message', ({ message, value }) => {
    customRender(<PasswordStrengthBar value={value} />);

    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
