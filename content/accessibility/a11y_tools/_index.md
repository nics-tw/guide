---
title: 檢測工具導入文件
text_only: 1
---

自動化檢測工具功能為輔助進行無障礙規範符合度檢測，但無法取代手動檢測。可以被自動化檢測的規則，僅能檢測出 3-4 成已知的使用障礙，多數使用障礙仍需要透過手動檢測或使用者體驗才能夠發覺。在開發生命週期中，建議及早發現使用障礙並將其視為風險持續控管。不定期完成最小程度檢測，請參考 [WAI Easy Checks](https://www.w3.org/WAI/test-evaluate/preliminary/) 或 [GOV.UK 基礎檢查](https://www.gov.uk/government/publications/doing-a-basic-accessibility-check-if-you-cant-do-a-detailed-one)，如檢測中發現任何未符合之情況，均以問題追蹤系統（issue tracker）納管修正。嚴謹的 WCAG 無障礙規範符合度稽核，建議遵循 [Website Accessibility Conformance Evaluation Methodology, WCAG-EM](https://www.w3.org/TR/WCAG-EM/) 並可以搭配 [WCAG-EM Report Tool](https://www.w3.org/WAI/eval/report-tool/) 產出無障礙規範符合度報告。

### WAI 無障礙檢測工具清單
---
[Web Accessibility Initiative, WAI](https://www.w3.org/WAI/) 透過工具發布者自行提報方式，蒐整了一份[檢測工具清單](https://www.w3.org/WAI/test-evaluate/tools/list/)。清單以網頁形式呈現並提供搜尋功能，根據檢測的目的（手動測試、自動測試、模擬使用者體驗）、標的（網站、行動 APP、文件、原始碼等），以及工具支援的標準（WCAG版本及等級、EPUB版本）、是否收費、工具類型（瀏覽器擴充元件、書籤、應用程式、線上工具等）等條件，篩選出最符合需求的工具來協助無障礙符合度檢測。也由於清單是由工具發布者自行提報，工具對於檢測規則的實作，是否能正確檢驗規格上宣稱的規範版本仍應加以驗證。值得注意的是部分工具有提供[親和力宣告](https://www.w3.org/WAI/planning/statements/)、以及是否[實作 Accessibility Conformance Testing, ACT Rules](https://www.w3.org/WAI/standards-guidelines/act/implementations/)，有助於了解工具的優勢與限制。

- [Web Accessibility Evaluation Tools List](https://www.w3.org/WAI/test-evaluate/tools/list/)

### 候選工具
---

- [GitHub \- dequelabs/axe-core: Accessibility engine for automated Web UI testing](https://github.com/dequelabs/axe-core)  
- [GitHub \- pa11y/pa11y-ci: Pa11y CI is a CI-centric accessibility test runner, built using Pa11y](https://github.com/pa11y/pa11y-ci)  
- [Purple A11y \- Automating Testing to Improve Web Accessibility for Apps and Websites - Singapore Government Developer Portal](https://www.developer.tech.gov.sg/products/categories/design/purple-a11y/overview.html)  
- [Accessibility testing - GitLab](https://docs.gitlab.com/ee/ci/testing/accessibility\_testing.html)  
  搭配閱讀： [CI/CD job template](https://gitlab.com/gitlab-org/gitlab/-/blob/master/lib/gitlab/ci/templates/Verify/Accessibility.gitlab-ci.yml)。   
- [Web Accessibility Pipeline - accessiBe](https://accessibe.com/accessflow/integrate)  
- [Developer Tools for Accessibility Level Access](https://www.levelaccess.com/developer-tools/)  
  搭配閱讀： [Mocha - the fun, simple, flexible JavaScript test framework (mochajs.org)](https://mochajs.org/), [BDD Testing & Collaboration Tools for Teams - Cucumber](https://cucumber.io/)
- [HTML_CodeSniffer (squizlabs.github.io)](https://squizlabs.github.io/HTML\_CodeSniffer/)  
- [@axe-core/reporter-earl - npm (npmjs.com)](https://www.npmjs.com/package/@axe-core/reporter-earl)  
- [https://www.ibm.com/able/toolkit/tools](https://www.ibm.com/able/toolkit/tools)

### 設計稿工具  
---
這類型的工具可以針對設計稿，進行綜合性無障礙自動檢測、確保色彩組合有足夠對比度、在設計元素/元件標示焦點以及焦點順序、快速批次調整字級大小、模擬低視能者或不同樣態的色覺功能所看到的景象。

- [Stark: The suite of integrated accessibility tools (getstark.co)](https://www.getstark.co/figma/)  
- [axe for Designers: A Free Accessibility Plugin - Figma](https://www.figma.com/community/plugin/1085612091163821851/axe-for-designers-a-free-accessibility-plugin)  
- [Contrast - Figma](https://www.figma.com/community/plugin/748533339900865323/contrast)  
- [A11y - Focus Order - Figma](https://www.figma.com/community/plugin/731310036968334777/a11y-focus-order)  
- [Text Resizer - Accessibility Checker - Figma](https://www.figma.com/community/plugin/892114953056389734/text-resizer-accessibility-checker)  
- [Low Vision - Figma](https://www.figma.com/community/plugin/940423402083252469/low-vision)  
- [Color Blind - Figma](https://www.figma.com/community/plugin/733343906244951586/color-blind)  
- [A11y Annotation Kit - Figma](https://www.figma.com/community/file/953682768192596304/a11y-annotation-kit)  
- [Inclusive Design illustrations - Figma](https://www.figma.com/community/file/946569165254852480/inclusive-design-illustrations)  
- [Accessible design toolkit - Figma](https://www.figma.com/community/file/1327037919540849715/accessible-design-toolkit)  

### 持續設計（Continuous Design）
---
涉及到設計稿的版本控制與合併，透過這類工具可以確保設計階段不會重覆引入已知的使用障礙。

- [figma-plugin-continuous-design/README.md at main · mikaelvesavuori/figma-plugin-continuous-design · GitHub](https://github.com/mikaelvesavuori/figma-plugin-continuous-design/blob/main/README.md)  
  搭配閱讀：  
  - [GitHub \- mikaelvesavuori/github-ci-demo: This is a basic demonstration of what is needed to run a GitHub Actions CI build by calling their REST API.](https://github.com/mikaelvesavuori/github-ci-demo)  
  - [Mikael Vesavuori / gitlab-ci-demo · GitLab](https://gitlab.com/mikaelvesavuori/gitlab-ci-demo)  
  - [GitHub \- mikaelvesavuori/azure-devops-ci-demo: This is a basic demonstration of what is needed to run a Azure DevOps CI build by calling their REST API. We are using Figmagic for this demo, to demonstrate running it in CI.](https://github.com/mikaelvesavuori/azure-devops-ci-demo)  
- [Level Access Figma plugin - Figma](https://www.figma.com/community/plugin/1268557036921715308/level-access-figma-plugin)       
- [Tokens Studio for Figma (Figma Tokens) - Figma](https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma-figma-tokens)  
- [Token Export - Figma](https://www.figma.com/community/plugin/1318612019979212772/token-export)  
  搭配閱讀：[Design Tokens Format Module](https://tr.designtokens.org/format/)

### Git 提交檢查（Git Hooks）
---
Git Hooks 類型工具透過 Git 版本控制系統中的提交事件觸發自動檢測。

- [Using a Git Pre-Commit Hook with axe DevTools Linter - Deque Docs](https://docs.deque.com/linter/4.0.0/en/axe-linter-git-pre-commit-hook)  

### 程式風格檢查（Linter）
---
Linter 類型工具可以檢測 React (JSX), React Native, Angular, Vue, HTML, Markdown 等靜態檔案內呈現出的使用障礙，在開發階段就可以發現問題。在 pull request 被審核或程式版本合併前，自動進行檢測並產出報告。

- [axe Accessibility Linter \- Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=deque-systems.vscode-axe-linter)  
- [axe Linter · GitHub Marketplace · GitHub](https://github.com/marketplace/axe-linter)  
  搭配閱讀：[Using the axe DevTools Linter GitHub Action - Deque Docs](https://docs.deque.com/linter/4.0.0/en/axe-linter-github-action)  
- [AccessLint \- Automated and continuous web accessibility testing](https://accesslint.com/)  
- [ASLint - Accessibility testing tool](https://aslint.org/)  
- [GitHub \- AccessLint/accesslint.js: Keep accessibility errors in check.](https://github.com/AccessLint/accesslint.js)  
- [GitHub \- jsx-eslint/eslint-plugin-jsx-a11y: Static AST checker for a11y rules on JSX elements.](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y\#supported-rules)  
- [GitHub \- FormidableLabs/eslint-plugin-react-native-a11y: React Native specific accessibility linting rules.](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y)  
- [React's Accessibility Code Linter \- 24 Accessibility (24a11y.com)](https://www.24a11y.com/2017/reacts-accessibility-code-linter/)  
- [GitHub \- maranran/eslint-plugin-vue-a11y: Static AST checker for accessibility rules on elements in .vue](https://github.com/maranran/eslint-plugin-vue-a11y)     
- [GitHub \- vue-a11y/eslint-plugin-vuejs-accessibility: An eslint plugin for checking Vue.js files for accessibility](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility)  
- [@angular-eslint/eslint-plugin-template \- npm (npmjs.com)](https://www.npmjs.com/package/@angular-eslint/eslint-plugin-template)   
  搭配閱讀：[Angular ESLint Rules for Accessible HTML Content \- DEV Community](https://dev.to/angular/angular-eslint-rules-for-accessible-html-content-kf5)

### 單元測試（Unit Test）
---
單元測試工具可以將使用障礙測試案例整合到單元測試流程中，針對元件層級進行測試。

- [GitHub \- dequelabs/agnostic-axe: Framework agnostic accessibility reporter, powered by axe-core](https://github.com/dequelabs/agnostic-axe)  
- [@axe-core/react \- npm (npmjs.com)](https://www.npmjs.com/package/@axe-core/react)  
  

### 驗收測試（Acceptance Test）
---
驗收測試可以將使用障礙測試案例整合到端到端（End-to-end, E2E）測試流程中，對多個元件進行整合性測試。

- [cypress-axe \- npm (npmjs.com)](https://www.npmjs.com/package/cypress-axe)  
  搭配閱讀：[🚅 Building a Cypress Accessibility Pipeline with Next.js and Axe \- DEV Community](https://dev.to/lundjrl/building-a-cypress-accessibility-pipeline-with-nextjs-and-axe-5146)

### 效能測試（Performance Test）
---
效能測試可以針對網頁應用程式進行即時的頁面層級測試，自動化檢測規則涵蓋效能、無障礙、最佳實作、最佳搜尋（SEO）、漸進式增強應用程式等面向。  

- [GitHub \- GoogleChrome/lighthouse-ci: Automate running Lighthouse for every commit, viewing the changes, and preventing regressions](https://github.com/GoogleChrome/lighthouse-ci)  
