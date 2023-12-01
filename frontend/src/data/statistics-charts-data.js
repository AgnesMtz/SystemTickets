import { chartsConfig } from "@/configs";
import axios from 'axios';

var numero = 0;
var numero2=0;
var numero3=0,numero4=0, numero5=0,numero6=0,numero7=0, numero8=0 , numero9=0;

try {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/estadisticas/obtener-ticketsTerminados/`
  );
  numero = data.num_tickets;
    console.log('Chido ponle: ', data)
    
} catch (error) {
  console.log(error);
}

try {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/estadisticas/obtener-ticketsTerminadosAyer/`
  );
  console.log("dato2: ",data);
  numero2 = data.num_tickets; // Ajusta esta línea según la propiedad correcta
  console.log('Chido ponle 2 : ', data);
  
} catch (error) {
  console.log("Error de numero2",error);
}

try {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/estadisticas/obtener-ticketsTerminadosAntier/`
  );
  numero3 = data.num_tickets;
  console.log('Chido ponle 3 : ', data)
} catch (error) {
  console.log(error);
}

try {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/estadisticas/obtener-ticketsAsignadosHoy/`
  );
  numero4 = data.num_tickets;
} catch (error) {
  console.log(error);
}
try {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/estadisticas/obtener-ticketsAsignadosAyer/`
  );
  numero5 = data.num_tickets;
} catch (error) {
  console.log(error);
}
try {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/estadisticas/obtener-ticketsAsignadosAntier/`
  );
  numero6 = data.num_tickets;
} catch (error) {
  console.log(error);
}

try {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/estadisticas/obtener-ticketsAsignados/`
  );
  numero7 = data.num_tickets;
} catch (error) {
  console.log(error);
}
try {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/estadisticas/obtener-ticketsTerminadoss/`
  );
  numero8 = data.num_tickets;

} catch (error) {
  console.log(error);
}

try {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/estadisticas/obtener-ticketsCanceladosGS/`
  );
  numero9 = data.num_tickets;

} catch (error) {
  console.log(error);
}

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Views",
      data: [numero, numero2, numero3],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#fff",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["Hoy", "Ayer", "Antier"],
    },
  },
};

const websiteViewsChartDos = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Views",
      data: [numero4, numero5, numero6],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#fff",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["Hoy", "Ayer", "Antier"],
    },
  },
};

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Tickets",
      data: [numero7, numero8, numero9],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#fff"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Asignados",
        "Terminados",
        "Cancelado por GS",
      ],
    },
  },
};

const completedTasksChart = {
  ...dailySalesChart,
  series: [
    {
      name: "Tasks",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
  ],
};

export const statisticsChartsData = [
  {
    color: "blue",
    title: "Tickets asignados",
    description: "Cantidad de tickets asignados recientemente ",
     footer: "campaign sent 2 days ago",
    chart: websiteViewsChartDos,
  },
  {
    color: "green",
    title: "Tickets activos hoy",
    description: "Cantidad de tickets terminados recientemente",
     footer: "campaign sent 2 days ago",
    chart: websiteViewsChart,
  },
  {
    color: "pink",
    title: "Tickets producidos",
    description: "Tickets registrados en el sistema",
    footer: "updated 4 min ago",
    chart: dailySalesChart,
  },
  // {
  //   color: "green",
  //   title: "Tickets producidos",
  //   description: "Last Campaign Performance",
  //   footer: "just updated",
  //   chart: completedTasksChart,
  // },
];

export default statisticsChartsData;
