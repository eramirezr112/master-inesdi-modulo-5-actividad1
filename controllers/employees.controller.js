const data = require("../employees.json");

// Controlador para manejar la solicitud GET /api/employees
const getEmployees = (req, res) => {
  // Si es una solicitud POST, agregar un nuevo empleado
  if (req.method === "POST") {
    const newEmployee = req.body;

    // Validar el formato del nuevo empleado
    if (!isValidEmployee(newEmployee)) {
      return res.status(400).json({ code: "bad_request" });
    }

    // Agregar el nuevo empleado al listado en memoria
    data.push(newEmployee);
  } else {
    const badges = req.query.badges;
    const page = req.query.page;
    const name = req.params.name;

    if (badges) {
      // Filtrar los empleados que incluyan "black" en el atributo "badges"
      const filteredEmployees = data.filter((employee) => {
        return employee.badges && employee.badges.includes(badges);
      });
      res.json(filteredEmployees);
    } else if (page) {
      // Calcular los índices de inicio y fin para la paginación
      const startIndex = 2 * (page - 1);
      const endIndex = startIndex + 1;

      // obtener los empleados según los índices calculados
      const paginatedEmployees = data.slice(startIndex, endIndex + 1);

      res.json(paginatedEmployees);
    } /*else if (name) {
      const employee = data.find((employee) => employee.name === name);
      if (employee) {
        res.json(employee);
      } else {
        res.status(404).json({ code: "not_found" });
      }
    } */ else {
      res.json(data);
    }
  }
};

function isValidEmployee(employee) {
  return (
    typeof employee === "object" &&
    employee !== null &&
    "name" in employee &&
    "age" in employee &&
    typeof employee.name === "string" &&
    typeof employee.age === "number"
  );
}

// Función para obtener al empleado con más edad.
function getOldestEmployee(req, res) {
  let oldestEmployee = data[0];
  data.forEach((employee) => {
    if (employee.age > oldestEmployee.age) {
      oldestEmployee = employee;
    }
  });

  res.json(oldestEmployee);
}

module.exports = {
  getEmployees,
  getOldestEmployee,
};
