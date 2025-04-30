document.addEventListener('DOMContentLoaded', () => {

/* ══ MENÚ ══════════════════════════════════════ */
document.getElementById('menu-toggle')
  .addEventListener('click',()=>document.getElementById('menu').classList.toggle('active'));

/* ══ 1. GASTOS PERSONALES ══════════════════════ */
const pForm  = document.getElementById('expense-form');
const pList  = document.getElementById('expense-list');
const pTotal = document.getElementById('total-expenses');
const pCurr  = document.getElementById('expense-currency');
let   pSum   = 0;

/* Rellenar divisas dinámicamente (exchangerate.host) */
fetch('https://api.exchangerate.host/symbols')
  .then(r=>r.json())
  .then(d=>{
     Object.entries(d.symbols).forEach(([code,{description}])=>{
       const o=document.createElement('option');
       o.value=o.textContent=code; o.label=`${code} — ${description}`;
       pCurr.append(o);
     });
  })
  .catch(()=>{
     ['EUR','USD','GBP','MXN'].forEach(c=>{
       const o=document.createElement('option');o.value=o.textContent=c;pCurr.append(o);
     });
  });

pForm.addEventListener('submit',e=>{
  e.preventDefault();
  const name=document.getElementById('expense-name').value.trim();
  const cat =document.getElementById('expense-category').value;
  const amt =+document.getElementById('expense-amount').value;
  const cur =pCurr.value;
  const note=document.getElementById('expense-notes').value.trim();
  if(!name||!amt){alert('Completa los campos');return;}

  pList.insertAdjacentHTML('beforeend',
    `<li><strong>${name}</strong> - ${amt.toFixed(2)} ${cur} (${cat})<br>${note}</li>`
  );
  pSum+=amt;
  pTotal.textContent=`Total: ${pSum.toFixed(2)} ${cur}`;
  pForm.reset();
});

/* ══ 2. GASTOS GRUPALES ════════════════════════ */
const gForm   = document.getElementById('group-form');
const gList   = document.getElementById('group-list');
const gSel    = document.getElementById('group-select');
const gPayer  = document.getElementById('group-expense-payer');
const gExpF   = document.getElementById('group-expense-form');
const gExpLst = document.getElementById('group-expense-list');
const gBal    = document.getElementById('group-balances');
const gCust   = document.getElementById('custom-split-container');
const groups  = {};   // { name:{members:[],expenses:[]} }

gForm.addEventListener('submit',e=>{
  e.preventDefault();
  const name=document.getElementById('group-name').value.trim();
  const members=document.getElementById('group-members').value.split(',')
                 .map(m=>m.trim()).filter(Boolean);
  if(!name||members.length<2){alert('Nombre y al menos 2 miembros');return;}
  groups[name]={members,expenses:[]};
  gSel.insertAdjacentHTML('beforeend',`<option>${name}</option>`);
  gList.insertAdjacentHTML('beforeend',`<li>${name}: ${members.join(', ')}</li>`);
  gForm.reset();
});

gSel.addEventListener('change',()=>{
  const g=groups[gSel.value];
  gPayer.innerHTML=g?g.members.map(m=>`<option>${m}</option>`).join(''):'';
  gExpLst.innerHTML=''; gBal.innerHTML=''; gCust.style.display='none';
});

/* toggle división personalizada */
document.querySelectorAll('input[name="split-type"]').forEach(r=>{
  r.addEventListener('change',()=>{
    if(r.value!=='custom'){gCust.style.display='none';return;}
    const g=groups[gSel.value]; if(!g){gCust.style.display='none';return;}
    gCust.innerHTML=g.members.map(m=>
      `${m}: <input type="number" class="share" data-m="${m}" placeholder="€">`
    ).join('<br>');
    gCust.style.display='block';
  });
});

gExpF.addEventListener('submit',e=>{
  e.preventDefault();
  const gName=gSel.value;
  const g=groups[gName];
  if(!g){alert('Selecciona un grupo');return;}

  const concept=document.getElementById('group-expense-name').value.trim();
  const amount =+document.getElementById('group-expense-amount').value;
  const payer  =gPayer.value;
  const split  =document.querySelector('input[name="split-type"]:checked').value;

  if(!concept||!amount||!payer){alert('Completa todo');return;}

  /* calcular shares */
  const shares={};
  if(split==='equal'){
     const s=amount/g.members.length;
     g.members.forEach(m=>shares[m]=s);
  }else{
     let totalCustom=0;
     gCust.querySelectorAll('.share').forEach(inp=>{
       const m=inp.dataset.m; const v=+inp.value||0;
       shares[m]=v; totalCustom+=v;
     });
     if(Math.abs(totalCustom-amount)>0.01){
       alert('La suma personalizada no coincide con el total');return;
     }
  }

  g.expenses.push({concept,amount,payer,shares});
  gExpLst.insertAdjacentHTML('beforeend',
    `<li>${concept} – ${amount.toFixed(2)} (pagó ${payer})</li>`
  );
  gCust.style.display='none';
  gExpF.reset();
  calcBalances(g);
});

function calcBalances(g){
  const bal={}; g.members.forEach(m=>bal[m]=0);
  g.expenses.forEach(e=>{
    Object.entries(e.shares).forEach(([m,share])=>{
      bal[m]-=share;
    });
    bal[e.payer]+=e.amount;
  });
  gBal.innerHTML=Object.entries(bal).map(([m,v])=>{
    if(v>0.01)  return `<p>${m} debe recibir ${v.toFixed(2)}</p>`;
    if(v<-0.01) return `<p>${m} debe pagar   ${(-v).toFixed(2)}</p>`;
    return `<p>${m} está saldado.</p>`;
  }).join('');
}

});
