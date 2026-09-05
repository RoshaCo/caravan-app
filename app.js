
const VIP_CODE = "1234";

function checkVip() {
  const enteredCode = document.getElementById('vipCode').value;
  if (enteredCode === VIP_CODE) {
    localStorage.setItem('vipUnlocked', 'true');
    showPage('homePage');
  } else {
    document.getElementById('lockError').innerText = '❌ کد اشتباه است';
  }
}

function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

function loadOnlineContent(type) {
  if (!navigator.onLine) {
    alert('شما آفلاین هستید. لطفاً اینترنت را وصل کنید.');
    return;
  }

  const url = type === 'profile'
    ? 'https://jsonplaceholder.typicode.com/users/1'
    : 'https://jsonplaceholder.typicode.com/todos/1';

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const contentDiv = document.getElementById(type + 'Content');
      if (type === 'profile') {
        contentDiv.innerHTML = `<p>👤 نام: ${data.name}</p><p>📧 ایمیل: ${data.email}</p>`;
      } else {
        contentDiv.innerHTML = `<p>📞 اطلاعات تماس: ${data.title}</p>`;
      }
    })
    .catch(() => {
      alert('خطا در دریافت اطلاعات آنلاین');
    });
}

window.onload = function() {
  if (localStorage.getItem('vipUnlocked') === 'true') {
    showPage('homePage');
  } else {
    showPage('lockPage');
  }
};
