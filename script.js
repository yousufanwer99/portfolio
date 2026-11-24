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

var resumeBtn = document.getElementById('resume-btn');
function resumeToast(icon, title) {
    if (!window.Swal) return;
    var cs = getComputedStyle(document.documentElement);
    Swal.fire({
        toast: true, position: 'top-end', icon: icon, title: title,
        showConfirmButton: false, timer: 3000, timerProgressBar: true,
        background: cs.getPropertyValue('--surface').trim() || '#fff',
        color: cs.getPropertyValue('--text').trim() || '#171412'
    });
}
resumeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (resumeBtn.classList.contains('is-loading')) return;
    var icon = resumeBtn.querySelector('i');
    var label = resumeBtn.querySelector('span');
    var url = resumeBtn.getAttribute('href');
    var fileName = url.split('/').pop();
    var iconClass = icon.className;
    resumeBtn.classList.add('is-loading');
    icon.className = 'spinner';
    label.textContent = 'Downloading...';
    fetch(url, { cache: 'no-cache' })
        .then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.blob();
        })
        .then(function (blob) {
            var a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
            resumeToast('success', 'Resume downloaded successfully');
        })
        .catch(function () {
            resumeToast('error', 'Download failed. Please try again.');
        })
        .finally(function () {
            resumeBtn.classList.remove('is-loading');
            icon.className = iconClass;
            label.textContent = 'Download resume';
        });
});
