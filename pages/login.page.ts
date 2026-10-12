import { Locator, Page } from '@playwright/test';

/**
 * Page Object representing the Authentication / Login screen.
 * Provides methods for user credential entry and error state retrieval.
 */
export class LoginPage {
  readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  /**
   * Url pattern
   */
  static readonly URL_PATTERN = /\//;

  /**
   * Error messages
   */
  static readonly ERROR_MESSAGES = {
    LOCKED_OUT: /.*locked out/i
  } as const;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  /**
   * Navigates to the login page using the base URL.
   * @returns A promise that resolves when the navigation is complete.
   */
  async goto(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  /**
   * Executes the login sequence.
   * @param user - The username string.
   * @param pass - The password string.
   * @example await loginPage.login('standard_user', 'secret_sauce');
   */
  async login(user: string, pass: string): Promise<void> {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    
    await this.loginButton.click();
  }

  /**
   * Provides access to the error message locator for Web-First assertions in tests.
   * @returns The Locator for the error message container.
   */
  getErrorMessageLocator(): Locator {
    return this.errorMessage;
  }

  /**
   * Retrieves the current text content of the error message if it exists.
   * @returns A promise resolving to the error text or null.
   */
  async getErrorMessageText(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }
  
}