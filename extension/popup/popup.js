document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('nav ul li');
  const tabContent = document.getElementById('tab-content');

  function loadTab(tabName) {
    fetch(`tabs/${tabName}/${tabName}.html`)
      .then(response => response.text())
      .then(html => {
        tabContent.innerHTML = html;
        let cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = `tabs/${tabName}/${tabName}.css`;
        cssLink.setAttribute('data-dynamic', 'true');
        document.head.appendChild(cssLink);
        
        let scriptTag = document.createElement('script');
        scriptTag.src = `tabs/${tabName}/${tabName}.js`;
        scriptTag.setAttribute('data-dynamic', 'true');
        document.body.appendChild(scriptTag);
      })
      .catch(err => {
        tabContent.innerHTML = `<p>Error loading ${tabName} content.</p>`;
      });
  }
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      document.querySelectorAll('link[data-dynamic]').forEach(el => el.remove());
      document.querySelectorAll('script[data-dynamic]').forEach(el => el.remove());
      
      const tabName = tab.getAttribute('data-tab');
      loadTab(tabName);
    });
  });
  
  loadTab('home');
});
