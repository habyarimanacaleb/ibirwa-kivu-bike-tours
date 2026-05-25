// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Portal Authentication & Registration Workflows', () => {

  // Automatically navigates from the homepage to the Access Portal before every test scenario
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /sign\s*in/i }).click();
    await page.waitForURL('**/join');
  });

  test('should reject empty form submissions and display client validation rules', async ({ page }) => {
    // 1. Click the action submission button by its exact text name
    const submitButton = page.getByRole('button', { name: 'Authorize Entry' });
    await submitButton.click();

    // 2. Select your text element using its accessible role label configuration
    const emailInput = page.getByRole('textbox', { name: 'Identifier' });
    
    // Check if the element triggers native HTML5 validation constraints
    const isFormInvalid = await emailInput.evaluate((el) => {
      const input = /** @type {HTMLInputElement} */ (el);
      return !input.checkValidity();
    });
    
    if (!isFormInvalid) {
      const inlineFieldError = page.getByText(/required|cannot be blank|invalid/i).first();
      await expect(inlineFieldError).toBeVisible();
    } else {
      expect(isFormInvalid).toBe(true);
    }
  });

  test('should validate bad email formats dynamically', async ({ page }) => {
    const emailInput = page.getByRole('textbox', { name: 'Identifier' });
    const passwordInput = page.getByRole('textbox', { name: 'Access Key' });

    // Triple click ensures any default pre-filled template text gets selected and cleared out completely
    await emailInput.click({ clickCount: 3 }); 
    await emailInput.fill('invalid-email-format');
    
    await passwordInput.click({ clickCount: 3 });
    await passwordInput.fill('ValidPassword123!');
    
    await page.getByRole('button', { name: 'Authorize Entry' }).click();

    // Check for structural validation warning states
    const formatError = page.getByText(/email|format|valid|identifier/i).first();
    const validationMessage = await emailInput.evaluate((el) => /** @type {HTMLInputElement} */(el).validationMessage);
    
    if (!validationMessage) {
      await expect(formatError).toBeVisible();
    } else {
      expect(validationMessage.length).toBeGreaterThan(0);
    }
  });

  test('should switch to registration panel and validate new account inputs', async ({ page }) => {
    // 1. Locate and click the custom tab component switch option labeled "Register"
    const registerTab = page.getByRole('button', { name: 'Register', exact: true });
    await expect(registerTab).toBeVisible();
    await registerTab.click();

    // 2. Assert that the panel view state successfully sets the tab element active
    await expect(registerTab).toHaveAttribute('aria-selected', 'true', { timeout: 5000 }).catch(() => {
      // Fallback check in case you don't use standard aria tokens yet: verify custom CSS layout flags
      return expect(registerTab).toHaveClass(/active|selected/i);
    });

    // 3. Form Submission Check: Trigger an unresolved empty action pass for registration fields
    // If the submission button name shifts from "Authorize Entry" to "Create Account" or "Register" on tab swap,
    // we use a flexible regex tracker to catch whichever submission target shows up
    const registerSubmitButton = page.getByRole('button', { name: /authorize|create|register|submit/i });
    await registerSubmitButton.click();

    // 4. Assert that fields like the password verification or new username are flagged appropriately
    const registrationInput = page.getByRole('textbox').first();
    const isRegisterInvalid = await registrationInput.evaluate((el) => !/** @type {HTMLInputElement} */(el).checkValidity());
    
    expect(isRegisterInvalid).toBe(true);
  });

});
