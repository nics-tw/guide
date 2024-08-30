---
layout: main
title: 檢測工具導入文件
text_only: 1
---

自動化檢測工具功能為輔助進行無障礙符合度檢測，但無法替代人工檢測。可以被自動化檢測的規則，僅能檢測出已知使用障礙的 3 成。完整的無障礙符合度稽核，建議遵循 WCAG-EM 規範並使用 WCAG-EM reporting tool 產出報告。

### WAI 無障礙檢測工具清單（由工具發布者提報）
- [Web Accessibility Evaluation Tools List](https://www.w3.org/WAI/test-evaluate/tools/list/)

### 候選工具

---

- [GitHub \- dequelabs/axe-core: Accessibility engine for automated Web UI testing](https://github.com/dequelabs/axe-core)  
Most popular tool from Deque

- [GitHub \- pa11y/pa11y-ci: Pa11y CI is a CI-centric accessibility test runner, built using Pa11y](https://github.com/pa11y/pa11y-ci)  
Pa11y CI is a CI-centric accessibility test runner, built using Pa11y. WCAG2A, WCAG2AA (default), WCAG2AAA – only used by htmlcs runner.

- [Purple A11y \- Automating Testing to Improve Web Accessibility for Apps and Websites | Singapore Government Developer Portal (tech.gov.sg)](https://www.developer.tech.gov.sg/products/categories/design/purple-a11y/overview.html)  
Based on axe-core published by Singapore Government.

- [Accessibility testing | GitLab](https://docs.gitlab.com/ee/ci/testing/accessibility\_testing.html)  
Pa11y is a free and open source tool for measuring the accessibility of web sites. GitLab integrates Pa11y into a [CI/CD job template](https://gitlab.com/gitlab-org/gitlab/-/blob/master/lib/gitlab/ci/templates/Verify/Accessibility.gitlab-ci.yml).   
As of GitLab 14.5, Pa11y uses WCAG 2.1 rules

- [Web Accessibility Pipeline - accessiBe](https://accessibe.com/accessflow/integrate)  

- [Developer Tools for Accessibility Level Access](https://www.levelaccess.com/developer-tools/)  
with [Mocha - the fun, simple, flexible JavaScript test framework (mochajs.org)](https://mochajs.org/), [BDD Testing & Collaboration Tools for Teams | Cucumber](https://cucumber.io/)

- [HTML_CodeSniffer (squizlabs.github.io)](https://squizlabs.github.io/HTML\_CodeSniffer/)  
List Principle, SC, & Technique  
WCAG 2.1, Section 508

- [@axe-core/reporter-earl - npm (npmjs.com)](https://www.npmjs.com/package/@axe-core/reporter-earl)  
A reporter for axe-core it will produce results using the Evaluation And Reporting Language (EARL) 1.0.

- [https://www.ibm.com/able/toolkit/tools](https://www.ibm.com/able/toolkit/tools)

### 設計稿工具  
- [Stark: The suite of integrated accessibility tools (getstark.co)](https://www.getstark.co/figma/)  
plugin 綜合性無障礙自動檢測。

- [axe for Designers: A Free Accessibility Plugin – Figma](https://www.figma.com/community/plugin/1085612091163821851/axe-for-designers-a-free-accessibility-plugin)  
plugin 綜合性無障礙自動檢測。

- [Contrast - Figma](https://www.figma.com/community/plugin/748533339900865323/contrast)  
plugin 輔助設計成品色彩組合有足夠對比度，功能是檢測 WCAG 規範 AA、AAA 等級的對比度符合度。

- [A11y - Focus Order – Figma](https://www.figma.com/community/plugin/731310036968334777/a11y-focus-order)  
plugin 輔助設計鍵盤導覽順序，功能是在設計元素/元件標示焦點以及焦點順序。

- [Text Resizer - Accessibility Checker Figma](https://www.figma.com/community/plugin/892114953056389734/text-resizer-accessibility-checker)  
plugin 輔助設計成品在字級調整時有足夠調適性，功能是快速批次調整字級大小。

- [Low Vision – Figma](https://www.figma.com/community/plugin/940423402083252469/low-vision)  
plugin 輔助避免低視能相關設計風險，功能是模擬低視能者所看到的景象。

- [Color Blind – Figma](https://www.figma.com/community/plugin/733343906244951586/color-blind)  
plugin 輔助避免色覺辨識障礙相關設計風險，功能是模擬不同樣態的色覺功能所看到的景象。

- [A11y Annotation Kit - Figma](https://www.figma.com/community/file/953682768192596304/a11y-annotation-kit)  
tool kit 輔助對設計稿進行無障礙標示，例如閱讀順序、焦點及焦點順序等。

- [Inclusive Design illustrations - Figma](https://www.figma.com/community/file/946569165254852480/inclusive-design-illustrations)  

- [Accessible design toolkit - Figma](https://www.figma.com/community/file/1327037919540849715/accessible-design-toolkit)  

## Continuous Design

- [figma-plugin-continuous-design/README.md at main · mikaelvesavuori/figma-plugin-continuous-design · GitHub](https://github.com/mikaelvesavuori/figma-plugin-continuous-design/blob/main/README.md)  
  搭配閱讀：  
  - [GitHub \- mikaelvesavuori/github-ci-demo: This is a basic demonstration of what is needed to run a GitHub Actions CI build by calling their REST API.](https://github.com/mikaelvesavuori/github-ci-demo)  
  - [Mikael Vesavuori / gitlab-ci-demo · GitLab](https://gitlab.com/mikaelvesavuori/gitlab-ci-demo)  
  - [GitHub \- mikaelvesavuori/azure-devops-ci-demo: This is a basic demonstration of what is needed to run a Azure DevOps CI build by calling their REST API. We are using Figmagic for this demo, to demonstrate running it in CI.](https://github.com/mikaelvesavuori/azure-devops-ci-demo)  
- [Level Access Figma plugin | Figma](https://www.figma.com/community/plugin/1268557036921715308/level-access-figma-plugin)  
  plugin works by helping you check for common accessibility issues in the core building blocks of your design—things like buttons, links, text input fields, and checkboxes. Once you select an element you’d like to check, identify the element within the plugin, and review your results instantly.   
- [Tokens Studio for Figma (Figma Tokens) | Figma](https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma-figma-tokens)  
  can store your design tokens in JSON, sync them with a sync provider such as GitHub and define tokens  
- [Token Export | Figma](https://www.figma.com/community/plugin/1318612019979212772/token-export)  
  allows you to selectively export variable collections and modes. 搭配閱讀：[Design Tokens Format Module](https://tr.designtokens.org/format/)

## git hook

- [Using a Git Pre-Commit Hook with axe DevTools Linter | Deque Docs](https://docs.deque.com/linter/4.0.0/en/axe-linter-git-pre-commit-hook)  
  To use the pre-commit hook to block GitHub commits which contain accessibility errors.

## Linter

- [axe Accessibility Linter \- Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=deque-systems.vscode-axe-linter)  
  Check code files for common accessibility defects. Checks React (JSX), React Native, Angular, Vue, HTML, and Markdown.  
- [axe Linter · GitHub Marketplace · GitHub](https://github.com/marketplace/axe-linter)  
  Automatically find and fix accessibility issues with axe Linter. Axe Linter analyzes the changed or added code of your GitHub pull requests, reports issues and intelligently requests changes for common issues- all before your pull request gets reviewed and the code gets merged. 搭配閱讀：[Using the axe DevTools Linter GitHub Action | Deque Docs](https://docs.deque.com/linter/4.0.0/en/axe-linter-github-action)  
- [AccessLint \- Automated and continuous web accessibility testing](https://accesslint.com/)  
  AccessLint is a GitHub App that finds accessibility issues in your pull requests.  
- [ASLint – Accessibility testing tool](https://aslint.org/)  
  Verify accessibility of your content in real-time, including Single Page Applications. Review results and determine the impact on the business. Does not send content or data externally, so can be used for internal-only purposes. Tests can be run asynchronously (without blocking the UI) or synchronously. Provides code snippet to add to build pipeline (e.g. for automation tests) or developer console, or can run as a bookmarklet. Easy locating issues on the page from the results using element detector or XPath Color contrast recommendations. Provides checklist for things that can't be tested automatically.  
  WCAG A, WCAG AA, & eSSENTIAL from levelaccess, Section 508  
- [GitHub \- AccessLint/accesslint.js: Keep accessibility errors in check.](https://github.com/AccessLint/accesslint.js)  
  Include the javascript in your page before \</body\>. Then, run your acceptance tests to get accessibility warning logs, or open your browser and get automatic warnings in the JavaScript console.  
- [GitHub \- jsx-eslint/eslint-plugin-jsx-a11y: Static AST checker for a11y rules on JSX elements.](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y\#supported-rules)  
  Static AST checker for accessibility rules on JSX elements. Because it only catches errors in static code, use it in combination with @axe-core/react to test the accessibility of the rendered DOM.  
- [GitHub \- FormidableLabs/eslint-plugin-react-native-a11y: React Native specific accessibility linting rules.](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y)  
  a collection of React Native specific ESLint rules for identifying accessibility issues. Building upon the foundation set down by eslint-plugin-jsx-a11y  
- [React’s Accessibility Code Linter \- 24 Accessibility (24a11y.com)](https://www.24a11y.com/2017/reacts-accessibility-code-linter/)  
  incorporate eslint-plugin-jsx-a11y into Travis CI, a very popular CI service that works well with GitHub code repositories.  
- [GitHub \- maranran/eslint-plugin-vue-a11y: Static AST checker for accessibility rules on elements in .vue](https://github.com/maranran/eslint-plugin-vue-a11y)  
  Static AST checker for accessibility rules on elements in .vue.  
- [GitHub \- vue-a11y/eslint-plugin-vuejs-accessibility: An eslint plugin for checking Vue.js files for accessibility](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility)  
  An eslint plugin for checking Vue.js files for accessibility  
- [@angular-eslint/eslint-plugin-template \- npm (npmjs.com)](https://www.npmjs.com/package/@angular-eslint/eslint-plugin-template)   
  搭配閱讀：[Angular ESLint Rules for Accessible HTML Content \- DEV Community](https://dev.to/angular/angular-eslint-rules-for-accessible-html-content-kf5)

## Unit test

- [GitHub \- dequelabs/agnostic-axe: Framework agnostic accessibility reporter, powered by axe-core](https://github.com/dequelabs/agnostic-axe)  
  which detect UI changes and re-run a11y checks on the new state of the UI.  
- [@axe-core/react \- npm (npmjs.com)](https://www.npmjs.com/package/@axe-core/react)  
  which detect UI changes and re-run a11y checks on the new state of the UI.

## Acceptance test

- [cypress-axe \- npm (npmjs.com)](https://www.npmjs.com/package/cypress-axe)  
Test accessibility with axe-core in Cypress.  
搭配閱讀：[🚅 Building a Cypress Accessibility Pipeline with Next.js and Axe \- DEV Community](https://dev.to/lundjrl/building-a-cypress-accessibility-pipeline-with-nextjs-and-axe-5146)

## Performance test

- [GitHub \- GoogleChrome/lighthouse-ci: Automate running Lighthouse for every commit, viewing the changes, and preventing regressions](https://github.com/GoogleChrome/lighthouse-ci)  
  Lighthouse CI is a suite of tools that make continuously running, saving, retrieving, and asserting against Lighthouse results as easy as possible.
