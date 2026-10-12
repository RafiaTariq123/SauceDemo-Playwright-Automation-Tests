# 🚀 Playwright E2E Automation Framework | SauceDemo

A robust, enterprise-grade End-to-End (E2E) automation framework built with **Playwright** and **TypeScript**. This project demonstrates modern QA automation practices, including the Page Object Model (POM) architecture, global authentication setup, and cross-browser testing.

## 🛒 Application Under Test (SauceDemo)

This framework is designed to test [SauceDemo (Swag Labs)](https://www.saucedemo.com/), a mock e-commerce web application specifically built to practice UI automation. The test suite automatically validates critical business flows, including:

- **Authentication:** Secure login flows, error handling for invalid/locked-out users, and state persistence.
- **Inventory Management:** Dynamic product sorting, adding/removing items, and verifying real-time UI updates (like the shopping cart badge).
- **Checkout & Purchase:** End-to-end user journeys from cart review and shipping information entry to successful order completion.

## 🛠️ Tech Stack

- **Framework:** [Playwright Test](https://playwright.dev/)
- **Language:** TypeScript
- **Design Pattern:** Page Object Model (POM)
- **Reporting:** Playwright HTML Reporter

## 📥 Getting Started

Follow these step-by-step instructions to set up and run this project on your local machine.

### 1. Prerequisites

Ensure you have the following installed on your machine:

- [**Node.js**](https://nodejs.org/) (v14 or higher recommended)
- **Git**

### 2. Installation

Clone the repository and install the required dependencies:

```bash
# Clone the repository
git clone https://github.com/RafiaTariq123/saucedemo-playwright-typescript.git

# Navigate into the project directory
cd saucedemo-playwright-typescript-main

# Install project dependencies
npm install

# Install Playwright browsers (Chromium, Firefox, WebKit)
npx playwright install
```

## 🧪 Running the Tests

This framework is configured with custom project states (public vs. logged-in) rather than default browser names. Use the following commands in your terminal to execute the suite.

**Run all tests in the background (Headless mode - Recommended):**
```bash
npx playwright test
```

**Run tests with a visible browser (Headed mode):**
```bash
npx playwright test --headed
```
> *Note: If you run tests in headed mode and click outside the browser window, Firefox may pause rendering and cause a timeout. It is recommended to run the suite in headless mode for maximum stability.*

**Run tests in Playwright's interactive UI mode:**
```bash
npx playwright test --ui
```

**Run tests for a specific configured project (e.g., Chromium suites):**
```bash
# Run the public (unauthenticated) test suite on Chromium
npx playwright test --project=public-chromium-desktop

# Run the logged-in test suite on Chromium
npx playwright test --project=logged-in-chromium-desktop
```

## 📊 Viewing the Test Report

Playwright automatically generates a detailed HTML report after execution. It includes execution logs, step-by-step traces, and screenshots for any failed tests.

To view the report, run:
```bash
npx playwright show-report
```

## 🛠️ Troubleshooting

**Firefox/WebKit Timeout on Clicks:**
If Playwright hangs for 30,000ms while attempting to click a visible button (e.g., Login or Add to Cart) in Firefox or WebKit, bypass the browser's actionability check by applying `force: true` to the locator in your Page Object classes:
```typescript
await this.loginButton.click({ force: true });
```

## 🏗️ Project Architecture Highlights

- **Global Setup (Authentication):** The framework logs in once at the start of the test run, saves the session state (`user.json`), and reuses it for subsequent tests. This drastically reduces test execution time.
- **Page Object Model:** UI elements and actions are separated into distinct classes inside the `pages/` directory, keeping the actual test files (`tests/ui/`) clean and highly readable.
- **Resilient Locators:** Tests rely on user-facing locators (e.g., `getByRole`, `getByTestId`) rather than brittle DOM paths, ensuring tests do not break from minor styling changes.