/* === utilidades pequeñas ================================= */
const € = sel => document.querySelector(sel);
const li = txt => {
  const el = document.createElement('li');
  el.textContent = txt;
  return el;
};

/* === 1. GASTOS PERSONALES ================================ */
const personal = {
  list: [],
  add(name, amount) {
    this.list.push(+amount);
    $('#personal-list').append(li(`${name}: ${(+amount).toFixed(2)} €`));
    const total = this.list.reduce((s, v) => s + v, 0);
    $('#personal-total').textContent = `Total: ${total.toFixed(2)} €`;
  }
};

$('#personal-form').addEventListener('submit', e => {
  e.preventDefault();
  personal.add($('#p-name').value, $('#p-amount').value);
  e.target.reset();
});

/* === 2. GASTOS GRUPALES ================================= */
let currentGroup = null;   // {name, members:[], expenses:[]}

$('#group-create').addEventListener('submit', e => {
  e.preventDefault();
  const name    = $('#g-name').value.trim() || 'Sin nombre';
  const members = $('#g-members').value.split(',').map(m=>m.trim()).filter(Boolean);
  if (!members.length) { alert('Añade al menos un miembro'); return; }

  currentGroup = { name, members, expenses: [] };
  initGroupPanel();
  e.target.reset();
});

function initGroupPanel() {
  $('#group-title').textContent = currentGroup.name;
  $('#group-list').innerHTML = '';
  $('#group-balances').innerHTML = '';
  $('#group-panel').style.display = 'block';

  // rellenar selector "quién pagó"
  const sel = $('#ge-paidBy');
  sel.innerHTML = '<option value="">¿Quién pagó?</option>';
  currentGroup.members.forEach(m=>{
    const o=document.createElement('option'); o.value=o.textContent=m; sel.append(o);
  });
}

$('#group-expense').addEventListener('submit', e=>{
  e.preventDefault();
  const concept = $('#ge-name').value.trim();
  const amt     = +$('#ge-amount').value;
  const payer   = $('#ge-paidBy').value;
  if (!concept || !amt || !payer) { alert('Completa todos los campos'); return; }

  currentGroup.expenses.push({ concept, amt, payer });
  $('#group-list').append(li(`${concept}: ${amt.toFixed(2)} € — pagó ${payer}`));
  showBalances();
  e.target.reset();
});

function showBalances() {
  const balances = {};            // miembro => saldo (+ cobra / - debe)
  currentGroup.members.forEach(m=>balances[m]=0);

  currentGroup.expenses.forEach(exp=>{
    const share = exp.amt / currentGroup.members.length;
    currentGroup.members.forEach(m=>{
      balances[m] -= share;
    });
    balances[exp.payer] += exp.amt;  // el que pagó recupera el total pagado
  });

  $('#group-balances').innerHTML = '';
  for (const [m, bal] of Object.entries(balances)) {
    const txt = bal>0.01 ? `${m} debe recibir ${bal.toFixed(2)} €`
           : bal<-0.01 ? `${m} debe pagar ${(-bal).toFixed(2)} €`
           : `${m} está saldado.`;
    $('#group-balances').append(li(txt));
  }
}

/* === helpers DOM ========================================= */
function $(sel){return document.querySelector(sel);}
