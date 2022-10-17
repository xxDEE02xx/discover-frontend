import { customRender, screen, userEvent, waitFor } from 'common/test';

import ToggleThemeMode from 'components/ToggleThemeMode';

import ForgotPassword from '.';

const elements = {
  wrapper: 'forgot-password-form-wrapper-id',
  emailInput: 'FORGOT_PASSWORD_INPUT_EMAIL',
  emailInvalid: 'FORGOT_PASSWORD_VALIDATION_EMAIL_INVALID',
  forgotPasswordBtnSubmit: 'FORGOT_PASSWORD_BUTTON_SUBMIT',
  toggleMode: 'toggle-theme-mode-id',
  linkButtonForgotPassword: 'FORGOT_PASSWORD_CREATE_ACCOUNT',
  sucessContactUsMessage: 'FORGOT_PASSWORD_SUCCESS_MESSAGE',
} as const;

const mockCallbackLinkButton = jest.fn();

describe('<ForgotPassword />', () => {
  it('Render component', async () => {
    customRender(
      <>
        <ToggleThemeMode />
        <ForgotPassword />
      </>
    );

    const toggleModeBtn = screen.getByTestId(elements.toggleMode);
    await userEvent.click(toggleModeBtn); // for code coverage

    expect(screen.getByTestId(elements.wrapper)).toBeInTheDocument();
  });

  it('Show input error message for invalid inputs after submit', async () => {
    customRender(<ForgotPassword />);

    await userEvent.type(screen.getByPlaceholderText(elements.emailInput), 'invalidEmail');
    await userEvent.click(screen.getByText(elements.forgotPasswordBtnSubmit));

    expect(await screen.findByText(elements.emailInvalid)).toBeInTheDocument();
  });

  it('Submit form if all data is valid', async () => {
    customRender(<ForgotPassword />);

    await userEvent.type(screen.getByPlaceholderText(elements.emailInput), 'useremail@test.com');

    await userEvent.click(screen.getByText(elements.forgotPasswordBtnSubmit));

    /* To be change once integration is ready */
    await waitFor(async () => {
      expect(screen.getByText(elements.sucessContactUsMessage)).toBeInTheDocument();
    });
  });

  it('Render component with callbackLinkButton', async () => {
    customRender(<ForgotPassword callbackLinkButton={mockCallbackLinkButton} />);

    await userEvent.click(screen.getByText(elements.linkButtonForgotPassword));

    expect(mockCallbackLinkButton).toBeCalled();
  });
});
