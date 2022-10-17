import { customRender, screen, userEvent, waitFor } from 'common/test';

import Login from '.';

const elements = {
  wrapper: 'login-form-wrapper-id',
  emailInput: 'LOGIN_INPUT_EMAIL',
  emailInvalid: 'LOGIN_VALIDATION_EMAIL_INVALID',
  passwordInput: 'LOGIN_INPUT_PASSWORD',
  passwordRequired: 'LOGIN_VALIDATION_PASSWORD_REQUIRED',
  loginBtnSubmit: 'LOGIN_BUTTON_SUBMIT',
  showPasswordBtn: 'show-password-btn-id',
  passwordVisibilityOffIcon: 'password-visibility-off-id',
  toggleMode: 'toggle-theme-mode-id',
  linkButtonCreateAccount: 'LOGIN_CREATE_ACCOUNT',
  linkButtonForgotPassword: 'LOGIN_FORGOT_PASSWORD',
} as const;

const mockCallbackLinkButton = jest.fn();

describe('<Login />', () => {
  it('Render component', async () => {
    customRender(<Login />);

    expect(screen.getByTestId(elements.wrapper)).toBeInTheDocument();
  });

  it('Show input error message for invalid inputs after submit', async () => {
    customRender(<Login />);

    await userEvent.type(screen.getByPlaceholderText(elements.emailInput), 'invalidEmail');
    await userEvent.click(screen.getByText(elements.loginBtnSubmit));

    expect(await screen.findByText(elements.emailInvalid)).toBeInTheDocument();
    expect(await screen.findByText(elements.passwordRequired)).toBeInTheDocument();
  });

  it('Replace password type to text when showPassword = true', async () => {
    customRender(<Login />);

    userEvent.click(screen.getByTestId(elements.showPasswordBtn));

    await waitFor(async () => {
      expect(screen.getByTestId(elements.passwordVisibilityOffIcon)).toBeInTheDocument();
    });
  });

  it('Submit form if all data is valid', async () => {
    customRender(<Login />);

    await userEvent.type(screen.getByPlaceholderText(elements.emailInput), 'useremail@test.com');
    await userEvent.type(screen.getByPlaceholderText(elements.passwordInput), 'test1234');

    await userEvent.click(screen.getByText(elements.loginBtnSubmit));

    /* To be change once integration is ready */
    await waitFor(async () => {
      expect(screen.getByText('Sample error message!')).toBeInTheDocument();
    });
  });

  it('Render component with callbackLinkButton', async () => {
    customRender(<Login callbackLinkButton={mockCallbackLinkButton} />);

    await userEvent.click(screen.getByText(elements.linkButtonForgotPassword));

    expect(mockCallbackLinkButton).toBeCalled();

    await userEvent.click(screen.getByText(elements.linkButtonCreateAccount));

    expect(mockCallbackLinkButton).toBeCalled();
  });
});
