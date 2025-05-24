/*  ob.packersGPT · versión híbrida con enlaces.json + enlaces genéricos  */

const part1="sk";
const part2="-proj-xZbAp8W0CLkZXOup7Udp7MqB0kNt-";
const part3="gZdkKhfZ73PW9lf8kZ5G-lDytWXjl55asbDuOKJ7aDjoRT3BlbkFJwZyLuxPOlbIW2xfiuCxFWVb5XlhRiJNzId5oIH-EjRJ2tC97ZZdFR051gRYKJ3FsDWPszPg_QA";
const apiKey=part1+part2+part3;

const chatBox  = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput= document.getElementById("user-input");

/* 1· Cargar enlaces específicos ------------------------------------------------ */
let links={};
fetch('enlaces.json')
  .then(r=>r.json())
  .then(d=>links=d)
  .catch(()=>console.warn("⚠️ No se encontró enlaces.json; se usarán enlaces genéricos."));

chatForm.addEventListener('submit',async e=>{
  e.preventDefault();
  const input=userInput.value.trim();
  if(!input) return;

  chatBox.appendChild(Object.assign(document.createElement('div'),{textContent:"Tú: "+input}));
  userInput.value="";

  const loader=document.createElement('div');
  loader.textContent="ob.packersGPT está escribiendo…";
  chatBox.appendChild(loader);

  /* 2· Detectar destino -------------------------------------------------------- */
  const lower=input.toLowerCase();
  let destino=Object.keys(links).find(k=>lower.includes(k)) || lower.split(/\s+/).pop();

  const encDest=encodeURIComponent(destino);
  const encOrig="MAD"; // origen por defecto (cámbialo o detéctalo del usuario)

  /* 3· Construir enlaces ------------------------------------------------------- */
  const actLink = links[destino]?.actividades
      || `https://www.getyourguide.com/?q=${encDest}&partner_id=0PBI9YH&cmp=share_to_earn`;

  const hosLink = links[destino]?.hostels
      || `https://hostelworld.prf.hn/click/camref:1101l52sgW/destination:${encDest}`;

  const flyLink = (links.vuelos?.generico || "")
      .replace("ORIGEN", encOrig).replace("DESTINO", encDest);

  const flyAlt  = (links.vuelos_alt?.kiwi || "")
      .replace("ORIGEN", encOrig).replace("DESTINO", encDest);

  const esimLink = links.esim?.generico || "";

  /* 4· Montar bloque de enlaces para el prompt -------------------------------- */
  const extraLinks = `
👉 Actividades top: ${actLink}
👉 Hostels baratos: ${hosLink}
✈️ Vuelos (Trip.com): ${flyLink}
✈️ Vuelos alternativos (Kiwi): ${flyAlt}
📶 eSIM global: ${esimLink}`;

  /* 5· Llamar a GPT ------------------------------------------------------------ */
  try{
    const res=await fetch("https://api.openai.com/v1/chat/completions",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+apiKey
      },
      body:JSON.stringify({
        model:"gpt-4o",
        messages:[
          {role:"system",content:"Eres ob.packersGPT, guía mochilero cercano y útil."},
          {role:"user", content: `${input}\n\nIncluye sugerencias y enlaces útiles.\n${extraLinks}`}
        ]
      })
    });
    const data=await res.json();
    loader.remove();
    chatBox.appendChild(Object.assign(document.createElement('div'),{
      textContent:"ob.packersGPT: "+data.choices[0].message.content
    }));
    chatBox.scrollTop=chatBox.scrollHeight;
  }catch(err){
    loader.remove();
    chatBox.appendChild(Object.assign(document.createElement('div'),{
      textContent:"❌ Error al conectar con ob.packersGPT."
    }));
  }
});
