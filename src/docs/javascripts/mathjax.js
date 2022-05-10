window.MathJax = {
    tex: {
        inlineMath: [["\\(", "\\)"]],
        displayMath: [["\\[", "\\]"]],
        processEscapes: true,
        processEnvironments: true
    },
    options: {
        ignoreHtmlClass: ".*|",
        processHtmlClass: "arithmatex"
    }
};
document$.subscribe(() => { 
    MathJax.typesetPromise()
    
    // mathjax scrollbar patch
    for (const elem of document.getElementsByTagName("mjx-container")) {
        elem.style.position = ""
    }
});
  