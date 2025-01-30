<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OnlyBackpackers - Chats por Destino</title>

  <!-- Fuente Poppins -->
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
    rel="stylesheet"
  />
  
  <!-- Hoja de estilos del chat (chat.css) -->
  <link rel="stylesheet" href="chat.css" />
  
  <!-- Iconos FontAwesome (opcional) -->
  <script
    src="https://kit.fontawesome.com/a076d05399.js"
    crossorigin="anonymous"
  ></script>
</head>
<body>
  <!-- Encabezado (menú) -->
  <header class="main-header">
    <nav>
      <!-- Menú hamburguesa (mobile) -->
      <div class="menu-toggle" id="menu-toggle">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
      <!-- Menú principal -->
      <ul class="menu" id="menu">
        <li><a href="index.html">Inicio</a></li>
        <li><a href="muro.html">Muro</a></li>
        <li><a href="muro-personal.html">Mi Muro</a></li>
        <li><a href="recomendaciones.html">Recomendaciones</a></li>
        <li><a href="chats.html" class="active">Chats</a></li>
        <li><a href="eventos.html">Eventos</a></li>
        <li><a href="worldtrip.html">Worldtrip</a></li>
        <li><a href="recompensas.html">Recompensas</a></li>
        <li><a href="gastos.html">Gastos</a></li>
      </ul>
    </nav>
  </header>

  <!-- Contenido principal de la página -->
  <main class="chat-destinations">
    <h1>Chats por Destino</h1>
    <p>Conéctate con viajeros en los destinos más populares.  
       <br />Selecciona un continente y luego elige una ciudad para chatear.</p>

    <section class="destination-menu">
      <h2>Explora por Continentes</h2>
      <ul class="continent-list">
        
        <!-- Europa -->
        <li>
          <button class="continent" data-continent="europe">Europa</button>
          <ul class="city-list hidden" id="europe">
            <!-- Ciudades de Europa -->
            <li><button class="city">París</button></li>
            <li><button class="city">Roma</button></li>
            <li><button class="city">Ámsterdam</button></li>
            <li><button class="city">Praga</button></li>
            <li><button class="city">Londres</button></li>
            <li><button class="city">Barcelona</button></li>
            <li><button class="city">Berlín</button></li>
            <li><button class="city">Viena</button></li>
            <li><button class="city">Budapest</button></li>
            <li><button class="city">Estocolmo</button></li>
            <li><button class="city">Lisboa</button></li>
            <li><button class="city">Madrid</button></li>
            <li><button class="city">Florencia</button></li>
            <li><button class="city">Atenas</button></li>
            <li><button class="city">Edimburgo</button></li>
            <li><button class="city">Dublín</button></li>
            <li><button class="city">Moscú</button></li>
            <li><button class="city">Venecia</button></li>
            <li><button class="city">Nápoles</button></li>
            <li><button class="city">Brujas</button></li>
            <li><button class="city">Dubrovnik</button></li>
            <li><button class="city">Cracovia</button></li>
            <li><button class="city">Múnich</button></li>
          </ul>
        </li>
        
        <!-- Asia -->
        <li>
          <button class="continent" data-continent="asia">Asia</button>
          <ul class="city-list hidden" id="asia">
            <!-- Ciudades de Asia -->
            <li><button class="city">Tokio</button></li>
            <li><button class="city">Bali</button></li>
            <li><button class="city">Bangkok</button></li>
            <li><button class="city">Seúl</button></li>
            <li><button class="city">Nueva Delhi</button></li>
            <li><button class="city">Hanói</button></li>
            <li><button class="city">Kuala Lumpur</button></li>
            <li><button class="city">Hong Kong</button></li>
            <li><button class="city">Shanghái</button></li>
            <li><button class="city">Singapur</button></li>
            <li><button class="city">Osaka</button></li>
            <li><button class="city">Kioto</button></li>
            <li><button class="city">Phuket</button></li>
            <li><button class="city">Chiang Mai</button></li>
            <li><button class="city">Katmandú</button></li>
            <li><button class="city">Yakarta</button></li>
            <li><button class="city">Manila</button></li>
            <li><button class="city">Islamabad</button></li>
            <li><button class="city">Colombo</button></li>
            <!-- Islas de Tailandia -->
            <li><button class="city">Koh Samui</button></li>
            <li><button class="city">Koh Phangan</button></li>
            <li><button class="city">Koh Tao</button></li>
            <li><button class="city">Phi Phi</button></li>
            <li><button class="city">Koh Lanta</button></li>
          </ul>
        </li>
        
        <!-- África -->
        <li>
          <button class="continent" data-continent="africa">África</button>
          <ul class="city-list hidden" id="africa">
            <!-- Ciudades de África -->
            <li><button class="city">El Cairo</button></li>
            <li><button class="city">Ciudad del Cabo</button></li>
            <li><button class="city">Marrakech</button></li>
            <li><button class="city">Nairobi</button></li>
            <li><button class="city">Zanzíbar</button></li>
            <li><button class="city">Dakar</button></li>
            <li><button class="city">Johannesburgo</button></li>
            <li><button class="city">Accra</button></li>
            <li><button class="city">Maputo</button></li>
            <li><button class="city">Arusha</button></li>
            <li><button class="city">Victoria Falls</button></li>
            <li><button class="city">Addis Abeba</button></li>
            <li><button class="city">Casablanca</button></li>
            <li><button class="city">Lagos</button></li>
            <li><button class="city">Kampala</button></li>
            <li><button class="city">Windhoek</button></li>
            <li><button class="city">Tánger</button></li>
            <!-- Islas Mascareñas -->
            <li><button class="city">Mauricio</button></li>
            <li><button class="city">Reunión</button></li>
            <li><button class="city">Rodrigues</button></li>
            <li><button class="city">Hurghada</button></li>
            <li><button class="city">Sharm El Sheikh</button></li>
            <li><button class="city">Petra</button></li>
          </ul>
        </li>

        <!-- América (Norte, Central y Sur): 
             si prefieres dividirlo en 2 o 3, 
             puedes hacerlo. Aquí uno unificado 
             para que sea más simple. -->
        <li>
          <button class="continent" data-continent="america">América</button>
          <ul class="city-list hidden" id="america">
            <!-- América del Norte -->
            <li><button class="city">Nueva York</button></li>
            <li><button class="city">Los Ángeles</button></li>
            <li><button class="city">Ciudad de México</button></li>
            <li><button class="city">Toronto</button></li>
            <li><button class="city">Vancouver</button></li>
            <li><button class="city">Miami</button></li>
            <li><button class="city">Chicago</button></li>
            <li><button class="city">San Francisco</button></li>
            <li><button class="city">Boston</button></li>
            <li><button class="city">Montreal</button></li>
            <li><button class="city">Las Vegas</button></li>
            <li><button class="city">Washington</button></li>
            <li><button class="city">Guadalajara</button></li>
            <li><button class="city">Cancún</button></li>
            <li><button class="city">Monterrey</button></li>
            <li><button class="city">La Habana</button></li>
            <li><button class="city">Playa del Carmen</button></li>

            <!-- América Central y del Sur -->
            <li><button class="city">San José</button></li>
            <li><button class="city">Río de Janeiro</button></li>
            <li><button class="city">Buenos Aires</button></li>
            <li><button class="city">Lima</button></li>
            <li><button class="city">Santiago</button></li>
            <li><button class="city">Bogotá</button></li>
            <li><button class="city">Medellín</button></li>
            <li><button class="city">Quito</button></li>
            <li><button class="city">Guayaquil</button></li>
            <li><button class="city">Ciudad de Panamá</button></li>
            <li><button class="city">Punta Cana</button></li>
            <li><button class="city">Montevideo</button></li>
            <li><button class="city">Asunción</button></li>
            <li><button class="city">Caracas</button></li>
            <li><button class="city">Granada</button></li>
            <li><button class="city">Managua</button></li>
          </ul>
        </li>

        <!-- Oceanía -->
        <li>
          <button class="continent" data-continent="oceania">Oceanía</button>
          <ul class="city-list hidden" id="oceania">
            <li><button class="city">Sídney</button></li>
            <li><button class="city">Melbourne</button></li>
            <li><button class="city">Auckland</button></li>
            <li><button class="city">Wellington</button></li>
            <li><button class="city">Brisbane</button></li>
            <li><button class="city">Queenstown</button></li>
            <li><button class="city">Hobart</button></li>
            <li><button class="city">Fiji</button></li>
            <li><button class="city">Bora Bora</button></li>
            <li><button class="city">Papeete</button></li>
          </ul>
        </li>
      </ul>
    </section>

    <!-- Ventana de Chat -->
    <section class="chat-window hidden">
      <h2 id="chat-destination-title">Chat - [Destino]</h2>
      <div class="messages" id="chat-messages">
        <!-- Mensajes se cargarán dinámicamente -->
      </div>
      <form id="chat-form">
        <input type="text" id="chat-input" placeholder="Escribe un mensaje..." required />
        <button type="submit">Enviar</button>
      </form>
    </section>
  </main>

  <!-- Script de chat (chat.js) -->
  <script src="chat.js"></script>
</body>
</html>
