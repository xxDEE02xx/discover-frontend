import { customRender, screen, userEvent, waitFor } from 'common/test';

import ResetPassword from '.';

const elements = {
  wrapper: 'reset-password-form-wrapper-id',
  passwordInput: 'RESET_PASSWORD_INPUT_PASSWORD',
  confirmPasswordInput: 'RESET_PASSWORD_INPUT_CONFIRM_PASSWORD',
  resetPasswordBtnSubmit: 'RESET_PASSWORD_BUTTON_SUBMIT',
  showPasswordBtn: 'show-password-btn-id',
  passwordVisibilityOffIcon: 'password-visibility-off-id',
  passwordRequired: 'RESET_PASSWORD_REQUIRED',
  passwordMinimum: 'RESET_PASSWORD_MININUM_CHARACTER',
  passwordMaximum: 'RESET_PASSWORD_MAXIMUM_CHARACTER',
  passwordNeedLowercase: 'RESET_PASSWORD_LOWERCASE_CHARACTER',
  passwordNeedUppercase: 'RESET_PASSWORD_UPPERCASE_CHARACTER',
  passwordNeedNumber: 'RESET_PASSWORD_NUMBER_CHARACTER',
  passwordNeedSpecialChar: 'RESET_PASSWORD_SPECIAL_CHARACTER',
  password3Consecutive: 'RESET_PASSWORD_DUPLICATE_CHARACTER',
  confirmPasswordRequired: 'RESET_PASSWORD_CONFIRM_REQUIRED',
  confirmPasswordNotMatch: 'RESET_PASSWORD_NOT_MATCH',
} as const;

describe('<ResetPassword />', () => {
  it('Render component', async () => {
    customRender(<ResetPassword />);

    expect(screen.getByTestId(elements.wrapper)).toBeInTheDocument();
  });

  it('Replace password type to text when showPassword = true', async () => {
    customRender(<ResetPassword />);

    userEvent.click(screen.getByTestId(elements.showPasswordBtn));

    await waitFor(async () => {
      expect(screen.getByTestId(elements.passwordVisibilityOffIcon)).toBeInTheDocument();
    });
  });

  it.each`
    messagePassword                     | messageConfirmPassword              | password                              | confirmPassword
    ${elements.passwordRequired}        | ${elements.confirmPasswordRequired} | ${''}                                 | ${''}
    ${elements.passwordMinimum}         | ${elements.confirmPasswordNotMatch} | ${'Test'}                             | ${'Test1234!'}
    ${elements.passwordMaximum}         | ${elements.confirmPasswordNotMatch} | ${'Test1234Test1234Test1234Test1234'} | ${'Test1234!'}
    ${elements.passwordNeedLowercase}   | ${elements.confirmPasswordNotMatch} | ${'TEST1234'}                         | ${'Test1234!'}
    ${elements.passwordNeedUppercase}   | ${elements.confirmPasswordNotMatch} | ${'test1234'}                         | ${'Test1234!'}
    ${elements.passwordNeedNumber}      | ${elements.confirmPasswordNotMatch} | ${'ThisIsTest'}                       | ${'Test1234!'}
    ${elements.passwordNeedSpecialChar} | ${elements.confirmPasswordNotMatch} | ${'Test1234'}                         | ${'Test1234!'}
    ${elements.password3Consecutive}    | ${elements.confirmPasswordNotMatch} | ${'Test1234!xxx'}                     | ${'Test1234!'}
  `(
    'should return expected error messages, password=$messagePassword and confirm password=$messageConfirmPassword',
    async ({ messagePassword, messageConfirmPassword, password, confirmPassword }) => {
      customRender(<ResetPassword />);

      if (password) {
        await userEvent.type(screen.getByPlaceholderText(elements.passwordInput), password);
      }

      if (confirmPassword) {
        await userEvent.type(
          screen.getByPlaceholderText(elements.confirmPasswordInput),
          confirmPassword
        );
      }

      await userEvent.click(screen.getByText(elements.resetPasswordBtnSubmit));

      expect(await screen.findByText(messagePassword)).toBeInTheDocument();
      expect(await screen.findByText(messageConfirmPassword)).toBeInTheDocument();
    }
  );

  it('Submit form if all data is valid', async () => {
    customRender(<ResetPassword />);

    await userEvent.type(screen.getByPlaceholderText(elements.passwordInput), 'Test1234!');
    await userEvent.type(screen.getByPlaceholderText(elements.confirmPasswordInput), 'Test1234!');

    await userEvent.click(screen.getByText(elements.resetPasswordBtnSubmit));

    /* To be change once integration is ready */
    await waitFor(async () => {
      expect(screen.getByText('Sample error message!')).toBeInTheDocument();
    });
  });
});
