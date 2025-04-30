/* === MENÚ HAMBURGUESA ================================ */
document.getElementById('hamburger').onclick = () =>
  document.getElementById('menu').classList.toggle('active');

/* === 1. GASTOS PERSONALES ============================ */
{
  const form = document.getElementById('p-form');
  const list = document.getElementById('p-list');
  const totalEl = document.getElementById('p-total');
  let total = 0;

  form.addEventListener('submit', e=>{
    e.preventDefault();
    const name = document.getElementById('p-name').value.trim();
    const amt  = +document.getElementById('p-amt').value;
    if(!name||!amt){alert('Completa los campos');return;}
    list.insertAdjacentHTML('beforeend',`<li>${name}: ${amt.toFixed(2)} €</li>`);
    total += amt;
    totalEl.textContent = `Total: ${total.toFixed(2)} €`;
    form.reset();
  });
}

/* === 2. GASTOS GRUPALES ============================== */
{
  const gForm  = document.getElementById('g-form');
  const gWrap  = document.getElementById('groups');
  const gTot   = document.getElementById('g-total-global');
  const groups = [];   // [{name,members,expenses:[]}]

  gForm.addEventListener('submit', e=>{
    e.preventDefault();
    const name    = document.getElementById('g-name').value.trim() || 'Grupo';
    const members = document.getElementById('g-members').value
                     .split(',').map(m=>m.trim()).filter(Boolean);
    if(!members.length){alert('Añade miembros');return;}
    groups.push({name,members,expenses:[]});
    render();
    gForm.reset();
  });

  function render(){
    gWrap.innerHTML='';
    let global = 0;

    groups.forEach((g,idx)=>{
      global += g.expenses.reduce((s,e)=>s+e.amount,0);

      const box=document.createElement('div');
      box.className='group-box';
      box.innerHTML=`
        <h3>${g.name}</h3>
        <p><em>${g.members.join(', ')}</em></p>

        <form class="gx-form" data-i="${idx}">
          <input  placeholder="Concepto" required>
          <input  type="number" step="0.01" placeholder="Importe (€)" required>
          <select required>
            <option value="">Pagó…</option>
            ${g.members.map(m=>`<option value="${m}">${m}</option>`).join('')}
          </select>
          <button>Añadir gasto</button>
        </form>

        <ul class="gx-list">
          ${g.expenses.map(e=>`<li>${e.concept}: ${e.amount.toFixed(2)} € (pagó ${e.payer})</li>`).join('')}
        </ul>

        <strong>Balances</strong>
        <ul class="gx-balances">${balancesHTML(g)}</ul>
      `;
      gWrap.append(box);
    });

    gTot.textContent = `Total de todos los grupos: ${global.toFixed(2)} €`;
    addGastoListeners();
  }

  function addGastoListeners(){
    gWrap.querySelectorAll('.gx-form').forEach(f=>{
      f.onsubmit = ev=>{
        ev.preventDefault();
        const idx   = +f.dataset.i;
        const cpt   = f.children[0].value.trim();
        const amt   = +f.children[1].value;
        const payer = f.children[2].value;
        if(!cpt||!amt||!payer){alert('Completa todo');return;}
        groups[idx].expenses.push({concept:cpt, amount:amt, payer});
        render();
      };
    });
  }

  function balancesHTML(g){
    const bal={}; g.members.forEach(m=>bal[m]=0);
    g.expenses.forEach(e=>{
      const share = e.amount / g.members.length;
      g.members.forEach(m=>bal[m]-=share);
      bal[e.payer]+=e.amount;
    });
    return Object.entries(bal).map(([m,v])=>{
      if(v>0.01)  return `<li>${m} debe recibir ${v.toFixed(2)} €</li>`;
      if(v<-0.01) return `<li>${m} debe pagar ${(-v).toFixed(2)} €</li>`;
      return `<li>${m} está saldado.</li>`;
    }).join('');
  }
}
