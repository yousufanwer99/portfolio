console.log('scripts working...')
document.getElementById('year').textContent = new Date().getFullYear();

var toggle = document.getElementById('theme-toggle');
var root = document.documentElement;
var saved = null;
try { saved = localStorage.getItem('pf-theme'); } catch (e) { }
if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.setAttribute('data-theme', 'dark');
}
toggle.addEventListener('click', function () {
    var isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
        root.removeAttribute('data-theme');
        try { localStorage.setItem('pf-theme', 'light'); } catch (e) { }
    } else {
        root.setAttribute('data-theme', 'dark');
        try { localStorage.setItem('pf-theme', 'dark'); } catch (e) { }
    }
});

var trigger = document.getElementById('proj-trigger');
var body = document.getElementById('proj-body');
var chev = document.getElementById('proj-chev');
trigger.addEventListener('click', function () {
    var open = body.style.maxHeight && body.style.maxHeight !== '0px';
    if (open) {
        body.style.maxHeight = '0px';
        chev.style.transform = 'rotate(0deg)';
    } else {
        body.style.maxHeight = body.scrollHeight + 'px';
        chev.style.transform = 'rotate(180deg)';
    }
});