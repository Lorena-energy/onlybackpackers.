/* helpers cortos */
const $  = s => document.querySelector(s);
const li = t => {const e=document.createElement('li');e.textContent=t;return e;};

/* ============ 1. GASTOS PERSONALES ============ */
let pSum = 0;
$('#personal-form').addEventListener('submit', e=>{
  e.preventDefault();
  const name = $('#p-name').value.trim();
  const amt  = +$('#p-amount').value;
  if (!name || !amt) return;
  $('#personal-list').append(li(`${name}: ${amt.toFixed(2)} €`));
  pSum += amt;
  $('#personal-total').textContent = `Total: ${pSum.toFixed(2)} €`;
  e.target.reset();
});

/* ============ 2. GASTOS GRUPALES ============== */
const gContainer = $('#groups-container');
const groups     = [];  //  [{name,members:[…],expenses:[…],balances:{m:saldo}}]

$('#g-create').addEventListener('submit', e=>{
  e.preventDefault();
  const name    = $('#g-name').value.trim() || 'Grupo';
  const members = $('#g-members').value.split(',').map(m=>m.trim()).filter(Boolean);
  if (!members.length){alert('Añade miembros');return;}

  groups.push({name, members, expenses:[]});
  renderGroups();
  e.target.reset();
  updateTotalGroups();
});

/* ---- renderizar todos los grupos ---- */
function renderGroups(){
  gContainer.innerHTML = '';
  groups.forEach((g,idx)=>{
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${g.name}</h3>
      <p><strong>Miembros:</strong> ${g.members.join(', ')}</p>

      <form class="gx-form" data-idx="${idx}">
        <input  placeholder="Concepto" required>
        <input  type="number" step="0.01" placeholder="Importe (€)" required>
        <select required>
          <option value="">¿Quién pagó?</option>
          ${g.members.map(m=>`<option value="${m}">${m}</option>`).join('')}
        </select>
        <button>Añadir gasto</button>
      </form>

      <ul class="gx-list">
        ${g.expenses.map(e=>`<li>${e.concept}: ${e.amount.toFixed(2)} € (pagó ${e.payer})</li>`).join('')}
      </ul>

      <h4>Balances</h4>
      <ul class="gx-balances">
        ${makeBalancesHTML(g)}
      </ul>
    `;
    gContainer.append(div);
  });

  /* añadir oyentes a cada nuevo formulario de gasto */
  document.querySelectorAll('.gx-form').forEach(f=>{
    f.addEventListener('submit', addGroupExpense);
  });
}

/* ---- añadir gasto a grupo ---- */
function addGroupExpense(e){
  e.preventDefault();
  const idx     = +e.target.dataset.idx;
  const concept = e.target.children[0].value.trim();
  const amount  = +e.target.children[1].value;
  const payer   = e.target.children[2].value;
  if (!concept || !amount || !payer){alert('Completa todos los campos');return;}

  groups[idx].expenses.push({concept, amount, payer});
  renderGroups();          // vuelve a pintar todo
  updateTotalGroups();
}

/* ---- balances por grupo ---- */
function computeBalances(g){
  const bal={}; g.members.forEach(m=>bal[m]=0);
  g.expenses.forEach(ex=>{
    const share = ex.amount / g.members.length;
    g.members.forEach(m=>bal[m]-=share);
    bal[ex.payer]+=ex.amount;
  });
  return bal;
}
function makeBalancesHTML(g){
  const b = computeBalances(g);
  return Object.entries(b).map(([m,val])=>{
    if (val>0.01)  return `<li>${m} debe recibir ${val.toFixed(2)} €</li>`;
    if (val<-0.01) return `<li>${m} debe pagar   ${(-val).toFixed(2)} €</li>`;
    return `<li>${m} está saldado.</li>`;
  }).join('');
}

/* ---- total de todos los grupos ---- */
function updateTotalGroups(){
  const total = groups.reduce((s,g)=>s+g.expenses.reduce((a,e)=>a+e.amount,0),0);
  $('#all-groups-total').textContent = `Total de todos los grupos: ${total.toFixed(2)} €`;
}
