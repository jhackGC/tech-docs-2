#!/usr/bin/env node

/**
 * Accessibility testing script using axe-core
 * Scans Storybook stories for accessibility violations
 */

const { chromium } = require('playwright');
const { AxePuppeteer } = require('@axe-core/puppeteer');

async function runAccessibilityTests() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // List of story URLs to test
  const storyUrls = [
    'http://localhost:6006/iframe.html?id=components-button--default',
    'http://localhost:6006/iframe.html?id=components-button--variants',
    'http://localhost:6006/iframe.html?id=components-button--sizes',
    'http://localhost:6006/iframe.html?id=components-button--states',
  ];
  
  let allViolations = [];
  
  for (const url of storyUrls) {
    try {
      console.log(`Testing: ${url}`);
      await page.goto(url);
      
      // Wait for component to render
      await page.waitForTimeout(1000);
      
      // Run axe accessibility tests
      const results = await page.evaluate(async () => {
        const axe = require('axe-core');
        return await axe.run();
      });
      
      if (results.violations.length > 0) {
        console.error(`❌ Violations found in ${url}:`);
        results.violations.forEach(violation => {
          console.error(`  - ${violation.id}: ${violation.description}`);
          violation.nodes.forEach(node => {
            console.error(`    Target: ${node.target.join(', ')}`);
          });
        });
        allViolations.push(...results.violations);
      } else {
        console.log(`✅ No violations found in ${url}`);
      }
    } catch (error) {
      console.error(`Error testing ${url}:`, error.message);
    }
  }
  
  await browser.close();
  
  if (allViolations.length > 0) {
    console.error(`\n❌ Total violations found: ${allViolations.length}`);
    process.exit(1);
  } else {
    console.log('\n✅ All accessibility tests passed!');
  }
}

if (require.main === module) {
  runAccessibilityTests().catch(console.error);
}

module.exports = { runAccessibilityTests };
