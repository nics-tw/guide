---
layout: main
title: 檢測工具導入文件
text_only: 1
---

### 候選工具

---

[GitHub \- dequelabs/axe-core: Accessibility engine for automated Web UI testing](https://github.com/dequelabs/axe-core)  
most popular tool from Deque

[GitHub \- pa11y/pa11y-ci: Pa11y CI is a CI-centric accessibility test runner, built using Pa11y](https://github.com/pa11y/pa11y-ci)  
Pa11y CI is a CI-centric accessibility test runner, built using Pa11y  
WCAG2A, WCAG2AA (default), WCAG2AAA – only used by htmlcs runner

[Purple A11y \- Automating Testing to Improve Web Accessibility for Apps and Websites | Singapore Government Developer Portal (tech.gov.sg)](https://www.developer.tech.gov.sg/products/categories/design/purple-a11y/overview.html)  
Based on axe-core from singapore gov

[Accessibility testing | GitLab](https://docs.gitlab.com/ee/ci/testing/accessibility\_testing.html)  
Pa11y is a free and open source tool for measuring the accessibility of web sites. GitLab integrates Pa11y into a [CI/CD job template](https://gitlab.com/gitlab-org/gitlab/-/blob/master/lib/gitlab/ci/templates/Verify/Accessibility.gitlab-ci.yml).   
As of GitLab 14.5, Pa11y uses WCAG 2.1 rules

[Web Accessibility Pipeline \- accessiBe](https://accessibe.com/accessflow/integrate)  
WCAG, ADA

[Developer Tools for Accessibility | Level Access](https://www.levelaccess.com/developer-tools/)  
with [Mocha \- the fun, simple, flexible JavaScript test framework (mochajs.org)](https://mochajs.org/), [BDD Testing & Collaboration Tools for Teams | Cucumber](https://cucumber.io/)

[HTML\_CodeSniffer (squizlabs.github.io)](https://squizlabs.github.io/HTML\_CodeSniffer/)  
List Principle, SC, & Technique  
WCAG 2.1, Section 508

[@axe-core/reporter-earl \- npm (npmjs.com)](https://www.npmjs.com/package/@axe-core/reporter-earl)  
A reporter for axe-core it will produce results using the Evaluation And Reporting Language (EARL) 1.0.

[https://www.ibm.com/able/toolkit/tools](https://www.ibm.com/able/toolkit/tools)

### 設計稿工具  
[Stark: The suite of integrated accessibility tools (getstark.co)](https://www.getstark.co/figma/)  
plugin 綜合性無障礙自動檢測。

[axe for Designers: A Free Accessibility Plugin – Figma](https://www.figma.com/community/plugin/1085612091163821851/axe-for-designers-a-free-accessibility-plugin)  
plugin 綜合性無障礙自動檢測。

[Contrast | Figma](https://www.figma.com/community/plugin/748533339900865323/contrast)  
plugin 輔助設計成品色彩組合有足夠對比度，功能是檢測 WCAG 規範 AA、AAA 等級的對比度符合度。

[A11y \- Focus Order – Figma](https://www.figma.com/community/plugin/731310036968334777/a11y-focus-order)  
plugin 輔助設計鍵盤導覽順序，功能是在設計元素/元件標示焦點以及焦點順序。

[Text Resizer \- Accessibility Checker | Figma](https://www.figma.com/community/plugin/892114953056389734/text-resizer-accessibility-checker)  
plugin 輔助設計成品在字級調整時有足夠調適性，功能是快速批次調整字級大小。

[Low Vision – Figma](https://www.figma.com/community/plugin/940423402083252469/low-vision)  
plugin 輔助避免低視能相關設計風險，功能是模擬低視能者所看到的景象。

[Color Blind – Figma](https://www.figma.com/community/plugin/733343906244951586/color-blind)  
plugin 輔助避免色覺辨識障礙相關設計風險，功能是模擬不同樣態的色覺功能所看到的景象。

[A11y Annotation Kit | Figma](https://www.figma.com/community/file/953682768192596304/a11y-annotation-kit)  
tool kit 輔助對設計稿進行無障礙標示，例如閱讀順序、焦點及焦點順序等。

[Inclusive Design illustrations | Figma](https://www.figma.com/community/file/946569165254852480/inclusive-design-illustrations)  
學習素材

[Accessible design toolkit | Figma](https://www.figma.com/community/file/1327037919540849715/accessible-design-toolkit)  
學習素材

### CI/CD工具

---

## Continuous Design

- [figma-plugin-continuous-design/README.md at main · mikaelvesavuori/figma-plugin-continuous-design · GitHub](https://github.com/mikaelvesavuori/figma-plugin-continuous-design/blob/main/README.md)  
  搭配服用：  
- [GitHub \- mikaelvesavuori/github-ci-demo: This is a basic demonstration of what is needed to run a GitHub Actions CI build by calling their REST API.](https://github.com/mikaelvesavuori/github-ci-demo)  
- [Mikael Vesavuori / gitlab-ci-demo · GitLab](https://gitlab.com/mikaelvesavuori/gitlab-ci-demo)  
- [GitHub \- mikaelvesavuori/azure-devops-ci-demo: This is a basic demonstration of what is needed to run a Azure DevOps CI build by calling their REST API. We are using Figmagic for this demo, to demonstrate running it in CI.](https://github.com/mikaelvesavuori/azure-devops-ci-demo)  
- [Level Access Figma plugin | Figma](https://www.figma.com/community/plugin/1268557036921715308/level-access-figma-plugin)  
  plugin works by helping you check for common accessibility issues in the core building blocks of your design—things like buttons, links, text input fields, and checkboxes. Once you select an element you’d like to check, identify the element within the plugin, and review your results instantly.   
- [Tokens Studio for Figma (Figma Tokens) | Figma](https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma-figma-tokens)  
  can store your design tokens in JSON, sync them with a sync provider such as GitHub and define tokens  
- [Token Export | Figma](https://www.figma.com/community/plugin/1318612019979212772/token-export)  
  allows you to selectively export variable collections and modes. 搭配服用：[Design Tokens Format Module](https://tr.designtokens.org/format/)


## \#\# git hook

- [Using a Git Pre-Commit Hook with axe DevTools Linter | Deque Docs](https://docs.deque.com/linter/4.0.0/en/axe-linter-git-pre-commit-hook)  
  To use the pre-commit hook to block GitHub commits which contain accessibility errors.

## \#\# Secrets Management

## \#\# Linter

- [axe Accessibility Linter \- Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=deque-systems.vscode-axe-linter)  
  Check code files for common accessibility defects. Checks React (JSX), React Native, Angular, Vue, HTML, and Markdown.  
- [axe Linter · GitHub Marketplace · GitHub](https://github.com/marketplace/axe-linter)  
  Automatically find and fix accessibility issues with axe Linter. Axe Linter analyzes the changed or added code of your GitHub pull requests, reports issues and intelligently requests changes for common issues- all before your pull request gets reviewed and the code gets merged. 搭配服用：[Using the axe DevTools Linter GitHub Action | Deque Docs](https://docs.deque.com/linter/4.0.0/en/axe-linter-github-action)  
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
  搭配服用：[Angular ESLint Rules for Accessible HTML Content \- DEV Community](https://dev.to/angular/angular-eslint-rules-for-accessible-html-content-kf5)

## \#\# Unit test

- [GitHub \- dequelabs/agnostic-axe: Framework agnostic accessibility reporter, powered by axe-core](https://github.com/dequelabs/agnostic-axe)  
  which detect UI changes and re-run a11y checks on the new state of the UI.  
- [@axe-core/react \- npm (npmjs.com)](https://www.npmjs.com/package/@axe-core/react)  
  which detect UI changes and re-run a11y checks on the new state of the UI.

## \#\# Integration test

## \#\# Acceptance test

[cypress-axe \- npm (npmjs.com)](https://www.npmjs.com/package/cypress-axe)  
Test accessibility with axe-core in Cypress.  
搭配服用：[🚅 Building a Cypress Accessibility Pipeline with Next.js and Axe \- DEV Community](https://dev.to/lundjrl/building-a-cypress-accessibility-pipeline-with-nextjs-and-axe-5146)

## \#\# Synthetic test

## \#\# Performance test

- [GitHub \- GoogleChrome/lighthouse-ci: Automate running Lighthouse for every commit, viewing the changes, and preventing regressions](https://github.com/GoogleChrome/lighthouse-ci)  
  Lighthouse CI is a suite of tools that make continuously running, saving, retrieving, and asserting against Lighthouse results as easy as possible.

## \#\# Resilience test/chaos testing

## \#\# Static application security test (SAST)

## \#\# Dynamic application security test (DAST)/Penetration Testing

## \#\# Reference

### 一般性介紹、說明

- [Free Accessibility Linters to Automate Accessibility Workflow • DigitalA11Y](https://www.digitala11y.com/free-accessibility-linters-to-automate-accessibility-workflow/)  
- [How I do automated accessibility testing for my website | Opensource.com](https://opensource.com/article/23/2/automated-accessibility-testing)  
- [Accessibility testing | GitLab](https://docs.gitlab.com/ee/ci/testing/accessibility\_testing.html)  
- [Level Access | The Future of Digital Accessibility Starts Here](https://www.levelaccess.com/)  
- [GitHub \- Section508Coordinators/Dev-Auto-Pipeline-Ex: This repository contains test automation scripts and related code arranged in examples to aid in the integration of Section 508/accessibility into test automation activities within the Software Engineering Life Cycle. Examples represent the higher end of test automation, to include CI/CD pipeline and cloud provider implementations.](https://github.com/Section508Coordinators/Dev-Auto-Pipeline-Ex)  
- [Automating the accessibility tests of your source code with GitHub Actions | Adrián Bolonio \- Accessibility Software Engineering (adrianbolonio.com)](https://www.adrianbolonio.com/blog/accessibility-github-actions)  
  **GitHub Action** if you use jest, you can create your own accessibility unit tests with jest-axe, a tool from the axe family of tools.  
- [Figma Plugins that aid Accessibility | by Rhoda Michael | Bootcamp (uxdesign.cc)](https://bootcamp.uxdesign.cc/figma-plugins-that-aid-accessibility-57882ea14555)  
- [How to Design for Accessibility & Inclusion | Figma](https://www.figma.com/resource-library/creating-accessible-and-inclusive-design/)

### 鄉野中的實作專案（尚未驗證）

- [Linting Web Accessibility issues in your HTML using just CSS\! | Wilson Mendes (willmendesneto.com)](https://willmendesneto.com/posts/linting-web-accessibility-issues-in-your-html-using-just-css/)  
  useful Gist that called a11y-dev-mode.css\! It has some CSS rules that applies some changes on elements without correct information such as missing attributes, having elements with empty content and assuming wrong Accessible Rich Internet Applications Suite — WAI-ARIA roles.  
  HTML tag \<html\>without \[lang\]definition; Ordered/Unordered (\<ol\>and \<ul\>, respectively) HTML lists without a list inside (\<li\>) of them; Images (\<img\>) without \[alt\]attribute; Anchor tags (\<a\>) without correct \[href\]or even empty; Label tags without \[for\]attribute; Empty \<button\>tags; Div tags using \[role="button"\]. It affects some screen readers and browsers, changing the default behaviour of div for people with disabilities;  
- [GitHub \- fpapado/accessible-pipeline: Accessibility monitoring, made easy](https://github.com/fpapado/accessible-pipeline)  
- [GitHub \- jvanbruegge/A11Y-CI: CI tool for your automated testing pipelines](https://github.com/jvanbruegge/A11Y-CI)  
- [GitHub \- treosh/lighthouse-ci-action: Audit URLs using Lighthouse and test performance with Lighthouse CI.](https://github.com/treosh/lighthouse-ci-action)  
- [GitHub \- nfreear/accessibility-ci-demo: Demonstration of integrating automated accessibility testing tools into a continuous integration/deployment (CI/CD) workflow.](https://github.com/nfreear/accessibility-ci-demo)  
- [GitHub \- jordnkr/CypressAccessibilityPipeline: A demo CI/CD pipeline using GitHub actions/status checks, which run Cypress accessibility tests on check-in.](https://github.com/jordnkr/CypressAccessibilityPipeline)  
- [GitHub \- bolonio/a11y-github-actions: This is a demo repository to illustrate how to test web accessibility using Github Actions.](https://github.com/bolonio/a11y-github-actions)  
- [How I do automated accessibility testing for my website | Opensource.com](https://opensource.com/article/23/2/automated-accessibility-testing)  
- [Automated accessibility testing: Leveraging GitHub Actions and pa11y-ci with axe | CivicActions Accessibility](https://accessibility.civicactions.com/posts/automated-accessibility-testing-leveraging-github-actions-and-pa11y-ci-with-axe)  
- [Archived Post: How I Added a pa11y-ci GitHub Action to My Next.js Site | Ashlee M Boyer](https://ashleemboyer.com/blog/archive/how-i-added-a-pa11y-ci-github-action-to-my-next-js-site--archived)

### 列出已知的無障礙檢測工具清單
[Web Accessibility Evaluation Tools List](https://www.w3.org/WAI/test-evaluate/tools/list/)