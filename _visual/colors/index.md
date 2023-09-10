---
title: 色彩
layout: main
---

{% capture demo %}
<div class="f3">台灣 Taiwan</div>
<div>台灣 Taiwan</div>
{% endcapture %}

<div class="flex flex-wrap gap4 justify-start">
  <div class="pa4 ba plain">
    {{ demo }}
  </div>

  <div class="pa4 ba fg-subtle">
    {{ demo }}
  </div>

  <div class="pa4 overflow-hidden bg-layer1 plain">
    {{ demo }}
  </div>

  <div class="pa4 overflow-hidden bg-layer2 plain">
    {{ demo }}
  </div>
  
</div>