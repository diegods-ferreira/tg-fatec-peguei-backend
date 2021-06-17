<h1 align="center">
    <img src="https://imgur.com/aPy2J3e.png" width="160">
  </h1>
  <h4 align="center">
    This is the Back-end Mobile of an mobile application developed for our Fatec Graduation Work
  </h4>
  <br>
  <h2>Index</h2>
  <ul>
    <li><a href="#group-members">Group members</a></li>
    <li><a href="#main-libraries-used">Main libraries used</a></li>
    <li><a href="#how-to-run">How to run this projetct</a></li>
    <li><a href="#thanks">Thanks</a></li>
  </ul>
  <br>
  <h2 id="group-members">Group members</h2>
  <p>
    Since the TG (acronym for <i>"Graduation Work"</i>, in Portuguese) can be developed by groups with up to 3 members, we decided to come together to develop the application proposed in our work. Thus, our group consists of:
  </p>
  <br>
  <table class="table">
    <thead>
      <th>Member name</th>
      <th>Main responsibility</th>
    </thead>
    <tbody>
      <tr>
        <td><a href="https://github.com/danilo-dsf">Danilo Ferreira</a></td>
        <td>Architect, structure and develop the application back-end</td>
      </tr>
      <tr>
        <td><a href="https://github.com/diegods-ferreira">Diego Ferreira</a></td>
        <td>Design, architect and develop the mobile front end of the application</td>
      </tr>
    </tbody>
  </table>
  <br>
  <br>
  <h2 id="main-libraries-used">Main libraries used</h2>
  <p>
    As the entire ecosystem around this stack is quite vast, full of libraries ready to implement in our application and make use according to our objective, below are listed the main libraries we use:
  </p>
  <br>
  <table class="table">
    <thead>
      <th>Library Name</th>
      <th>Version</th>
      <th>What it was use for?</th>
    </thead>
    <tbody>
      <tr>
        <td>typescript</td>
        <td>3.8.3</td>
        <td>It was used so that we could work with data typing and thus avoid problems as the project grows</td>
      </tr>
      <tr>
        <td>eslint</td>
        <td>6.8.0</td>
        <td rowspan="2">They were used to enforce code style and design pattern</td>
      </tr>
      <tr>
        <td>prettier</td>
        <td>2.1.2</td>
      </tr>
      <tr>
        <td>typeorm</td>
        <td>0.2.28</td>
        <td rowspan="4">These libraries were used to manage the connection to the databases (PostgreSQL, MongoDB and Redis)</td>
      </tr>
      <tr>
        <td>pg</td>
        <td>8.4.1</td>
      </tr>
      <tr>
        <td>mongodb</td>
        <td>3.6.2</td>
      </tr>
      <tr>
        <td>ioredis</td>
        <td>4.17.3</td>
      </tr>
      <tr>
        <td>express</td>
        <td>4.17.1</td>
        <td>The express library is responsible for dealing with all the requests sent by the front-end client</td>
      </tr>
      <tr>
        <td>socket.io</td>
        <td>3.1.1</td>
        <td>The socket.io library is responsible for managing the websocket connection between the API and the front-end client and it is used in the chats module</td>
      </tr>
    </tbody>
  </table>
  <br>
  <br>
  <h2 id="how-to-run">How to run this project</h2>
  <ol>
    <li>First, you will need to install all the requirements on your computer. So you need no install <strong>Node.js, Insomnia, PostgreSQL, MongoDB and Redis</strong></li>
    <li>Install the global node dependency called Yarn by running the commando <strong><code>npm install -g yarn</code></strong></li>
    <li>Then, you need to clone this repository and inside of it, run the command <strong><code>yarn</code></strong></li>
    <li>You will also need to create the postgres database called <strong><code>tg_peguei</code></strong></li>
    <li>After creating the database, we need to run the migrations to create all the tables, columns and relations by runnig the command <strong><code>yarn typeorm migration:run</code></strong></li>
    <li>Your project is prepared, now you can start it running the command <strong><code>yarn dev:server</code></strong></li>
    <li><strong>Optional: </strong>We prepared a seed to populate the database with fake data, you can run it by sending a request to the address <strong><code>POST http://localhost:3333/seed</code></strong></li>
    <li><strong>That's it!</strong> Your project is ready to receive requests from the front-end client</li>
  </ol>
  <br>
  <br>
  <h2 id="thanks">Thanks</h2>
  <p>
    <b>
      <i>
        Thank you so much for visiting this repository!
      </i>
    </b>
  </p>
