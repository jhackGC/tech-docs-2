import { test, expect } from '@playwright/test';

test.describe('Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default');
  });

  test('should be focusable with keyboard', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Button' });
    
    // Focus the button with Tab key
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
    
    // Check focus outline is visible
    await expect(button).toHaveCSS('outline', /.*solid.*/);
  });

  test('should be clickable with keyboard', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Button' });
    
    await button.focus();
    
    // Click with Enter key
    await page.keyboard.press('Enter');
    
    // Click with Space key
    await page.keyboard.press('Space');
  });

  test('should have proper aria attributes', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Button' });
    
    await expect(button).toHaveAttribute('type', 'button');
    await expect(button).not.toHaveAttribute('aria-disabled');
  });

  test('disabled button should not be interactive', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--disabled');
    
    const button = page.getByRole('button', { name: 'Disabled Button' });
    
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('aria-disabled', 'true');
    
    // Should not be focusable
    await page.keyboard.press('Tab');
    await expect(button).not.toBeFocused();
  });

  test('loading button should not be interactive', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--loading');
    
    const button = page.getByRole('button', { name: 'Loading Button' });
    
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('aria-disabled', 'true');
    
    // Should show loading spinner
    const spinner = button.locator('.btn__spinner');
    await expect(spinner).toBeVisible();
  });
});
