import { customRender, fireEvent, screen, userEvent, waitFor } from 'common/test';

import Authentication from './';

const elements = {
  wrapper: 'authentication-wrapper-id',
  loginWrapper: 'login-form-wrapper-id',
  forgotPasswordWrapper: 'forgot-password-form-wrapper-id',
  forgotPasswordLinkButton: 'LOGIN_FORGOT_PASSWORD',
  toggleTheme: 'toggle-theme-mode-id',
} as const;

describe('Authentication', () => {
  it('Render component, login by default', async () => {
    customRender(<Authentication />);

    const toggleTheme = screen.getByTestId(elements.toggleTheme);

    await fireEvent.click(toggleTheme);

    expect(screen.getByTestId(elements.wrapper)).toBeInTheDocument();
    expect(screen.getByTestId(elements.loginWrapper)).toBeInTheDocument();
  });

  it('Render forgot password on user callbackLinkButton', async () => {
    customRender(<Authentication />);

    await userEvent.click(screen.getByText(elements.forgotPasswordLinkButton));

    await waitFor(async () => {
      expect(screen.getByTestId(elements.forgotPasswordWrapper)).toBeInTheDocument();
    });
  });
});
