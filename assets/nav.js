// Shared sidebar navigation, mobile drawer, and footer, injected so every page stays in sync.
(function(){
  var PAGES = [
    { href: "index.html",          label: "Home" },
    { href: "project.html",        label: "The Project" },
    { href: "evidence.html",       label: "Evidence" },
    { href: "findings.html",       label: "Findings" },
    { href: "framework.html",      label: "Framework" },
    { href: "action.html",         label: "Recommendations" },
    { href: "journey.html",        label: "The Journey" },
    { href: "learning-plan.html",  label: "Learning Plan" },
    { href: "competencies.html",   label: "Competencies" },
    { href: "reflection.html",     label: "Final Reflection" },
    { href: "artifacts.html",      label: "Artifacts" },
    { href: "closing.html",        label: "Acknowledgements" }
  ];

  function currentFile(){
    var path = window.location.pathname.split("/").pop();
    return path === "" ? "index.html" : path;
  }

  function renderSidebarPrimary(){
    var here = currentFile();
    var items = PAGES.map(function(p, i){
      var current = (p.href === here) ? ' aria-current="page"' : '';
      var num = String(i + 1).padStart(2, "0");
      return '<li><a href="'+p.href+'"'+current+'><span class="num">'+num+'</span>'+p.label+'</a></li>';
    }).join("");

    return (
      '<a class="brand" href="index.html">' +
        '<span class="brand-text">' +
          '<strong>Prepared for Black Students</strong>' +
          '<span>APPLHSCI 9099 &middot; Learning Portfolio</span>' +
        '</span>' +
      '</a>' +
      '<nav class="primary" aria-label="Portfolio sections"><ul>'+items+'</ul></nav>'
    );
  }

  function renderMobileBar(){
    return (
      '<a class="brand" href="index.html">Prepared for Black Students</a>' +
      '<button class="sidebar-toggle" aria-expanded="false" aria-controls="sidebar">' +
        '<span class="bars"><span></span><span></span><span></span></span> Menu' +
      '</button>'
    );
  }

  function renderFooter(){
    return (
      '<div class="shell">' +
        '<p>This portfolio is an applied evidence synthesis and implementation-design capstone submitted for academic assessment in APPLHSCI 9099, Western University. It is not an official Thames Valley District School Board framework, policy, evaluation, or approved implementation resource, and contains no identifiable student information or confidential TVDSB records.</p>' +
        '<div class="foot-links">' +
          '<a href="closing.html">Acknowledgements &amp; references</a>' +
          '<a href="artifacts.html">Project artifacts</a>' +
          '<span class="small">Malvin L. Wright &middot; July 31, 2026</span>' +
        '</div>' +
      '</div>'
    );
  }

  document.addEventListener("DOMContentLoaded", function(){
    var sidebar = document.getElementById("sidebar");
    var primaryMount = document.getElementById("sidebar-primary");
    var mobileBarMount = document.getElementById("mobile-bar");
    var footerMount = document.getElementById("site-footer");
    var backdrop = document.getElementById("sidebar-backdrop");

    if (primaryMount){ primaryMount.insertAdjacentHTML("afterbegin", renderSidebarPrimary()); }
    if (mobileBarMount){ mobileBarMount.innerHTML = renderMobileBar(); }
    if (footerMount){ footerMount.innerHTML = renderFooter(); }

    // Mobile off-canvas sidebar toggle.
    var toggle = document.querySelector(".sidebar-toggle");
    var closeSidebar = function(){
      if (!sidebar) return;
      sidebar.classList.remove("open");
      if (backdrop) backdrop.classList.remove("open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    };
    if (toggle && sidebar){
      toggle.addEventListener("click", function(){
        var open = sidebar.classList.toggle("open");
        if (backdrop) backdrop.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
    if (backdrop){ backdrop.addEventListener("click", closeSidebar); }
    // Closing the drawer after following a link keeps mobile navigation tidy.
    if (sidebar){
      sidebar.querySelectorAll("a").forEach(function(a){
        a.addEventListener("click", function(){
          if (window.matchMedia("(max-width: 980px)").matches){ closeSidebar(); }
        });
      });
    }
    window.addEventListener("keydown", function(e){
      if (e.key === "Escape"){ closeSidebar(); }
    });

    // Stagger the section rise-in slightly so sections don't all pop at once.
    document.querySelectorAll("section.block").forEach(function(el, i){
      el.style.animationDelay = (Math.min(i, 4) * 0.06) + "s";
    });

    // Five-domain accordion: one panel open at a time, first one open by default.
    document.querySelectorAll(".domains").forEach(function(group){
      var domains = group.querySelectorAll(".domain");
      var setHeight = function(domain, open){
        var btn = domain.querySelector(".domain-toggle");
        var body = domain.querySelector(".domain-body");
        domain.setAttribute("data-open", open ? "true" : "false");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        body.style.maxHeight = open ? body.scrollHeight + "px" : "0px";
      };
      domains.forEach(function(domain){
        var open = domain.getAttribute("data-open") === "true";
        setHeight(domain, open);
        domain.querySelector(".domain-toggle").addEventListener("click", function(){
          var isOpen = domain.getAttribute("data-open") === "true";
          domains.forEach(function(other){ setHeight(other, false); });
          if (!isOpen){ setHeight(domain, true); }
        });
      });
      window.addEventListener("resize", function(){
        domains.forEach(function(domain){
          if (domain.getAttribute("data-open") === "true"){ setHeight(domain, true); }
        });
      });
    });

    // Highlight current stop in the in-page thread list, if present.
    var threadLinks = document.querySelectorAll(".thread a");
    if (threadLinks.length){
      var setCurrent = function(id){
        threadLinks.forEach(function(a){
          var li = a.parentElement;
          li.classList.toggle("current", a.getAttribute("href") === "#"+id);
        });
      };
      var sections = Array.prototype.map.call(threadLinks, function(a){
        return document.getElementById(a.getAttribute("href").slice(1));
      }).filter(Boolean);

      if (sections.length){
        setCurrent(sections[0].id);
        var observer = new IntersectionObserver(function(entries){
          entries.forEach(function(entry){
            if (entry.isIntersecting){ setCurrent(entry.target.id); }
          });
        }, { rootMargin: "-15% 0px -70% 0px" });
        sections.forEach(function(s){ observer.observe(s); });
      }
    }
  });
})();
